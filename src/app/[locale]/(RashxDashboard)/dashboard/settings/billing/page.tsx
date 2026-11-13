import React from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getBillingSettings } from '@/server/data/billing-settings';
import { BillingSettingsClientView } from '@/components/dashboard/settings/BillingSettingsClientView';


interface BillingSettingsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BillingSettingsPage({ params }: BillingSettingsPageProps) {
  await requireAdmin(['super_admin', 'platform_engineer']);
  const { locale } = await params;

  const billingSettings = await getBillingSettings();

  return (
    <BillingSettingsClientView
      initialSettings={billingSettings}
      locale={locale}
    />
  );
}

