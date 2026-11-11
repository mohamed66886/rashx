'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  PhoneCall,
  ArrowUpLeft,
  ArrowUpRight,
  Home,
  CalendarDays,
  LayoutGrid,
  Bell,
  User,
  Search,
  Menu,
  Clock,
  Scissors,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/* =========================================================================
   TYPES & INTERFACES
   ========================================================================= */

export interface HeroProps {
  locale?: Locale;
}

type StatusKey = 'confirmed' | 'pending' | 'done';

/* =========================================================================
   ROTATING PHRASES ("كلام يتغير للأعلى")
   ========================================================================= */

type PhraseIconName = 'nail' | 'calendar' | 'card' | 'receipt' | 'coins' | 'sparkle';

interface Phrase {
  text: string;
  icon: PhraseIconName;
}

const PHRASES_AR: Phrase[] = [
  { text: 'ضغط أقل', icon: 'nail' },
  { text: 'مواعيد أذكى', icon: 'calendar' },
  { text: 'كاشير أسرع', icon: 'card' },
  { text: 'فوترة معتمدة', icon: 'receipt' },
  { text: 'عمولات تلقائية', icon: 'coins' },
  { text: 'موقع بهويتك', icon: 'sparkle' },
];

const PHRASES_EN: Phrase[] = [
  { text: 'Less Stress', icon: 'nail' },
  { text: 'Smarter Booking', icon: 'calendar' },
  { text: 'Faster POS', icon: 'card' },
  { text: 'ZATCA Ready', icon: 'receipt' },
  { text: 'Auto Commissions', icon: 'coins' },
  { text: 'Your Own Brand', icon: 'sparkle' },
];

/* =========================================================================
   BRAND ICONS (custom SVG, replaces emojis so it looks the same everywhere)
   Colors come from the theme: ink outline + dusty-blue / warm-peach fills.
   ========================================================================= */

const PhraseIcon: React.FC<{ name: PhraseIconName }> = ({ name }) => (
  <svg
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
    className="h-[0.85em] w-[0.85em] shrink-0 stroke-ink"
    fill="none"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {name === 'nail' && (
      <>
        <rect x="19" y="4" width="10" height="16" rx="3" className="fill-ink" />
        <rect x="16" y="20" width="16" height="6" rx="2" className="fill-dusty-blue" />
        <rect x="9" y="26" width="30" height="18" rx="7" className="fill-warm-peach" />
        <path d="M16 33v3" strokeWidth={3} className="stroke-white" />
      </>
    )}

    {name === 'calendar' && (
      <>
        <rect x="6" y="10" width="36" height="32" rx="7" className="fill-white" />
        <path d="M6 17a7 7 0 0 1 7-7h22a7 7 0 0 1 7 7v4H6z" className="fill-dusty-blue" />
        <path d="M16 5v8M32 5v8" />
        <rect x="12" y="27" width="6" height="6" rx="1.5" className="fill-warm-peach" strokeWidth={0} />
        <rect x="21" y="27" width="6" height="6" rx="1.5" className="fill-dusty-blue" strokeWidth={0} />
        <rect x="30" y="27" width="6" height="6" rx="1.5" className="fill-warm-peach" strokeWidth={0} />
      </>
    )}

    {name === 'card' && (
      <>
        <rect x="4" y="10" width="40" height="28" rx="6" className="fill-dusty-blue" />
        <path d="M4 18h40v6H4z" className="fill-ink" />
        <rect x="10" y="29" width="11" height="4" rx="2" className="fill-warm-peach" strokeWidth={0} />
      </>
    )}

    {name === 'receipt' && (
      <>
        <path
          d="M12 5h24v38l-4-3-4 3-4-3-4 3-4-3-4 3z"
          className="fill-white"
        />
        <path d="M18 15h12M18 22h12" />
        <path d="M18 29h7" className="stroke-dusty-blue" strokeWidth={3.4} />
        <circle cx="32" cy="29" r="1.6" className="fill-warm-peach" strokeWidth={0} />
      </>
    )}

    {name === 'coins' && (
      <>
        <path d="M18 6h12l-3.5 8h-5z" className="fill-dusty-blue" />
        <path
          d="M21 14C12 19 8 26 8 33a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8c0-7-4-14-13-19z"
          className="fill-warm-peach"
        />
        <circle cx="24" cy="31" r="6" className="fill-white" />
        <path d="M24 28v6" />
      </>
    )}

    {name === 'sparkle' && (
      <>
        <path
          d="M22 4c1.6 9.5 5.2 13.4 14.5 15-9.3 1.6-12.9 5.5-14.5 15-1.6-9.5-5.2-13.4-14.5-15C16.8 17.4 20.4 13.5 22 4z"
          className="fill-warm-peach"
        />
        <path
          d="M37 29c.7 3.8 2 5.2 5.8 5.8-3.8.7-5.1 2-5.8 5.8-.7-3.8-2-5.1-5.8-5.8 3.8-.6 5.1-2 5.8-5.8z"
          className="fill-dusty-blue"
          strokeWidth={2.2}
        />
      </>
    )}
  </svg>
);

