#!/usr/bin/env node

/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Admin Account Provisioning Script
 * ============================================================================
 * Creates or updates an administrator user in Firebase Authentication with
 * authorized custom claims ({ role }) and stores their profile in Firestore.
 *
 * Usage:
 *   node scripts/create-admin-user.mjs [email] [password] [role] [name] [phone]
 *
 * Defaults (if no args provided):
 *   Email:    mohamed@rashx.org
 *   Password: Rashx@2026
 *   Role:     super_admin
 *   Name:     م. محمد عبده رشاد البهي
 *   Phone:    +966548082945
 */

import fs from 'node:fs';
import path from 'node:path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const ALLOWED_ROLES = [
  'super_admin',
  'platform_engineer',
  'support_lead',
  'sales_director',
];

// 1. Attempt loading environment variables
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

function formatPrivateKey(key) {
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n');
}

const args = process.argv.slice(2);
const email = (args[0] || 'mohamed@rashx.org').trim().toLowerCase();
const password = args[1] || 'Rashx@2026';
const role = (args[2] || 'super_admin').trim();
const name = args[3] || 'م. محمد عبده رشاد البهي';
const phone = args[4] || '+966548082945';

if (!ALLOWED_ROLES.includes(role)) {
  console.error(`\n❌ Error: Invalid role "${role}". Allowed roles: ${ALLOWED_ROLES.join(', ')}\n`);
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID || 'aya2-a5057';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

if (!clientEmail || !privateKey) {
  console.log('\n====================================================================');
  console.log('  ⚠️  FIREBASE SERVICE ACCOUNT CREDENTIALS REQUIRED');
  console.log('====================================================================');
  console.log('To create/modify Firebase Auth users directly via Admin SDK,');
  console.log('please ensure FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY');
  console.log('are configured in your .env.local file.\n');
  console.log('Example .env.local entry:');
  console.log('  FIREBASE_PROJECT_ID="aya2-a5057"');
  console.log('  FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxx@aya2-a5057.iam.gserviceaccount.com"');
  console.log('  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"\n');
  console.log('Alternatively, you can manually create the user in the Firebase Console:');
  console.log('  1. Open Firebase Console -> Authentication -> Users -> Add user');
  console.log(`     Email: ${email}`);
  console.log(`     Password: ${password}`);
  console.log('  2. Once service account keys are added to .env.local, run:');
  console.log(`     node scripts/set-admin-claim.mjs ${email} ${role}\n`);
}

async function run() {
  try {
    if (getApps().length === 0) {
      if (clientEmail && privateKey) {
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          projectId,
        });
      } else {
        initializeApp({ projectId });
      }
    }

    const auth = getAuth();
    const db = getFirestore();

    console.log(`\n🔍 Searching for user account "${email}" in Firebase Authentication...`);
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(`ℹ️  User already exists (UID: ${userRecord.uid}). Updating credentials...`);
      userRecord = await auth.updateUser(userRecord.uid, {
        password,
        displayName: name,
      });
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.log(`➕ Creating new Firebase Auth user...`);
        userRecord = await auth.createUser({
          email,
          password,
          displayName: name,
          emailVerified: true,
        });
        console.log(`✅ User created successfully (UID: ${userRecord.uid}).`);
      } else {
        throw err;
      }
    }

    console.log(`⚡ Assigning Custom Claims: { role: "${role}" }...`);
    await auth.setCustomUserClaims(userRecord.uid, {
      ...(userRecord.customClaims || {}),
      role,
    });

    console.log(`💾 Registering admin record in Firestore collection "platform_admins"...`);
    await db.collection('platform_admins').doc(userRecord.uid).set(
      {
        id: userRecord.uid,
        email,
        name,
        title: role === 'super_admin' ? 'المؤسس ورئيس تطوير منصة راش إكس' : 'مسؤول المنظومة',
        department: role === 'super_admin' ? 'Executive' : 'Engineering',
        role,
        status: 'active',
        phone,
        avatar: '/avatars/animoji-1.webp',
        avatarId: 1,
        createdAt: FieldValue.serverTimestamp(),
        lastLoginAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log('\n====================================================================');
    console.log('  🎉 SUPER ADMIN ACCOUNT PROVISIONED SUCCESSFULLY');
    console.log('====================================================================');
    console.log(`  UID:      ${userRecord.uid}`);
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`  Role:     ${role}`);
    console.log(`  Name:     ${name}`);
    console.log('--------------------------------------------------------------------');
    console.log('  You can now log in at:');
    console.log('  http://localhost:3000/ar/dashboard/login');
    console.log('====================================================================\n');
  } catch (err) {
    console.error('\n❌ Error provisioning admin account:', err.message || err);
    process.exit(1);
  }
}

run();

