import React from 'react';
import { getLeadsPage } from '@/server/data/leads';
import { LeadsClientView } from '@/components/dashboard/leads/LeadsClientView';

export const instant = false;

interface LeadsPipelinePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LeadsPipelinePage({ params }: LeadsPipelinePageProps) {
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