/* =========================================================================
   MOCK SCREEN CONTENT (what the device frames display)
   ========================================================================= */

const UI = {
  ar: {
    brand: 'راش إكس',
    search: 'ابحثي عن حجز...',
    nav: ['الرئيسية', 'المواعيد', 'العميلات', 'الكاشير', 'التقارير'],
    stats: [
      { label: 'حجوزات اليوم', value: '48' },
      { label: 'مؤكدة', value: '39' },
      { label: 'إيراد اليوم', value: '12,480' },
      { label: 'عميلات جدد', value: '11' },
    ],
    tableTitle: 'مواعيد اليوم',
    tableHead: ['العميلة', 'الخدمة', 'الوقت', 'الحالة'],
    rows: [
      { c: 'ميلا', s: 'صبغة وتصفيف', t: '10:00 ص', st: 'confirmed' as StatusKey },
      { c: 'سلمى', s: 'مانيكير وباديكير', t: '11:30 ص', st: 'pending' as StatusKey },
      { c: 'داليا', s: 'جلسة كيراتين', t: '01:00 م', st: 'confirmed' as StatusKey },
      { c: 'ريم', s: 'مكياج سهرة', t: '03:30 م', st: 'done' as StatusKey },
    ],
    status: { confirmed: 'مؤكد', pending: 'معلّق', done: 'مكتمل' } as Record<StatusKey, string>,
    currency: 'ر.س',
    // phone
    phoneTitle: 'تفاصيل موعدك',
    phoneBadge: 'مؤكد',
    phoneService: 'صبغة وتصفيف',
    phoneDate: 'الخميس 12 نوفمبر',
    phoneTime: '10:00 ص - 11:30 ص',
    phoneStylist: 'الأخصائية: سارة',
    phonePrice: '350',
    phoneNote: 'يمكنك إلغاء الموعد أو تأجيله حتى 24 ساعة قبل الموعد.',
    phoneBtn: 'إضافة إلى التقويم',
    phoneNav: ['الرئيسية', 'الخدمات', 'المواعيد', 'حسابي'],
    // duo
    duoTitle: 'عمولات الأخصائيات',
    duoSub: 'هذا الأسبوع',
    duoTotalLabel: 'إجمالي العمولات',
    duoTotal: '8,920',
    days: ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'],
    stylists: [
      { n: 'سارة', p: 35 },
      { n: 'لمى', p: 28 },
      { n: 'نور', p: 22 },
    ],
  },
  en: {
    brand: 'RashX',
    search: 'Search bookings...',
    nav: ['Home', 'Calendar', 'Clients', 'POS', 'Reports'],
    stats: [
      { label: "Today's bookings", value: '48' },
      { label: 'Confirmed', value: '39' },
      { label: 'Revenue today', value: '12,480' },
      { label: 'New clients', value: '11' },
    ],
    tableTitle: "Today's appointments",
    tableHead: ['Client', 'Service', 'Time', 'Status'],
    rows: [
      { c: 'Mila', s: 'Color & Styling', t: '10:00 AM', st: 'confirmed' as StatusKey },
      { c: 'Salma', s: 'Mani & Pedi', t: '11:30 AM', st: 'pending' as StatusKey },
      { c: 'Dalia', s: 'Keratin Treatment', t: '01:00 PM', st: 'confirmed' as StatusKey },
      { c: 'Reem', s: 'Evening Makeup', t: '03:30 PM', st: 'done' as StatusKey },
    ],
    status: { confirmed: 'Confirmed', pending: 'Pending', done: 'Done' } as Record<StatusKey, string>,
    currency: 'SAR',
    phoneTitle: 'Your appointment',
    phoneBadge: 'Confirmed',
    phoneService: 'Color & Styling',
    phoneDate: 'Thu, 12 Nov',
    phoneTime: '10:00 AM - 11:30 AM',
    phoneStylist: 'Stylist: Sara',
    phonePrice: '350',
    phoneNote: 'You can cancel or reschedule up to 24 hours before your appointment.',
    phoneBtn: 'Add to calendar',
    phoneNav: ['Home', 'Services', 'Bookings', 'Account'],
    duoTitle: 'Stylist Commissions',
    duoSub: 'This week',
    duoTotalLabel: 'Total commissions',
    duoTotal: '8,920',
    days: ['S', 'S', 'M', 'T', 'W', 'T', 'F'],
    stylists: [
      { n: 'Sara', p: 35 },
      { n: 'Lama', p: 28 },
      { n: 'Nour', p: 22 },
    ],
  },
};

