'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface FloatingWhatsAppProps {
  locale?: Locale;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ locale = DEFAULT_LOCALE }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const isAr = locale === 'ar';

  const whatsappHref = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <aside
      aria-label={isAr ? 'الدعم الفني عبر واتساب' : 'WhatsApp Support'}
      className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-2"
    >
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative bg-white text-ink text-xs font-medium px-3.5 py-2 rounded-2xl shadow-lg border border-mist-gray flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[220px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="flex-1 text-[11px] leading-tight">
            {isAr
              ? 'مستشارك في راش إكس متصل الآن، كيف نساعدك؟'
              : 'Our advisor is online now. How can we help?'}
          </p>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-ink-muted hover:text-ink p-0.5 rounded-full"
            aria-label={isAr ? 'إغلاق التلميح' : 'Close tooltip'}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label={isAr ? 'محادثة فورية عبر واتساب راش إكس' : 'Chat with RashX on WhatsApp'}
      >
        {/* Pulsing halo */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-0" />

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z" />
        </svg>

        {/* Small country indicator */}
        <span className="absolute -top-1 -start-1 w-5 h-5 rounded-full bg-white border border-mist-gray flex items-center justify-center text-[10px] shadow-xs">
          🇸🇦
        </span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;

