import React from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getInvoicesPage } from '@/server/data/invoices';
import { getTenantsPage } from '@/server/data/tenants';
import { InvoicesClientView } from '@/components/dashboard/invoices/InvoicesClientView';

export const instant = false;

export default async function InvoicesPage() {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  
  const [invoicesData, tenantsData] = await Promise.all([
    getInvoicesPage({ limit: 50 }),
    getTenantsPage({ limit: 100 }),
  ]);

  return (
    <InvoicesClientView
      initialInvoices={invoicesData.items}
      tenants={tenantsData.items}
    />
  );
}