type UIStrings = typeof UI.ar;

const STATUS_STYLES: Record<StatusKey, string> = {
  confirmed: 'bg-dusty-blue/30 text-ink',
  pending: 'bg-warm-peach/60 text-ink',
  done: 'bg-mist-gray text-ink-muted',
};

const STAT_ACCENTS = [
  'border-t-dusty-blue',
  'border-t-warm-peach',
  'border-t-dusty-blue',
  'border-t-warm-peach',
];

/* ---- MacBook: dashboard ---- */
const DashboardScreen: React.FC<{ ui: UIStrings }> = ({ ui }) => (
  <div className="flex h-full w-full bg-neutral/40 text-ink">
    {/* Sidebar */}
    <aside className="flex w-[11em] shrink-0 flex-col gap-[0.4em] border-e border-mist-gray/70 bg-white p-[1em]">
      <div className="mb-[1em] flex items-center gap-[0.6em]">
        <span className="flex h-[2em] w-[2em] items-center justify-center rounded-[0.6em] bg-dusty-blue text-[0.9em] font-semibold">
          X
        </span>
        <span className="text-[1.1em] font-semibold">{ui.brand}</span>
      </div>
      {ui.nav.map((item, i) => (
        <div
          key={item}
          className={`flex items-center gap-[0.6em] rounded-[0.7em] px-[0.8em] py-[0.65em] text-[0.9em] font-semibold ${
            i === 1 ? 'bg-dusty-blue/25 text-ink' : 'text-ink/60'
          }`}
        >
          <span className="h-[0.55em] w-[0.55em] rounded-full bg-current opacity-60" />
          {item}
        </div>
      ))}
    </aside>

    {/* Main */}
    <main className="flex min-w-0 flex-1 flex-col gap-[1em] p-[1.2em]">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex w-[16em] items-center gap-[0.6em] rounded-[0.8em] border border-mist-gray/70 bg-white px-[0.9em] py-[0.55em] text-[0.85em] text-ink/50">
          <Search className="h-[1.1em] w-[1.1em]" />
          <span>{ui.search}</span>
        </div>
        <div className="flex items-center gap-[0.7em]">
          <Bell className="h-[1.3em] w-[1.3em] text-ink/50" />
          <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-dusty-blue text-[0.85em] font-semibold">
            {ui.brand.charAt(0)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-[0.8em]">
        {ui.stats.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-[0.9em] border border-t-[0.25em] border-mist-gray/70 bg-white p-[0.9em] ${STAT_ACCENTS[i]}`}
          >
            <p className="text-[1.6em] font-semibold leading-none">{s.value}</p>
            <p className="mt-[0.5em] text-[0.8em] font-semibold text-ink/55">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.9em] border border-mist-gray/70 bg-white">
        <p className="px-[1em] pt-[0.9em] pb-[0.6em] text-[1em] font-semibold">{ui.tableTitle}</p>
        <div className="grid grid-cols-[1fr_1.4fr_0.9fr_0.9fr] bg-neutral/40 px-[1em] py-[0.55em] text-[0.8em] font-bold text-ink/55">
          {ui.tableHead.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {ui.rows.map((r) => (
          <div
            key={r.c}
            className="grid grid-cols-[1fr_1.4fr_0.9fr_0.9fr] items-center border-t border-mist-gray/50 px-[1em] py-[0.7em] text-[0.85em] font-semibold"
          >
            <span>{r.c}</span>
            <span className="text-ink/70">{r.s}</span>
            <span className="text-ink/70">{r.t}</span>
            <span>
              <span
                className={`inline-block rounded-full px-[0.8em] py-[0.2em] text-[0.9em] font-bold ${STATUS_STYLES[r.st]}`}
              >
                {ui.status[r.st]}
              </span>
            </span>
          </div>
        ))}
      </div>
    </main>
  </div>
);

/* ---- iPhone: client booking app ---- */
const PhoneScreen: React.FC<{ ui: UIStrings }> = ({ ui }) => {
  const navIcons = [Home, LayoutGrid, CalendarDays, User];
  return (
    <div className="flex h-full w-full flex-col bg-white pt-[3.2em] text-ink">
      {/* App bar */}
      <div className="flex items-center justify-between px-[1.1em] pb-[0.8em]">
        <Menu className="h-[1.5em] w-[1.5em]" />
        <span className="flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.6em] bg-dusty-blue text-[0.9em] font-semibold">
          X
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[0.8em] bg-neutral/40 p-[1em]">
        <p className="text-[1.15em] font-semibold">{ui.phoneTitle}</p>

        <div className="rounded-[1em] border border-mist-gray/70 bg-white p-[0.9em]">
          <div className="mb-[0.7em] flex items-center justify-between">
            <span className="rounded-full bg-dusty-blue/30 px-[0.7em] py-[0.2em] text-[0.8em] font-bold text-ink">
              {ui.phoneBadge}
            </span>
            <span className="text-[0.8em] font-semibold text-ink/45">#24071</span>
          </div>
          <p className="text-[1.05em] font-semibold">{ui.phoneService}</p>
          <div className="mt-[0.7em] flex items-center gap-[0.6em] rounded-[0.8em] bg-dusty-blue/15 p-[0.7em] text-[0.85em] font-semibold">
            <Clock className="h-[1.2em] w-[1.2em] shrink-0" />
            <div>
              <p>{ui.phoneDate}</p>
              <p className="text-ink/60">{ui.phoneTime}</p>
            </div>
          </div>
          <div className="mt-[0.7em] flex items-center justify-between text-[0.85em] font-semibold">
            <span className="flex items-center gap-[0.4em] text-ink/70">
              <Scissors className="h-[1.1em] w-[1.1em]" />
              {ui.phoneStylist}
            </span>
            <span className="font-semibold">
              {ui.phonePrice} {ui.currency}
            </span>
          </div>
          <p className="mt-[0.8em] text-[0.75em] leading-[1.6] text-ink/55">{ui.phoneNote}</p>
        </div>

        <div className="rounded-[0.9em] bg-warm-peach py-[0.8em] text-center text-[0.9em] font-semibold text-ink">
          {ui.phoneBtn}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around border-t border-mist-gray/70 bg-white px-[0.5em] pt-[0.7em] pb-[1.1em]">
        {ui.phoneNav.map((label, i) => {
          const Icon = navIcons[i];
          return (
            <div
              key={label}
              className={`flex flex-col items-center gap-[0.25em] text-[0.7em] font-semibold ${
                i === 2 ? 'text-ink' : 'text-ink/45'
              }`}
            >
              <Icon className="h-[1.6em] w-[1.6em]" />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---- Duo: commissions / reports ---- */
const DuoScreen: React.FC<{ ui: UIStrings }> = ({ ui }) => {
  const bars = [40, 62, 48, 78, 58, 92, 70];
  return (
    <div className="flex h-full w-full flex-col gap-[1em] bg-neutral/40 p-[1.5em] text-ink">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[1.3em] font-semibold">{ui.duoTitle}</p>
          <p className="text-[0.85em] font-semibold text-ink/50">{ui.duoSub}</p>
        </div>
        <div className="rounded-[0.8em] border border-mist-gray/70 bg-white px-[1em] py-[0.5em]">
          <p className="text-[0.7em] font-semibold text-ink/50">{ui.duoTotalLabel}</p>
          <p className="text-[1.3em] font-semibold leading-tight">
            {ui.duoTotal} <span className="text-[0.6em] text-ink/50">{ui.currency}</span>
          </p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-[1em]">
        {/* Chart */}
        <div className="flex flex-col rounded-[0.9em] border border-mist-gray/70 bg-white p-[1em]">
          <div className="flex h-[10em] items-end gap-[0.6em]">
            {bars.map((h, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.3em]">
                <div
                  className={`w-full rounded-t-[0.4em] ${i === 5 ? 'bg-warm-peach' : 'bg-dusty-blue/45'}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[0.7em] font-semibold text-ink/50">{ui.days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stylists */}
        <div className="flex flex-col justify-center gap-[0.9em] rounded-[0.9em] border border-mist-gray/70 bg-white p-[1em]">
          {ui.stylists.map((s) => (
            <div key={s.n}>
              <div className="mb-[0.3em] flex items-center justify-between text-[0.85em] font-bold">
                <span>{s.n}</span>
                <span className="text-ink/55">{s.p}%</span>
              </div>
              <div className="h-[0.5em] overflow-hidden rounded-full bg-mist-gray/60">
                <div className="h-full rounded-full bg-dusty-blue" style={{ width: `${s.p * 2.4}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   DEVICES
   `screen` = where the white screen sits inside each SVG frame (in % of the
   frame's size). Tweak these numbers if you swap the SVG files.
   `font`   = base font-size of the mock UI in cqw (1cqw = 1% of screen width)
   ========================================================================= */

type DeviceId = 'iphone' | 'macbook' | 'duo';

interface DeviceConfig {
  id: DeviceId;
  src: string;
  altAr: string;
  altEn: string;
  width: number;
  height: number;
  className: string;
  screen: { left: number; top: number; width: number; height: number; radius: number; font: number };
}

const DEVICES: DeviceConfig[] = [
  {
    id: 'macbook',
    src: '/Devices/MacBook.svg',
    altAr: 'لوحة تحكم راش إكس على ماك بوك',
    altEn: 'RashX Dashboard on MacBook',
    width: 1930,
    height: 1270,
    className: 'z-10 bottom-0 left-0 w-[90%] sm:left-[17%] sm:w-[66%]',
    screen: { left: 10.9, top: 11.1, width: 78.2, height: 77.8, radius: 1.3, font: 1.55 },
  },
  {
    id: 'duo',
    src: '/Devices/Duo.svg',
    altAr: 'تقارير راش إكس على الجهاز اللوحي',
    altEn: 'RashX Reports on Tablet',
    width: 1031,
    height: 749,
    className: 'z-20 bottom-[3%] left-[2%] hidden w-[31%] -rotate-3 sm:block',
    screen: { left: 3.7, top: 5.3, width: 92.4, height: 89.3, radius: 5, font: 2.4 },
  },
  {
    id: 'iphone',
    src: '/Devices/iphone.svg',
    altAr: 'تطبيق حجز العميلات على آيفون',
    altEn: 'Client Booking App on iPhone',
    width: 490,
    height: 1000,
    className: 'z-30 bottom-[1%] right-[1%] w-[27%] rotate-6 sm:right-[7%] sm:w-[15.5%]',
    screen: { left: 5.1, top: 2, width: 89.8, height: 96, radius: 11, font: 5.5 },
  },
];

const renderScreen = (id: DeviceId, ui: UIStrings) => {
  if (id === 'macbook') return <DashboardScreen ui={ui} />;
  if (id === 'iphone') return <PhoneScreen ui={ui} />;
  return <DuoScreen ui={ui} />;
};

/* =========================================================================
   HERO COMPONENT
   ========================================================================= */

export const Hero: React.FC<HeroProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;
  const ui = isAr ? UI.ar : UI.en;

  const phrases = isAr ? PHRASES_AR : PHRASES_EN;
  const count = phrases.length;
  // first phrase is repeated at the end so the loop never scrolls backwards
  const loopPhrases = [...phrases, phrases[0]];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Rotate text upwards every 2.6 seconds
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => prev + 1), 2600);
    return () => clearInterval(timer);
  }, []);

  // When we reach the duplicated phrase, jump back to 0 without animation
  useEffect(() => {
    if (index < count) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 520);
    return () => clearTimeout(t);
  }, [index, count]);

  useEffect(() => {
    if (animate) return;
    const t = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(t);
  }, [animate]);

  const whatsappHref = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <section
      dir={dir}
      className="relative w-full overflow-hidden border-b border-mist-gray/70 bg-gradient-to-b from-dusty-blue/25 via-base to-base pt-28 pb-16 text-ink sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      {/* Soft decorative glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-dusty-blue/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-warm-peach/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =============================================================
            1. HEADLINE + SUBTITLE + BUTTONS
           ============================================================= */}
        <div className="mx-auto max-w-4xl space-y-4 text-center sm:space-y-5">
          <h1 className="flex flex-wrap items-center justify-center gap-x-[0.3em] text-[clamp(1.25rem,5.2vw,4rem)] font-semibold leading-[1.3] tracking-normal text-ink">
            <span>{isAr ? 'راش إكس يقدم:' : 'RashX Presents:'}</span>
            <span className="relative block h-[1.4em] max-w-full overflow-hidden">
              <span
                className={`flex flex-col ${
                  animate ? 'transition-transform duration-500 ease-out' : ''
                }`}
                style={{ transform: `translateY(-${index * (100 / (count + 1))}%)` }}
              >
                {loopPhrases.map((phrase, idx) => (
                  <span
                    key={idx}
                    className="flex h-[1.4em] shrink-0 items-center justify-start gap-[0.25em] whitespace-nowrap font-semibold text-ink"
                  >
                    <span>{phrase.text}</span>
                    <PhraseIcon name={phrase.icon} />
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p className="mx-auto max-w-[19rem] text-balance text-xs font-normal leading-relaxed text-ink/70 sm:max-w-2xl sm:text-base md:text-lg">
            {isAr
              ? 'مواعيد، فريق، كاشير، وموقع إلكتروني لصالونك. كل أدواتك في مكان واحد، بلا تعقيد.'
              : 'Appointments, team, POS and a branded website for your salon. All your tools in one place, zero hassle.'}
          </p>

          <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-3 pt-2 sm:max-w-none sm:flex-row">
            <a
              href="#demo-form"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-warm-peach px-8 py-3.5 sm:w-auto text-xs font-semibold text-ink shadow-xs transition-all hover:bg-warm-peach/80 sm:text-sm md:text-base"
            >
              <span>{isAr ? 'احجز عرضاً تجريبياً مجاناً' : 'Book a Free Demo'}</span>
              <ArrowIcon className="h-4 w-4 text-ink" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-dusty-blue px-7 py-3.5 sm:w-auto text-xs font-semibold text-ink shadow-2xs transition-all hover:bg-dusty-blue/80 sm:text-sm md:text-base"
            >
              <PhoneCall className="h-4 w-4 text-ink" />
              <span>{isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* =============================================================
            2. DEVICE SHOWCASE: overlapping frames displaying the product
           ============================================================= */}
        <div className="relative mx-auto mt-10 aspect-[10/7] w-full max-w-6xl sm:mt-14 sm:aspect-[2/1]">
          {DEVICES.map((device) => {
            const s = device.screen;
            return (
              <div
                key={device.id}
                className={`absolute ${device.className}`}
                style={{ containerType: 'inline-size' }}
              >
                <Image
                  src={device.src}
                  alt={isAr ? device.altAr : device.altEn}
                  width={device.width}
                  height={device.height}
                  priority
                  className="block h-auto w-full select-none"
                  style={{ filter: 'drop-shadow(0 24px 32px rgba(15, 23, 42, 0.18))' }}
                />

                {/* Screen layer sitting inside the frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute overflow-hidden bg-white"
                  style={{
                    left: `${s.left}%`,
                    top: `${s.top}%`,
                    width: `${s.width}%`,
                    height: `${s.height}%`,
                    borderRadius: `${s.radius}cqw`,
                    containerType: 'inline-size',
                  }}
                >
                  <div className="h-full w-full" style={{ fontSize: `${s.font}cqw` }}>
                    {renderScreen(device.id, ui)}
                  </div>

                  {/* Dynamic island / camera notch drawn above the content */}
                  {device.id === 'iphone' && (
                    <span className="absolute left-1/2 top-[1.9%] h-[3.5%] w-[21%] -translate-x-1/2 rounded-full bg-black" />
                  )}
                  {device.id === 'macbook' && (
                    <span className="absolute left-1/2 top-[0.7%] h-[3.3%] w-[4%] -translate-x-1/2 rounded-full bg-black" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;