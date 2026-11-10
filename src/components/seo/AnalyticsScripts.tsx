'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { SITE_CONFIG } from '@/config/site';

interface AnalyticsConsent {
  analytics: boolean;
  marketing: boolean;
}

/**
 * PDPL-Compliant Tracking Scripts Manager
 * Dynamically loads GA4, Meta Pixel, Snapchat Pixel, and TikTok Pixel
 * strictly after the user accepts the relevant cookie categories.
 */
export const AnalyticsScripts: React.FC = () => {
  const [consent, setConsent] = useState<AnalyticsConsent>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Read initial consent from localStorage
    const readConsent = () => {
      try {
        const stored = localStorage.getItem('rashx_cookie_consent_v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          const categories = parsed.categories || {};
          setConsent({
            analytics: Boolean(categories.analytics),
            marketing: Boolean(categories.marketing),
          });
        }
      } catch {
        // Ignore localStorage error
      }
    };

    readConsent();

    // Listen to cookie consent update event
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.categories) {
        setConsent({
          analytics: Boolean(customEvent.detail.categories.analytics),
          marketing: Boolean(customEvent.detail.categories.marketing),
        });
      }
    };

    window.addEventListener('rashx-cookie-consent-updated', handleConsentChange);
    return () => {
      window.removeEventListener('rashx-cookie-consent-updated', handleConsentChange);
    };
  }, []);

  const { ga4Id, metaPixelId, snapPixelId, tiktokPixelId } = SITE_CONFIG.analytics;

  return (
    <>
      {/* 1. Google Analytics 4 (GA4) - Activated if user consented to Analytics */}
      {consent.analytics && ga4Id && !ga4Id.includes('[TODO]') && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* 2. Meta (Facebook) Pixel - Activated if user consented to Marketing */}
      {consent.marketing && metaPixelId && !metaPixelId.includes('[TODO]') && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* 3. Snapchat Pixel - Essential for KSA salon & beauty market */}
      {consent.marketing && snapPixelId && !snapPixelId.includes('[TODO]') && (
        <Script id="snap-pixel-init" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init', '${snapPixelId}', { 'user_email': '__INSERT_USER_EMAIL__' });
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      )}

      {/* 4. TikTok Pixel - Essential for KSA beauty demographics */}
      {consent.marketing && tiktokPixelId && !tiktokPixelId.includes('[TODO]') && (
        <Script id="tiktok-pixel-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${tiktokPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
};

export default AnalyticsScripts;

