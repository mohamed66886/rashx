#!/usr/bin/env node

/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Admin Custom Claim Setter
 * ============================================================================
 * Promotes a Firebase Authentication user to an authorized Platform HQ Admin.
 *
 * Usage:
 *   node scripts/set-admin-claim.mjs <email> <role>
 *
 * Example:
 *   node scripts/set-admin-claim.mjs mohamed@rashx.org super_admin
 *
 * Allowed roles:
 *   - super_admin
 *   - platform_engineer
 *   - support_lead
 *   - sales_director
 */

import fs from 'node:fs';
import path from 'node:path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const ALLOWED_ROLES = [
  'super_admin',
  'platform_engineer',
  'support_lead',
  'sales_director',
];

// Attempt loading environment files if available
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

const args = process.argv.slice(2);
const email = args[0]?.trim();
const role = args[1]?.trim();

if (!email || !role) {
  console.error('\n❌ Error: Missing required arguments.\n');
  console.log('Usage:');
  console.log('  node scripts/set-admin-claim.mjs <email> <role>\n');
  console.log('Allowed roles:');
  ALLOWED_ROLES.forEach((r) => console.log(`  - ${r}`));
  console.log('\nExample:');
  console.log('  node scripts/set-admin-claim.mjs mohamed@rashx.org super_admin\n');
  process.exit(1);
}

if (!ALLOWED_ROLES.includes(role)) {
  console.error(`\n❌ Error: Invalid role "${role}".`);
  console.log('Allowed roles:');
  ALLOWED_ROLES.forEach((r) => console.log(`  - ${r}\n`));
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !rawPrivateKey) {
  console.error('\n❌ Error: Missing required Firebase Admin environment variables:');
  if (!projectId) console.error('  - FIREBASE_PROJECT_ID');
  if (!clientEmail) console.error('  - FIREBASE_CLIENT_EMAIL');
  if (!rawPrivateKey) console.error('  - FIREBASE_PRIVATE_KEY');
  console.error('\nPlease provide them in your shell environment or .env.local\n');
  process.exit(1);
}

const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

try {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  const auth = getAuth();

  console.log(`\n🔍 Looking up user account: ${email}...`);
  const user = await auth.getUserByEmail(email);

  console.log(`✅ Found user: ${user.email} (UID: ${user.uid})`);
  console.log(`⚡ Setting custom user claims { role: "${role}" }...`);

  await auth.setCustomUserClaims(user.uid, {
    ...(user.customClaims || {}),
    role,
  });

  // Verify the updated claims
  const updatedUser = await auth.getUser(user.uid);

  console.log('\n🎉 Success! Custom administrative claim updated:');
  console.log(JSON.stringify(updatedUser.customClaims, null, 2));
  console.log(`\nUser "${email}" can now authenticate to Platform HQ Dashboard with role "${role}".`);
  console.log('Dashboard Login: /ar/dashboard/login\n');
} catch (error) {
  console.error('\n❌ Failed to set admin claim:', error.message || error);
  process.exit(1);
}

