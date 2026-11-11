'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function RootLoginRedirect() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';

  useEffect(() => {
    router.replace(`/${locale}/dashboard/login`);
  }, [router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]">
      <div className="w-8 h-8 border-4 border-[#91B8C0]/20 border-t-[#91B8C0] rounded-full animate-spin" />
    </div>
  );
}

