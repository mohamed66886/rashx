import React from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getBillingSettings, toBillingSettings } from '@/server/data/billing-settings';
import { getClauses } from '@/server/data/clauses';
import { InvoiceEditorClientView } from '@/components/dashboard/invoices/InvoiceEditorClientView';


export default async function NewInvoicePage() {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const [rawBilling, clauses] = await Promise.all([
    getBillingSettings(),
    getClauses(false), // active clauses only
  ]);

  const billingSettings = toBillingSettings(rawBilling);

  return (
    <InvoiceEditorClientView
      billingSettings={billingSettings}
      clauses={clauses}
      isEdit={false}
    />
  );
}

