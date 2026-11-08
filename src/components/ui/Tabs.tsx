'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* =========================================================================
   0. DESIGN PER SCREEN SIZE
   -------------------------------------------------------------------------
   variant="auto" (default) gives each screen its own design:

   • Mobile  (< 640px)   → CHIPS      : scrollable rounded chips, 44px touch
                                         targets, black pill slides behind the
                                         active chip, edge-fade scroll hint,
                                         swipe left/right on the content.
   • Tablet  (640–1023)  → SEGMENTED  : compact segmented control on a soft
                                         track, white thumb slides.
   • Desktop (≥ 1024px)  → UNDERLINE  : full-width baseline, bigger text,
                                         hover background, black bar slides.

   You can still force one design on every screen with
   variant="chips" | "segmented" | "underline"
   (the old values "buttons" → chips and "pills" → segmented still work).
   ========================================================================= */

export type TabsVariant =
  | 'auto'
  | 'chips'
  | 'segmented'
  | 'underline'
  | 'pills' // legacy alias of "segmented"
  | 'buttons'; // legacy alias of "chips"
export type TabsSize = 'sm' | 'md' | 'lg';

type Mode = 'auto' | 'chips' | 'segmented' | 'underline';

const resolveMode = (v: TabsVariant): Mode =>
  v === 'pills' ? 'segmented' : v === 'buttons' ? 'chips' : v;

/* ---- list (track) look — width is handled separately for fullWidth ---- */
const LIST_LOOK: Record<Mode, string> = {
  chips: 'gap-2 py-1',
  segmented: 'gap-1 rounded-2xl bg-[#E5E9E8]/70 p-1',
  underline: 'gap-1 shadow-[inset_0_-1px_0_#E5E9E8]',
  auto:
    'gap-2 py-1 sm:gap-1 sm:rounded-2xl sm:bg-[#E5E9E8]/70 sm:p-1 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-[inset_0_-1px_0_#E5E9E8]',
};

const LIST_WIDTH = (mode: Mode, fullWidth: boolean): string => {
  if (fullWidth) return 'w-full [&>[role=tab]]:flex-1';
  return {
    chips: 'w-full',
    segmented: 'w-fit',
    underline: 'w-full',
    auto: 'w-full sm:w-fit lg:w-full',
  }[mode];
};

/* ---- sliding indicator (positioned with CSS vars measured from the tab) ---- */
const INDICATOR: Record<Mode, string> = {
  chips:
    'left-[var(--ix)] w-[var(--iw)] top-[var(--iy)] h-[var(--ih)] rounded-full bg-black',
  segmented:
    'left-[var(--ix)] w-[var(--iw)] top-[var(--iy)] h-[var(--ih)] rounded-xl bg-white border border-[#E5E9E8]',
  underline:
    'left-[var(--ix)] w-[var(--iw)] bottom-0 h-0.5 rounded-full bg-black',
  auto:
    'left-[var(--ix)] w-[var(--iw)] top-[var(--iy)] h-[var(--ih)] rounded-full bg-black sm:rounded-xl sm:bg-white sm:border sm:border-[#E5E9E8] lg:top-auto lg:bottom-0 lg:h-0.5 lg:rounded-full lg:bg-black lg:border-0',
};

/* ---- trigger look ---- */
const TRIGGER: Record<Mode, { base: string; active: string; inactive: string }> = {
  chips: {
    base: 'rounded-full border',
    active: 'border-transparent text-white font-bold',
    inactive:
      'border-[#D5DBDA] text-[#5E6665] font-semibold hover:border-[#91B8C0] hover:text-black',
  },
  segmented: {
    base: 'rounded-xl',
    active: 'text-black font-bold',
    inactive: 'text-[#5E6665] font-semibold hover:text-black',
  },
  underline: {
    base: 'rounded-t-lg',
    active: 'text-black font-bold',
    inactive: 'text-[#5E6665] font-semibold hover:bg-[#E5E9E8]/50 hover:text-black',
  },
  auto: {
    base: 'rounded-full border sm:rounded-xl sm:border-transparent lg:rounded-b-none lg:rounded-t-lg',
    active: 'border-transparent text-white font-bold sm:text-black',
    inactive:
      'border-[#D5DBDA] text-[#5E6665] font-semibold hover:border-[#91B8C0] hover:text-black sm:border-transparent sm:hover:border-transparent lg:hover:bg-[#E5E9E8]/50',
  },
};

