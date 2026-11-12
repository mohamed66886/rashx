import React from 'react';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/server/auth/session';
import { getInvoice, getInvoiceEvents } from '@/server/data/invoices';
import { getBillingSettings, toBillingSettings } from '@/server/data/billing-settings';
import { InvoiceDetailsClientView } from '@/components/dashboard/invoices/InvoiceDetailsClientView';

export const instant = false;

interface InvoiceDetailsPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  const { locale, id } = await params;
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director'], { locale });

  const [invoice, events, rawBilling] = await Promise.all([
    getInvoice(id),
    getInvoiceEvents(id),
    getBillingSettings(),
  ]);

  if (!invoice) {
    notFound();
  }

  const billingSettings = toBillingSettings(rawBilling);

  return (
    <InvoiceDetailsClientView
      invoice={invoice}
      events={events}
      billingSettings={billingSettings}
    />
  );
}

