'use client';

import { useEffect, useState } from 'react';

/**
 * Keeps an element mounted long enough to play its exit keyframe animation.
 *
 * Usage:
 *   const { mounted, visible } = usePresence(isOpen, 260);
 *   if (!mounted) return null;
 *
 *   <div
 *     data-state={visible ? 'open' : 'closed'}
 *     className="data-[state=open]:animate-rx-sheet-in data-[state=closed]:animate-rx-sheet-out"
 *   />
 */
export function usePresence(open: boolean, exitMs = 280) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      void Promise.resolve().then(() => {
        setMounted(true);
        setVisible(true);
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), exitMs);
      return () => clearTimeout(timer);
    }
  }, [open, exitMs]);

  return { mounted, visible };
}
