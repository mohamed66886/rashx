#!/usr/bin/env node

/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Security Verification Checklist
 * ============================================================================
 * Automated security audit confirming:
 * 1. Unauthenticated requests to /ar/dashboard redirect to /ar/dashboard/login.
 * 2. Direct client REST calls to Firestore platform collections are denied.
 * 3. Route responses and client source code contain no passwordHash or secrets.
 *
 * Usage:
 *   node scripts/verify-security.mjs [baseUrl]
 *
 * Example:
 *   node scripts/verify-security.mjs http://localhost:3000
 *   node scripts/verify-security.mjs https://admin.rashx.org
 */

import fs from 'node:fs';
import path from 'node:path';

// Attempt loading environment files
const envFiles = ['.env.local', '.env'];
for (const envFile of envFiles) {
  const fullPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(fullPath) && typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(fullPath);
    } catch {
      // ignore
    }
  }
}

const targetBaseUrl = (process.argv[2] || process.env.TEST_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'aya2-a5057';

const FORBIDDEN_TOKENS = [
  'passwordHash',
  'SALT',
  'admin123',
  'Rashx@',
];

// Add private key if present in env (take a unique 30-char slice to search)
if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PRIVATE_KEY.length > 50) {
  const sample = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n|\n/g, '').slice(40, 80);
  if (sample.length >= 20) FORBIDDEN_TOKENS.push(sample);
}

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

function logPass(msg) {
  results.passed++;
  console.log(`  \x1b[32m✔ [PASS]\x1b[0m ${msg}`);
}

function logFail(msg, detail = '') {
  results.failed++;
  console.log(`  \x1b[31m✖ [FAIL]\x1b[0m ${msg}`);
  if (detail) console.log(`         \x1b[31m${detail}\x1b[0m`);
}

function logWarn(msg, detail = '') {
  results.warnings++;
  console.log(`  \x1b[33m⚠ [WARN]\x1b[0m ${msg}`);
  if (detail) console.log(`         \x1b[33m${detail}\x1b[0m`);
}

console.log('\n====================================================================');
console.log('       RASHX PLATFORM HQ - SECURITY & ACCESS CONTROL CHECKLIST      ');
console.log('====================================================================');
console.log(`Target Base URL:   ${targetBaseUrl}`);
console.log(`Target Project ID: ${projectId}\n`);

// ----------------------------------------------------------------------------
// Check 1: Route Protection & Redirect Verification (a)
// ----------------------------------------------------------------------------
async function checkRouteProtection() {
  console.log('\x1b[1m[1/3] Route Protection & Authentication Guard\x1b[0m');

  const testRoutes = [
    { path: '/ar/dashboard', expectedRedirect: '/ar/dashboard/login' },
    { path: '/en/dashboard', expectedRedirect: '/en/dashboard/login' },
    { path: '/ar/dashboard/tenants', expectedRedirect: '/ar/dashboard/login' },
    { path: '/ar/dashboard/leads', expectedRedirect: '/ar/dashboard/login' },
    { path: '/ar/dashboard/database', expectedRedirect: '/ar/dashboard/login' },
  ];

  let serverAccessible = false;

  for (const { path: routePath } of testRoutes) {
    const url = `${targetBaseUrl}${routePath}`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'manual', // do not follow redirect so we can inspect Location header
      });

      serverAccessible = true;
      const status = res.status;
      const location = res.headers.get('location') || '';

      const isRedirect = status === 307 || status === 308 || status === 302 || status === 303;
      const targetsLogin = location.includes('/dashboard/login');

      if (isRedirect && targetsLogin) {
        logPass(`${routePath} redirected (HTTP ${status}) to ${location}`);
      } else {
        logFail(
          `${routePath} unauthenticated access allowed without redirect`,
          `Status: ${status}, Location: ${location || 'none'}`
        );
      }
    } catch (err) {
      logWarn(
        `Could not connect to ${url} (${err.message})`,
        `Start your server with 'npm run start' or specify URL: node scripts/verify-security.mjs <url>`
      );
      break;
    }
  }

  if (!serverAccessible) {
    console.log('       (Live server route redirection check skipped: server offline)');
  }
}

// ----------------------------------------------------------------------------
// Check 2: Direct Firestore REST Access Denied (b)
// ----------------------------------------------------------------------------
async function checkFirestoreDirectAccess() {
  console.log('\n\x1b[1m[2/3] Direct Firestore REST Isolation Check\x1b[0m');

  const collections = ['tenants', 'leads', 'admins', 'stats', 'admin_sessions'];

  for (const col of collections) {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${col}`;
    try {
      const res = await fetch(url, { method: 'GET' });
      const status = res.status;

      if (status === 401 || status === 403) {
        logPass(`Direct read to /${col} rejected (HTTP ${status} Forbidden/Unauthorized)`);
      } else if (status === 200) {
        logFail(
          `SECURITY CRITICAL: Direct read to /${col} returned HTTP 200!`,
          `Firestore rules allow public access to platform collection.`
        );
      } else {
        logPass(`Direct read to /${col} blocked with HTTP ${status}`);
      }
    } catch (err) {
      logWarn(`Could not probe Firestore REST API: ${err.message}`);
    }
  }
}

// ----------------------------------------------------------------------------
// Check 3: Credential & Secret Leaks in Responses and Codebase (c)
// ----------------------------------------------------------------------------
async function checkResponseSecretLeaks() {
  console.log('\n\x1b[1m[3/3] Credential & Secret Leak Inspection\x1b[0m');

  // A. Check live route responses if server is online
  const publicRoutes = ['/ar/dashboard/login', '/ar', '/api/lead'];
  for (const r of publicRoutes) {
    const url = `${targetBaseUrl}${r}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        let leaked = false;
        for (const token of FORBIDDEN_TOKENS) {
          if (text.includes(token)) {
            logFail(`Leaked token "${token}" found in response from ${r}`);
            leaked = true;
          }
        }
        if (!leaked) {
          logPass(`No credential strings or secrets detected in response from ${r}`);
        }
      }
    } catch {
      // Ignored if server offline
    }
  }

  // B. Codebase source check (src/)
  const srcDir = path.resolve(process.cwd(), 'src');
  let scannedFiles = 0;
  let codeLeaks = 0;

  function scanSource(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanSource(full);
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js')) {
        scannedFiles++;
        const content = fs.readFileSync(full, 'utf8');
        for (const token of FORBIDDEN_TOKENS) {
          if (content.includes(token)) {
            codeLeaks++;
            logFail(`Source file ${path.relative(process.cwd(), full)} contains forbidden token "${token}"`);
          }
        }
      }
    }
  }

  if (fs.existsSync(srcDir)) {
    scanSource(srcDir);
    if (codeLeaks === 0) {
      logPass(`Scanned ${scannedFiles} source files in src/: 0 occurrences of passwordHash, SALT, or secrets`);
    }
  }
}

async function run() {
  await checkRouteProtection();
  await checkFirestoreDirectAccess();
  await checkResponseSecretLeaks();

  console.log('\n--------------------------------------------------------------------');
  console.log(`Results: ${results.passed} Passed, ${results.failed} Failed, ${results.warnings} Warnings`);
  console.log('--------------------------------------------------------------------\n');

  if (results.failed > 0) {
    process.exit(1);
  }
}

run();
