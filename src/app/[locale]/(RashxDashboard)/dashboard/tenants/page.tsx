import React from 'react';
import { getTenantsPage } from '@/server/data/tenants';
import { TenantsClientView } from '@/components/dashboard/tenants/TenantsClientView';

export const instant = false;

export default async function TenantsManagementPage() {
  const data = await getTenantsPage({ limit: 25 });

  return (
    <TenantsClientView
      initialTenants={data.items}
      initialNextCursor={data.nextCursor || null}
      initialHasMore={data.hasMore}
    />
  );
}
