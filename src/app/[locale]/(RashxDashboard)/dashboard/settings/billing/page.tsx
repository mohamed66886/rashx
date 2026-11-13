import React, { Suspense } from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getBillingSettings } from '@/server/data/billing-settings';
import { BillingSettingsClientView } from '@/components/dashboard/settings/BillingSettingsClientView';
import BillingSettingsLoading from './loading';

interface BillingSettingsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function BillingSettingsContent({ params }: BillingSettingsPageProps) {
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

export default function BillingSettingsPage({ params }: BillingSettingsPageProps) {
  return (
    <Suspense fallback={<BillingSettingsLoading />}>
      <BillingSettingsContent params={params} />
    </Suspense>
  );
}
