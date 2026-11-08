'use client';

import React, { useMemo } from 'react';

/**
 * Figma-style cursors built on REAL CSS cursors (SVG data-URIs).
 *
 * Why not a DOM element that follows the mouse?
 *  - A DOM cursor lives inside the page's stacking order, so dropdowns, portals,
 *    dialogs and popovers (top layer) can be drawn ABOVE it.
 *  - It is moved by JavaScript, so it lags whenever the page is busy.
 *
 * A CSS cursor is drawn by the OS/browser itself: always on top of everything,
 * zero latency, zero JS, nothing to re-render.
 */

type Kind = 'default' | 'pointer' | 'text' | 'disabled';

export interface CustomCursorProps {
  /** Cursor box size in px. Keep it between 20 and 32 (browser limit is 128). Default: 28 */
  size?: number;
  /** Fill color of the arrow / hand / I-beam */
  ink?: string;
  /** Outline color (keeps the cursor readable on dark and light backgrounds) */
  outline?: string;
  /** Color of the "not allowed" sign */
  disabledColor?: string;
}

/* ───────────────────────── Glyphs (24×24 grid) ───────────────────────── */

/** Hotspot = the exact pixel that "clicks", in the 24×24 grid. */
const HOTSPOT: Record<Kind, [number, number]> = {
  default: [4, 2.5],
  pointer: [9.6, 3.5],
  text: [12, 12],
  disabled: [12, 12],
};

const ARROW = 'M4 2.5V19L8 15.2L10.9 21.4L13.7 20.1L10.9 14L16.4 14Z';
const IBEAM = 'M9 4.5H15M12 4.5V19.5M9 19.5H15';

const HAND_SHAPES = [
  '<rect x="8" y="3.5" width="3.2" height="11" rx="1.6"/>',
  '<rect x="11.2" y="9" width="3" height="8" rx="1.5"/>',
  '<rect x="14.2" y="10" width="3" height="7.5" rx="1.5"/>',
  '<rect x="17.2" y="11.5" width="2.8" height="6.5" rx="1.4"/>',
  '<rect x="8" y="12" width="12" height="7.5" rx="3.6"/>',
  '<rect x="4.6" y="12.2" width="3.2" height="6.2" rx="1.6" transform="rotate(-28 6.2 15.3)"/>',
].join('');

function glyph(kind: Kind, c: { ink: string; outline: string; ban: string }): string {
  switch (kind) {
    case 'default':
      return (
        `<path d="${ARROW}" fill="${c.outline}" stroke="${c.outline}" stroke-width="2.6" stroke-linejoin="round"/>` +
        `<path d="${ARROW}" fill="${c.ink}"/>`
      );
    case 'pointer':
      return (
        `<g fill="${c.outline}" stroke="${c.outline}" stroke-width="2.6" stroke-linejoin="round">${HAND_SHAPES}</g>` +
        `<g fill="${c.ink}">${HAND_SHAPES}</g>` +
        `<path d="M11.2 10.2V13.6M14.2 11V14M17.2 12.2V14.4" stroke="${c.outline}" stroke-width="0.7" stroke-linecap="round" opacity="0.7"/>`
      );
    case 'text':
      return (
        `<path d="${IBEAM}" stroke="${c.outline}" stroke-width="3.6" stroke-linecap="round" fill="none"/>` +
        `<path d="${IBEAM}" stroke="${c.ink}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`
      );
    case 'disabled':
      return (
        `<g stroke="${c.outline}" stroke-width="4.4" stroke-linecap="round" fill="none"><circle cx="12" cy="12" r="6.5"/><path d="M7.4 16.6L16.6 7.4"/></g>` +
        `<g stroke="${c.ban}" stroke-width="2.2" stroke-linecap="round" fill="none"><circle cx="12" cy="12" r="6.5"/><path d="M7.4 16.6L16.6 7.4"/></g>`
      );
  }
}

/* ───────────────────────── Selectors ───────────────────────── */

const POINTER_SEL = [
  'a[href]',
  'button',
  'select',
  'summary',
  'label',
  'input',
  '[role="button"]',
  '[role="tab"]',
  '[role="radio"]',
  '[role="checkbox"]',
  '[role="switch"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[data-cursor-interactive]',
  '.cursor-pointer',
].join(',');

const TEXT_SEL = [
  'textarea',
  '[contenteditable=""]',
  '[contenteditable="true"]',
  'input:not([type])',
  'input[type="text"]',
  'input[type="search"]',
  'input[type="email"]',
  'input[type="password"]',
  'input[type="tel"]',
  'input[type="url"]',
  'input[type="number"]',
  '.cursor-text',
].join(',');

const DISABLED_SEL = ':disabled,[aria-disabled="true"],.cursor-not-allowed';

/* ───────────────────────── CSS builder ───────────────────────── */

export function buildCursorCss({
  size = 28,
  ink = '#0B0B0B',
  outline = '#FFFFFF',
  disabledColor = '#EF4444',
}: CustomCursorProps = {}): string {
  const colors = { ink, outline, ban: disabledColor };
  const scale = size / 24;

  const uri = (kind: Kind, px: number) => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" fill="none">` +
      glyph(kind, colors) +
      `</svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const FALLBACK: Record<Kind, string> = {
    default: 'default',
    pointer: 'pointer',
    text: 'text',
    disabled: 'not-allowed',
  };

  const decl = (kind: Kind) => {
    const [hx, hy] = HOTSPOT[kind];
    const x = Math.round(hx * scale);
    const y = Math.round(hy * scale);
    const one = `url("${uri(kind, size)}")`;
    const set = `url("${uri(kind, size)}") 1x, url("${uri(kind, size * 2)}") 2x`;
    // baseline → webkit image-set (crisp on retina) → standard image-set
    return (
      `cursor:${one} ${x} ${y},${FALLBACK[kind]};` +
      `cursor:-webkit-image-set(${set}) ${x} ${y},${FALLBACK[kind]};` +
      `cursor:image-set(${set}) ${x} ${y},${FALLBACK[kind]};`
    );
  };

  // Order matters: later rules win on equal specificity (pointer < text < disabled < forced)
  return `@media (hover:hover) and (pointer:fine){
html{${decl('default')}}
html :is(${POINTER_SEL}){${decl('pointer')}}
html :is(${TEXT_SEL}){${decl('text')}}
html :is(${DISABLED_SEL}){${decl('disabled')}}
html [data-cursor="default"]{${decl('default')}}
html [data-cursor="pointer"]{${decl('pointer')}}
html [data-cursor="text"]{${decl('text')}}
html [data-cursor="disabled"]{${decl('disabled')}}
}`;
}

/* ───────────────────────── Component ───────────────────────── */

export function CustomCursor(props: CustomCursorProps) {
  const { size, ink, outline, disabledColor } = props;
  const css = useMemo(
    () => buildCursorCss({ size, ink, outline, disabledColor }),
    [size, ink, outline, disabledColor]
  );

  // dangerouslySetInnerHTML: <style> is raw text, React must not HTML-escape the data-URIs
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default CustomCursor;