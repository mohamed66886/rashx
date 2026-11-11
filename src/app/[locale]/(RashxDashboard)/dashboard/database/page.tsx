import React from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getAdmins } from '@/server/data/admins';
import { getTenantsPage } from '@/server/data/tenants';
import { getAuditLogsPage } from '@/server/data/audit';
import { getAdminSessions } from '@/server/data/sessions';
import { DatabaseClientView } from '@/components/dashboard/database/DatabaseClientView';

export const instant = false;

export default async function PlatformDatabaseInspectorPage() {
  await requireAdmin(['super_admin', 'platform_engineer']);

  const [sessions, tenantsData, admins, auditData] = await Promise.all([
    getAdminSessions(),
    getTenantsPage({ limit: 50 }),
    getAdmins(),
    getAuditLogsPage({ limit: 50 }),
  ]);

  return (
    <DatabaseClientView
      initialSessions={sessions}
      initialTenants={tenantsData.items}
      initialAdmins={admins}
      initialAuditLogs={auditData.items}
      projectId={process.env.FIREBASE_PROJECT_ID || ''}
    />
  );
}
