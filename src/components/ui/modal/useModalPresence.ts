'use client';

import { useState, useEffect, useRef } from 'react';

export interface UseModalPresenceOptions {
  isOpen: boolean;
  onClose?: () => void;
  duration?: number;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
}

export function useModalPresence({
  isOpen,
  onClose,
  duration = 260,
  closeOnEsc = true,
  lockScroll = true,
}: UseModalPresenceOptions) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      void Promise.resolve().then(() => {
        setIsMounted(true);
      });

      // Double requestAnimationFrame ensures the DOM has painted with initial 'hidden' state
      // before transitioning smoothly to 'visible' state.
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setIsVisible(true);
        });
        return () => cancelAnimationFrame(frame2);
      });

      return () => cancelAnimationFrame(frame1);
    } else {
      // Trigger smooth exit transition
      setIsVisible(false);

      // Wait for exit transition to finish before unmounting from DOM
      timeoutRef.current = setTimeout(() => {
        setIsMounted(false);
        timeoutRef.current = null;
      }, duration);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [isOpen, duration]);

  // Lock body scroll with scrollbar width compensation to prevent layout shift
  useEffect(() => {
    if (!lockScroll || !isMounted) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isMounted, lockScroll]);

  // Handle ESC key to close
  useEffect(() => {
    if (!closeOnEsc || !isMounted || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, isMounted, onClose]);

  return {
    isMounted,
    isVisible,
  };
}

