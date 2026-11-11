import React from 'react';
import { SettingsClientView } from '@/components/dashboard/settings/SettingsClientView';

export const instant = false;

export default async function PlatformSettingsPage() {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'aya2-a5057';
  const authDomain = `${projectId}.firebaseapp.com`;

  return (
    <SettingsClientView
      projectId={projectId}
      authDomain={authDomain}
    />
  );
}
