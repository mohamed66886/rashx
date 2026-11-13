import React, { Suspense } from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getLeadsPage } from '@/server/data/leads';
import { LeadsClientView } from '@/components/dashboard/leads/LeadsClientView';
import LeadsLoading from './loading';

interface LeadsPipelinePageProps {
  params: Promise<{ locale: string }>;
}

async function LeadsContent({ params }: LeadsPipelinePageProps) {
  await requireAdmin(['super_admin', 'platform_engineer', 'support_lead', 'sales_director']);
  const { locale: rawLocale } = await params;
  const locale = rawLocale || 'ar';
  const data = await getLeadsPage({ limit: 25 });

  return (
    <LeadsClientView
      initialLeads={data.items}
      initialNextCursor={data.nextCursor || null}
      initialHasMore={data.hasMore}
      locale={locale}
    />
  );
}

export default function LeadsPipelinePage({ params }: LeadsPipelinePageProps) {
  return (
    <Suspense fallback={<LeadsLoading />}>
      <LeadsContent params={params} />
    </Suspense>
  );
}
