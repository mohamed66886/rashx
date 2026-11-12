import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { requireAdmin } from '@/server/auth/session';
import { getInvoice } from '@/server/data/invoices';
import { getBillingSettings, toBillingSettings } from '@/server/data/billing-settings';
import { getClauses } from '@/server/data/clauses';
import { InvoiceEditorClientView } from '@/components/dashboard/invoices/InvoiceEditorClientView';

export const instant = false;

interface EditInvoicePageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function EditInvoicePage({ params }: EditInvoicePageProps) {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const { id } = await params;
  const invoice = await getInvoice(id);

  if (!invoice) {
    notFound();
  }

  // Only drafts can be modified
  if (invoice.status !== 'draft') {
    redirect(`/dashboard/invoices/${id}`);
  }

  const [rawBilling, clauses] = await Promise.all([
    getBillingSettings(),
    getClauses(false),
  ]);

  const billingSettings = toBillingSettings(rawBilling);

  return (
    <InvoiceEditorClientView
      initialInvoice={invoice}
      billingSettings={billingSettings}
      clauses={clauses}
      isEdit={true}
    />
  );
}