const BADGE: Record<Mode, { active: string; inactive: string }> = {
  chips: { active: 'bg-white/20 text-white', inactive: 'bg-[#91B8C0]/35 text-black' },
  segmented: { active: 'bg-[#91B8C0]/35 text-black', inactive: 'bg-[#91B8C0]/35 text-black' },
  underline: { active: 'bg-[#91B8C0]/35 text-black', inactive: 'bg-[#91B8C0]/35 text-black' },
  auto: {
    active: 'bg-white/20 text-white sm:bg-[#91B8C0]/35 sm:text-black',
    inactive: 'bg-[#91B8C0]/35 text-black',
  },
};

/* ---- sizes ---- */
const SIZE_FIXED: Record<TabsSize, string> = {
  sm: 'h-9 px-3 text-xs gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-[15px] gap-2.5',
};
const SIZE_AUTO: Record<TabsSize, string> = {
  sm: 'h-10 px-3.5 text-[13px] gap-1.5 sm:h-9 sm:px-3 sm:text-xs lg:h-10 lg:px-3.5 lg:text-[13px]',
  md: 'h-11 px-4 text-sm gap-2 sm:h-10 lg:h-12 lg:px-5 lg:text-[15px] lg:gap-2.5',
  lg: 'h-12 px-5 text-[15px] gap-2 sm:h-11 lg:h-14 lg:px-6 lg:text-base lg:gap-2.5',
};

/* ring is inset so the scroll container never clips it */
const FOCUS_INSET =
  'outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#91B8C0]';
const FOCUS_OUTSET =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/* =========================================================================
   1. CONTEXT
   ========================================================================= */

interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
  mode: Mode;
  size: TabsSize;
  baseId: string;
  swipeable: boolean;
  step: (dir: 1 | -1) => void;
  /** +1 / -1: side the new panel enters from (RTL aware) */
  enterX: number;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be rendered inside <Tabs>');
  return ctx;
}

