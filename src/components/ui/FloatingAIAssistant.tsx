'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

/* =========================================================================
   TYPES
   ========================================================================= */

export type FloatingAIPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

export interface FloatingAIAssistantProps {
  /** Animoji Avatar ID (defaults to 138) */
  animojiId?: number | string;
  /** Custom Avatar image URL override */
  avatarSrc?: string;
  /** Message displayed in the speech bubble */
  message?: string;
  /** Screen position (default: 'bottom-right') */
  position?: FloatingAIPosition;
  /** Controlled open state of the speech bubble */
  isOpen?: boolean;
  /** Controlled open change callback */
  onOpenChange?: (open: boolean) => void;
  /** Delay before the bubble auto-opens, ms (default: 500) */
  autoOpenDelay?: number;
  /** Typing effect (default: true). Skipped when user prefers reduced motion */
  typingEffect?: boolean;
  /** Typing speed, ms per character (default: 20) */
  typingSpeed?: number;
  /** Show the close button (default: true) */
  showCloseButton?: boolean;
  /** Auto hide after N seconds (0 = keep until dismissed). Pauses while touching/hovering */
  autoHideSeconds?: number;
  /** Text direction (default: 'rtl') */
  dir?: 'rtl' | 'ltr';
  /**
   * Extra distance (px) from the screen edge on MOBILE only, for bottom positions.
   * Use it to sit above a bottom nav bar (e.g. 72). Default: 0
   */
  mobileOffset?: number;
  /** Extra container className */
  className?: string;
}

const DEFAULT_MESSAGE =
  'أهلاً بك في راش إكس! 🚀 جاهز لمساعدتك في أي استفسار حول الفواتير والامتثال المالي.';

/** Must match the .rashx-bubble exit animation duration in the <style> below */
const EXIT_MS = 220;

const emptySubscribe = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/* =========================================================================
   COMPONENT
   Mobile (< 640px): bubble stacks ABOVE (or below, for top positions) the
   avatar, full available width, tail pointing at the avatar.
   Tablet/Desktop (>= 640px): bubble sits beside the avatar.
   ========================================================================= */

