import React from 'react';
import { requireAdmin } from '@/server/auth/session';
import { SettingsClientView } from '@/components/dashboard/settings/SettingsClientView';


export default async function PlatformSettingsPage() {
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
