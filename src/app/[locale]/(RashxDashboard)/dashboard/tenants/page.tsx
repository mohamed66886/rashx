import React from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getTenantsPage } from '@/server/data/tenants';
import { TenantsClientView } from '@/components/dashboard/tenants/TenantsClientView';

export const instant = false;

export default async function TenantsManagementPage() {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  const data = await getTenantsPage({ limit: 25 });

  return (
    <TenantsClientView
      initialTenants={data.items}
      initialNextCursor={data.nextCursor || null}
      initialHasMore={data.hasMore}
    />
  );
}
