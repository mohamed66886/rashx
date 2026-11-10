'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    snaptr?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

interface ConversionTrackerProps {
  eventName?: string;
}

/**
 * Fires conversion pixels across GA4, Meta, Snapchat, and TikTok upon thank-you page mount.
 * Follows defensive checks to prevent runtime errors if scripts are blocked or user rejected consent.
 */
export const ConversionTracker: React.FC<ConversionTrackerProps> = () => {
  useEffect(() => {
    // 1. GA4 Conversion Event: generate_lead
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Demo',
          event_label: 'Demo Booking Request',
          value: 1,
          currency: 'SAR',
        });
      }
    } catch {
      // Ignore analytics errors
    }

    // 2. Meta (Facebook) Conversion Event: Lead
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Demo Booking',
          currency: 'SAR',
        });
      }
    } catch {
      // Ignore pixel errors
    }

    // 3. Snapchat Pixel Conversion Event: SIGN_UP
    try {
      if (typeof window.snaptr === 'function') {
        window.snaptr('track', 'SIGN_UP', {
          currency: 'SAR',
        });
      }
    } catch {
      // Ignore pixel errors
    }

    // 4. TikTok Pixel Conversion Event: SubmitForm
    try {
      if (window.ttq && typeof window.ttq.track === 'function') {
        window.ttq.track('SubmitForm', {
          contents: [{ content_type: 'product', content_name: 'Demo Request' }],
        });
      }
    } catch {
      // Ignore pixel errors
    }
  }, []);

  return null;
};

export default ConversionTracker;