/* =========================================================================
   2. ROOT <Tabs>
   ========================================================================= */

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 'auto' = a different design per screen size (default) */
  variant?: TabsVariant;
  size?: TabsSize;
  /** Swipe the content left/right to change tab on touch screens (default: true) */
  swipeable?: boolean;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue = '',
      onValueChange,
      variant = 'auto',
      size = 'md',
      swipeable = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [enterX, setEnterX] = useState(0);
    const baseId = useId();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const isControlled = value !== undefined;
    const activeValue = isControlled ? value : internalValue;

    const activeRef = useRef(activeValue);
    activeRef.current = activeValue;

    const setRootRefs = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const getTabs = useCallback((): HTMLButtonElement[] => {
      const list = rootRef.current?.querySelector('[role="tablist"]');
      return Array.from(
        list?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []
      );
    }, []);

    const setActiveValue = useCallback(
      (val: string) => {
        if (val === activeRef.current) return;
        const tabs = getTabs();
        const from = tabs.findIndex((t) => t.dataset.value === activeRef.current);
        const to = tabs.findIndex((t) => t.dataset.value === val);
        if (from !== -1 && to !== -1 && rootRef.current) {
          const rtl = getComputedStyle(rootRef.current).direction === 'rtl';
          setEnterX((to > from ? 1 : -1) * (rtl ? -1 : 1));
        }
        if (!isControlled) setInternalValue(val);
        onValueChange?.(val);
      },
      [getTabs, isControlled, onValueChange]
    );

    const step = useCallback(
      (dir: 1 | -1) => {
        const tabs = getTabs();
        const i = tabs.findIndex((t) => t.dataset.value === activeRef.current);
        const next = tabs[i + dir];
        if (next?.dataset.value) setActiveValue(next.dataset.value);
      },
      [getTabs, setActiveValue]
    );

    return (
      <TabsContext.Provider
        value={{
          activeValue,
          setActiveValue,
          mode: resolveMode(variant),
          size,
          baseId,
          swipeable,
          step,
          enterX,
        }}
      >
        <div ref={setRootRefs} className={`w-full min-w-0 ${className}`} {...props}>
          <TabsStyles />
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

/* =========================================================================
   3. <TabsList>
   ========================================================================= */

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

interface IndicatorBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

const FADE_PX = 28;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className = '', fullWidth = false, children, onKeyDown, onScroll, style, ...props }, ref) => {
    const { mode, activeValue } = useTabsContext();
    const listRef = useRef<HTMLDivElement | null>(null);
    const [box, setBox] = useState<IndicatorBox | null>(null);
    const [ready, setReady] = useState(false);
    const [fade, setFade] = useState({ l: false, r: false });

    const setRefs = (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    /* edge-fade: show a soft fade only on the side that has more tabs */
    const updateFade = useCallback(() => {
      const el = listRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) {
        setFade((p) => (p.l || p.r ? { l: false, r: false } : p));
        return;
      }
      const rtl = getComputedStyle(el).direction === 'rtl';
      const pos = Math.abs(el.scrollLeft);
      const atStart = pos <= 1;
      const atEnd = pos >= max - 1;
      const l = rtl ? !atEnd : !atStart;
      const r = rtl ? !atStart : !atEnd;
      setFade((p) => (p.l === l && p.r === r ? p : { l, r }));
    }, []);

    const measure = useCallback(() => {
      const list = listRef.current;
      if (!list) return;
      const active = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!active) {
        setBox(null);
      } else {
        const next = {
          x: active.offsetLeft,
          y: active.offsetTop,
          w: active.offsetWidth,
          h: active.offsetHeight,
        };
        setBox((p) =>
          p && p.x === next.x && p.y === next.y && p.w === next.w && p.h === next.h ? p : next
        );
      }
      updateFade();
    }, [updateFade]);

    useIsoLayoutEffect(() => {
      measure();
      const list = listRef.current;
      if (!list) return;
      // keep the active tab in view when the row scrolls (no page scroll)
      if (list.scrollWidth > list.clientWidth + 1) {
        list
          .querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
          ?.scrollIntoView?.({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
      const raf = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(raf);
    }, [activeValue, measure, children]);

    useEffect(() => {
      const list = listRef.current;
      if (!list || typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(measure);
      ro.observe(list);
      list.querySelectorAll('[role="tab"]').forEach((el) => ro.observe(el));
      if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
      return () => ro.disconnect();
    }, [measure, children]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      const list = listRef.current;
      if (!list) return;
      const tabs = Array.from(
        list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      if (!tabs.length) return;
      const current = tabs.findIndex((t) => t === document.activeElement);
      const rtl = getComputedStyle(list).direction === 'rtl';
      const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
      const backward = rtl ? 'ArrowRight' : 'ArrowLeft';

      let next = -1;
      if (e.key === forward) next = (current + 1) % tabs.length;
      else if (e.key === backward) next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === -1) return;

      e.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    };

    const mask =
      fade.l || fade.r
        ? `linear-gradient(to right, transparent 0, #000 ${fade.l ? FADE_PX : 0}px, #000 calc(100% - ${
            fade.r ? FADE_PX : 0
          }px), transparent 100%)`
        : undefined;

    return (
      <div
        ref={setRefs}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        onScroll={(e) => {
          onScroll?.(e);
          updateFade();
        }}
        style={{ WebkitMaskImage: mask, maskImage: mask, ...style }}
        className={`relative flex max-w-full snap-x items-center overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${LIST_WIDTH(
          mode,
          fullWidth
        )} ${LIST_LOOK[mode]} ${className}`}
        {...props}
      >
        {box && (
          <span
            aria-hidden
            className={`tabs-indicator pointer-events-none absolute ${INDICATOR[mode]} ${
              ready
                ? 'transition-[left,width,top,height] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]'
                : ''
            }`}
            style={
              {
                '--ix': `${box.x}px`,
                '--iy': `${box.y}px`,
                '--iw': `${box.w}px`,
                '--ih': `${box.h}px`,
              } as React.CSSProperties
            }
          />
        )}
        {children}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

/* =========================================================================
   4. <TabsTrigger>
   ========================================================================= */

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, icon, badge, disabled = false, className = '', children, onClick, ...props }, ref) => {
    const { activeValue, setActiveValue, mode, size, baseId } = useTabsContext();
    const isActive = activeValue === value;
    const look = TRIGGER[mode];
    const sizeCls = mode === 'auto' ? SIZE_AUTO[size] : SIZE_FIXED[size];

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        data-value={value}
        id={`${baseId}-trigger-${value}`}
        aria-controls={`${baseId}-content-${value}`}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e);
          if (!disabled && !e.defaultPrevented) setActiveValue(value);
        }}
        className={`relative z-10 inline-flex shrink-0 snap-center cursor-pointer select-none items-center justify-center whitespace-nowrap transition-colors duration-200 active:scale-[0.97] touch-manipulation [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-40 ${FOCUS_INSET} ${sizeCls} ${look.base} ${
          isActive ? look.active : look.inactive
        } ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
        <span className="truncate">{children}</span>
        {badge && (
          <span
            className={`shrink-0 rounded-full px-1.5 text-[10px] font-bold leading-5 ${
              isActive ? BADGE[mode].active : BADGE[mode].inactive
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

/* =========================================================================
   5. <TabsContent>  (mobile: slide + swipe · tablet/desktop: fade)
   ========================================================================= */

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

/** true when a swipe starting on this element must NOT change the tab */
function blocksSwipe(target: HTMLElement | null, root: HTMLElement): boolean {
  let el: HTMLElement | null = target;
  while (el) {
    if (el.matches('input, textarea, select, [contenteditable="true"], [data-no-swipe]')) {
      return true;
    }
    const ox = getComputedStyle(el).overflowX;
    if ((ox === 'auto' || ox === 'scroll') && el.scrollWidth > el.clientWidth + 1) return true;
    if (el === root) break;
    el = el.parentElement;
  }
  return false;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  (
    {
      value,
      forceMount = false,
      className = '',
      children,
      style,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      ...props
    },
    ref
  ) => {
    const { activeValue, baseId, swipeable, step, enterX } = useTabsContext();
    const touch = useRef<{ x: number; y: number } | null>(null);
    const isActive = activeValue === value;
    if (!isActive && !forceMount) return null;

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      onTouchStart?.(e);
      if (!swipeable || !isActive || e.touches.length !== 1) {
        touch.current = null;
        return;
      }
      const t = e.touches[0];
      touch.current = blocksSwipe(e.target as HTMLElement, e.currentTarget)
        ? null
        : { x: t.clientX, y: t.clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
      onTouchEnd?.(e);
      const start = touch.current;
      touch.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
      const goNext = rtl ? dx > 0 : dx < 0;
      step(goNext ? 1 : -1);
    };

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-content-${value}`}
        aria-labelledby={`${baseId}-trigger-${value}`}
        hidden={!isActive}
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={(e) => {
          onTouchCancel?.(e);
          touch.current = null;
        }}
        style={{ '--tabs-d': enterX, ...style } as React.CSSProperties}
        className={`tabs-panel mt-3 w-full rounded-xl sm:mt-4 lg:mt-6 ${FOCUS_OUTSET} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';

/* =========================================================================
   6. SimpleTabs
   ========================================================================= */

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface SimpleTabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  swipeable?: boolean;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}

export const SimpleTabs: React.FC<SimpleTabsProps> = ({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = 'auto',
  size = 'md',
  fullWidth = false,
  swipeable = true,
  className = '',
  listClassName = '',
  contentClassName = '',
}) => {
  const initial = defaultValue || (items.length > 0 ? items[0].value : '');

  return (
    <Tabs
      value={value}
      defaultValue={initial}
      onValueChange={onValueChange}
      variant={variant}
      size={size}
      swipeable={swipeable}
      className={className}
    >
      <TabsList fullWidth={fullWidth} className={listClassName}>
        {items.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            badge={tab.badge}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className={contentClassName}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

/* Keyframes (no Tailwind plugin needed).
   Mobile: panel slides in from the side the tab is on. Tablet/desktop: soft fade-up. */
export const TabsStyles: React.FC = () => (
  <style>{`
    @keyframes tabsFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    @keyframes tabsSlide { from { opacity: 0; transform: translateX(calc(var(--tabs-d, 0) * 24px)); } to { opacity: 1; transform: none; } }
    .tabs-panel { animation: tabsFade 220ms ease-out both; }
    @media (max-width: 639px) {
      .tabs-panel { animation: tabsSlide 260ms cubic-bezier(0.32, 0.72, 0, 1) both; }
    }
    @media (prefers-reduced-motion: reduce) {
      .tabs-panel { animation: none; }
      .tabs-indicator { transition: none !important; }
    }
  `}</style>
);

export default Tabs;