export const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({
  animojiId = 138,
  avatarSrc,
  message = DEFAULT_MESSAGE,
  position = 'bottom-right',
  isOpen: controlledIsOpen,
  onOpenChange,
  autoOpenDelay = 500,
  typingEffect = true,
  typingSpeed = 20,
  showCloseButton = true,
  autoHideSeconds = 0,
  dir = 'rtl',
  mobileOffset = 0,
  className = '',
}) => {
  const isClient = useIsClient();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [paused, setPaused] = useState(false);
  // Keeps the bubble mounted while its exit animation plays
  const [bubbleMounted, setBubbleMounted] = useState(false);

  const isBubbleOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setBubbleOpen = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setInternalIsOpen(open);
    },
    [onOpenChange]
  );

  // Mount on open, unmount only after the exit animation has finished
  useEffect(() => {
    if (isBubbleOpen) {
      setBubbleMounted(true);
      return;
    }
    const t = setTimeout(() => {
      setBubbleMounted(false);
      setDisplayedText('');
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [isBubbleOpen]);

  // Auto-open on mount (uncontrolled only)
  useEffect(() => {
    if (controlledIsOpen !== undefined) return;
    const timer = setTimeout(() => setInternalIsOpen(true), autoOpenDelay);
    return () => clearTimeout(timer);
  }, [controlledIsOpen, autoOpenDelay]);

  // Auto-hide (pauses while the user touches / hovers / focuses the bubble)
  useEffect(() => {
    if (!isBubbleOpen || autoHideSeconds <= 0 || paused) return;
    const hideTimer = setTimeout(
      () => setBubbleOpen(false),
      autoHideSeconds * 1000
    );
    return () => clearTimeout(hideTimer);
  }, [isBubbleOpen, autoHideSeconds, paused, setBubbleOpen]);

  // Escape closes the bubble
  useEffect(() => {
    if (!isBubbleOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBubbleOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isBubbleOpen, setBubbleOpen]);

  // Typing effect — restarts cleanly on every open / message change
  useEffect(() => {
    // On close the text stays visible while the bubble fades out
    if (!isBubbleOpen) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!typingEffect || reduceMotion) {
      setDisplayedText(message);
      return;
    }

    setDisplayedText('');
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(message.slice(0, index));
      if (index >= message.length) clearInterval(interval);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isBubbleOpen, message, typingEffect, typingSpeed]);

  if (!isClient) return null;

  const resolvedAvatarSrc = avatarSrc || `/avatars/animoji-${animojiId}.webp`;
  const isRight = position.endsWith('right');
  const isBottom = position.startsWith('bottom');
  const isTyping = isBubbleOpen && displayedText.length < message.length;
  const showBubble = isBubbleOpen || bubbleMounted;

  // Layout wrapper is physically LTR so left/right mean what they say.
  // Mobile: column (bubble above avatar for bottom positions). sm+: row.
  const layoutCls = isBottom
    ? isRight
      ? 'flex-col-reverse items-end sm:flex-row-reverse'
      : 'flex-col-reverse items-start sm:flex-row'
    : isRight
      ? 'flex-col items-end sm:flex-row-reverse'
      : 'flex-col items-start sm:flex-row';

  return (
    <>
      <style>{`
        /* ---------- Positioning (safe-area aware) ---------- */
        .rashx-root[data-pos^='bottom'] {
          bottom: calc(max(1rem, env(safe-area-inset-bottom)) + var(--rashx-mobile-offset, 0px));
        }
        .rashx-root[data-pos^='top']    { top: max(1rem, env(safe-area-inset-top)); }
        .rashx-root[data-pos$='right']  { right: max(1rem, env(safe-area-inset-right)); }
        .rashx-root[data-pos$='left']   { left: max(1rem, env(safe-area-inset-left)); }
        @media (min-width: 640px) {
          .rashx-root[data-pos^='bottom'] { bottom: 1.5rem; }
          .rashx-root[data-pos^='top']    { top: 1.5rem; }
          .rashx-root[data-pos$='right']  { right: 1.5rem; }
          .rashx-root[data-pos$='left']   { left: 1.5rem; }
        }

        /* ---------- Bubble sizing ---------- */
        .rashx-bubble {
          width: min(22rem, calc(100vw - 2rem - env(safe-area-inset-left) - env(safe-area-inset-right)));
          /* mobile: grows from the avatar vertically */
          --sx: 0px;
          --sy: var(--rashx-sy);
          transform-origin: var(--rashx-origin-m);
        }
        @media (min-width: 640px) {
          .rashx-bubble {
            width: 300px;
            --sx: var(--rashx-sx);
            --sy: 0px;
            transform-origin: var(--rashx-origin-d);
          }
        }

        /* ---------- Animations ---------- */
        @keyframes rashxFloatAvatar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes rashxAvatarIn {
          0%   { opacity: 0; transform: scale(0.3) rotate(-14deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes rashxBubbleIn {
          0%   { opacity: 0; transform: translate(var(--sx), var(--sy)) scale(0.7); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes rashxBubbleOut {
          0%   { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--sx), var(--sy)) scale(0.85); }
        }
        .rashx-float { animation: rashxFloatAvatar 5s ease-in-out infinite; }
        .rashx-avatar-in {
          animation: rashxAvatarIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .rashx-bubble[data-state='open'] {
          animation: rashxBubbleIn 0.4s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }
        .rashx-bubble[data-state='closed'] {
          animation: rashxBubbleOut 0.2s cubic-bezier(0.4, 0, 1, 1) both;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .rashx-float, .rashx-avatar-in { animation: none; }
          .rashx-bubble[data-state] { animation-duration: 0.01ms; }
        }
      `}</style>

      <div
        data-pos={position}
        style={
          { '--rashx-mobile-offset': `${mobileOffset}px` } as React.CSSProperties
        }
        className={`rashx-root fixed z-[9985] select-none pointer-events-none ${className}`}
      >
        <div
          style={{ direction: 'ltr' }}
          className={`flex gap-2.5 sm:gap-3 sm:items-center pointer-events-auto ${layoutCls}`}
        >
          {/* ---------- Avatar ---------- */}
          <div className="rashx-avatar-in shrink-0">
            <div className="rashx-float">
              <button
                type="button"
                onClick={() => setBubbleOpen(!isBubbleOpen)}
                aria-label={isBubbleOpen ? 'إخفاء الرسالة' : 'إظهار الرسالة'}
                aria-expanded={isBubbleOpen}
                className="relative block w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#F0C5AE]/40 via-white to-[#91B8C0]/35 border-2 border-[#91B8C0] p-0.5 shadow-lg touch-manipulation [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:scale-[1.04] active:scale-95 transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] focus-visible:ring-offset-2"
              >
                <span className="relative block w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={resolvedAvatarSrc}
                    alt=""
                    width={128}
                    height={128}
                    priority
                    className="w-full h-full object-cover object-center"
                  />
                </span>

                {/* Online dot */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
                />
              </button>
            </div>
          </div>

          {/* ---------- Speech bubble ---------- */}
          {showBubble && (
            <div
              dir={dir}
              data-state={isBubbleOpen ? 'open' : 'closed'}
              style={
                {
                  // mobile: slide vertically toward the avatar
                  '--rashx-sy': isBottom ? '14px' : '-14px',
                  '--rashx-origin-m': `${isBottom ? 'bottom' : 'top'} ${isRight ? 'right' : 'left'}`,
                  // tablet/desktop: slide horizontally toward the avatar
                  '--rashx-sx': isRight ? '16px' : '-16px',
                  '--rashx-origin-d': `${isRight ? 'right' : 'left'} center`,
                } as React.CSSProperties
              }
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setPaused(true);
              }}
              onPointerLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="rashx-bubble relative rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5E9E8] shadow-xl ps-4 pe-11 sm:pe-9 py-3.5 sm:py-3 text-start"
            >
              {/* Tail — mobile: vertical, centered over the avatar */}
              <span
                aria-hidden="true"
                className={`sm:hidden absolute w-3 h-3 bg-white rotate-45 border-[#E5E9E8] ${
                  isBottom
                    ? '-bottom-1.5 border-b border-r'
                    : '-top-1.5 border-t border-l'
                } ${isRight ? 'right-[22px]' : 'left-[22px]'}`}
              />
              {/* Tail — tablet/desktop: side, pointing at the avatar */}
              <span
                aria-hidden="true"
                className={`hidden sm:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-[#E5E9E8] ${
                  isRight
                    ? '-right-1.5 border-t border-r'
                    : '-left-1.5 border-b border-l'
                }`}
              />

              {showCloseButton && (
                <button
                  type="button"
                  onClick={() => setBubbleOpen(false)}
                  aria-label="إغلاق الرسالة"
                  className="absolute top-1 end-1 sm:top-1.5 sm:end-1.5 flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-[#5E6665] opacity-70 hover:opacity-100 active:bg-black/5 sm:hover:bg-black/5 transition touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] cursor-pointer"
                >
                  <X className="w-[18px] h-[18px] sm:w-4 sm:h-4" />
                </button>
              )}

              {/* Screen readers get the full message once */}
              <span role="status" aria-live="polite" className="sr-only">
                {message}
              </span>

              {/* Visible text: full message reserves the height (no jumping) */}
              <p
                aria-hidden="true"
                className="grid text-sm sm:text-[13.5px] text-black font-medium leading-relaxed"
              >
                <span className="invisible col-start-1 row-start-1">
                  {message}
                </span>
                <span className="col-start-1 row-start-1">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-[3px] h-3.5 bg-[#91B8C0] align-middle me-1 rounded-sm animate-pulse motion-reduce:animate-none" />
                  )}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const FloatingAIAvatar = FloatingAIAssistant;
export default FloatingAIAssistant;