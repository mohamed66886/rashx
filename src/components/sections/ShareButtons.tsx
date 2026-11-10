'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, ExternalLink } from 'lucide-react';
import { Locale } from '@/i18n/config';

interface ShareButtonsProps {
  url: string;
  title: string;
  locale: Locale;
}

export function ShareButtons({ url, title, locale }: ShareButtonsProps) {
  const isAr = locale === 'ar';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-ink-muted font-bold me-1 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-dusty-blue" />
        <span>{isAr ? 'مشاركة المقال:' : 'Share:'}</span>
      </span>

      {/* WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mist-gray hover:bg-[#25D366]/10 hover:text-[#128C7E] text-ink font-semibold transition-colors"
        aria-label="Share on WhatsApp"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366]" />
        <span>واتساب</span>
      </a>

      {/* X / Twitter */}
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mist-gray hover:bg-black/10 text-ink font-semibold transition-colors"
        aria-label="Share on X"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mist-gray hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] text-ink font-semibold transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-3 h-3 fill-[#0A66C2]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
        <span>LinkedIn</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          copied
            ? 'bg-[#10B981] text-white shadow-xs'
            : 'bg-mist-gray hover:bg-mist-gray/80 text-ink'
        }`}
        aria-label={isAr ? 'نسخ رابط المقال' : 'Copy article link'}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{isAr ? 'نسخ الرابط' : 'Copy Link'}</span>
          </>
        )}
      </button>
    </div>
  );
}

