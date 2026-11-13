import React, { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { requireAdmin } from '@/server/auth/session';
import { getInvoice } from '@/server/data/invoices';
import { getBillingSettings, toBillingSettings } from '@/server/data/billing-settings';
import { getClauses } from '@/server/data/clauses';
import { InvoiceEditorClientView } from '@/components/dashboard/invoices/InvoiceEditorClientView';
import EditInvoiceLoading from './loading';

interface EditInvoicePageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

async function EditInvoiceContent({ params }: EditInvoicePageProps) {
  const { locale, id } = await params;
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director'], { locale });

  const invoice = await getInvoice(id);

  if (!invoice) {
    notFound();
  }

  // Only drafts can be modified
  if (invoice.status !== 'draft') {
    redirect(`/${locale}/dashboard/invoices/${id}`);
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

export default function EditInvoicePage({ params }: EditInvoicePageProps) {
  return (
    <Suspense fallback={<EditInvoiceLoading />}>
      <EditInvoiceContent params={params} />
    </Suspense>
  );
}
