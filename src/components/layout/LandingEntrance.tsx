'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

export interface LandingEntranceProps {
  children: React.ReactNode;
  locale?: Locale;
}

/**
 * Luxury Brand Curtain Loader & Fast, Smooth Content Entrance
 * - High-speed SVG stroke draw & fill of RASHX brand mark (~0.95s)
 * - Rapid Dusty Blue progress bar (~1.35s)
 * - Immediate simultaneous content reveal upon curtain lift (~1.4s)
 * - Clean, pure brand intro (no skip/replay buttons)
 * - Full WCAG AAA reduced motion compliance
 */
export const LandingEntrance: React.FC<LandingEntranceProps> = ({
  children,
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  const [isDone, setIsDone] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    clearAllTimers();

    // Check if user prefers reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsDone(true);
      setIsReady(true);
      setIsSettled(true);
      setIsComplete(true);
      document.body.classList.remove('rx-curtain-active');
      return;
    }

    // Lock body scroll while curtain is up
    if (typeof document !== 'undefined') {
      document.body.classList.add('rx-curtain-active');
    }

    // 1. Lift curtain and immediately reveal content smoothly at 1400ms
    const t1 = setTimeout(() => {
      setIsDone(true);
      setIsReady(true);
      if (typeof document !== 'undefined') {
        document.body.classList.remove('rx-curtain-active');
      }
    }, 1400);

    // 2. Mark fully settled and remove curtain overlay from DOM at 2250ms
    const t2 = setTimeout(() => {
      setIsSettled(true);
      setIsComplete(true);
    }, 2250);

    timersRef.current = [t1, t2];

    return () => {
      clearAllTimers();
      if (typeof document !== 'undefined') {
        document.body.classList.remove('rx-curtain-active');
      }
    };
  }, [clearAllTimers]);

  return (
    <>
      {/* 1. Fixed Curtain Overlay (Pure Brand - No Buttons) */}
      {!isComplete && (
        <div
          id="rx-curtain"
          role="status"
          aria-live="polite"
          aria-label={isAr ? 'جاري التحميل' : 'Loading'}
          className={`rx-curtain ${isDone ? 'done' : ''}`}
        >
          {/* Animated Vector Logo */}
          <svg
            className="rx-curtain-logo"
            viewBox="0 0 1048 1000"
            aria-hidden="true"
            focusable="false"
          >
            {/* R body + counter (even-odd) */}
            <path
              className="rx-curtain-p1"
              pathLength={1}
              fillRule="evenodd"
              d="M285 0 H700 C890 0 1018 140 1018 290 C1018 440 905 545 742 575 L831 694 L755 790 L606 590 H430 L417 593 C417 640 415 700 405 760 C385 900 300 985 140 985 L0 985 C150 940 270 860 283 680 L285 0 Z M415 112 H695 C800 115 882 190 882 290 C882 390 800 478 690 480 H415 Z"
            />
            {/* x */}
            <path
              className="rx-curtain-p2"
              pathLength={1}
              d="M897 634 H1033 L903 797 L1048 1000 H898 L823 897 L742 1000 H602 L897 634 Z"
            />
          </svg>

          {/* Dusty Blue Progress Bar Track */}
          <div className="rx-curtain-bar" aria-hidden="true">
            <i />
          </div>
        </div>
      )}

      {/* 2. Fast & Smoothly Revealed Page Content */}
      <div
        className={`rx-landing-entrance ${isReady ? 'ready' : ''} ${
          isSettled ? 'settled' : ''
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default LandingEntrance;
