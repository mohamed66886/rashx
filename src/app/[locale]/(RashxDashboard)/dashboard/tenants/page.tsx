import React, { Suspense } from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getTenantsPage } from '@/server/data/tenants';
import { TenantsClientView } from '@/components/dashboard/tenants/TenantsClientView';
import TenantsLoading from './loading';

async function TenantsContent() {
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

export default function TenantsManagementPage() {
  return (
    <Suspense fallback={<TenantsLoading />}>
      <TenantsContent />
    </Suspense>
  );
}
