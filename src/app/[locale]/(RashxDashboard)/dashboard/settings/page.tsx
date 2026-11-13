import React, { Suspense } from 'react';
import { requireAdmin } from '@/server/auth/session';
import { SettingsClientView } from '@/components/dashboard/settings/SettingsClientView';
import SettingsLoading from './loading';

async function SettingsContent() {
  await requireAdmin(['super_admin', 'platform_engineer']);
  const projectId = process.env.FIREBASE_PROJECT_ID || '';
  const authDomain = projectId ? `${projectId}.firebaseapp.com` : '';

  return (
    <SettingsClientView
      projectId={projectId}
      authDomain={authDomain}
    />
  );
}

export default function PlatformSettingsPage() {
  return (
    <Suspense fallback={<SettingsLoading />}>
      <SettingsContent />
    </Suspense>
  );
}
