'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Sparkles,
  Upload,
  Check,
  Search,
  Shuffle,
  Palette,
  Shapes,
  Radio,
  X,
  ImagePlus,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Avatar, AvatarStatus } from './Avatar';
import { Button } from './Button';

/* ───────────────────────── Types ───────────────────────── */

export interface AvatarCustomization {
  type: 'animoji' | 'custom';
  animojiId?: number;
  customSrc?: string;
  bgColor: string;
  status?: AvatarStatus;
  rounded: 'full' | 'xl' | '2xl';
}

export interface AvatarPickerProps {
  value?: AvatarCustomization;
  defaultValue?: AvatarCustomization;
  onChange?: (customization: AvatarCustomization) => void;
  onSave?: (customization: AvatarCustomization) => void;
  className?: string;
}

/* ───────────────────────── Constants ───────────────────────── */

const TOTAL_ANIMOJI = 237;
const PAGE_SIZE = 48;
const MAX_FILE_MB = 5;

const ALL_IDS = Array.from({ length: TOTAL_ANIMOJI }, (_, i) => i + 1);

const BG_COLORS = [
  { label: 'أبيض ناصع', value: 'bg-white', hex: '#FFFFFF' },
  { label: 'أزرق راش اكس', value: 'bg-[#91B8C0]/25', hex: '#91B8C0' },
  { label: 'خوخي دافئ', value: 'bg-[#F0C5AE]/35', hex: '#F0C5AE' },
  { label: 'رمادي هادئ', value: 'bg-[#E5E9E8]', hex: '#E5E9E8' },
  { label: 'زمردي', value: 'bg-emerald-100', hex: '#A7F3D0' },
  { label: 'أسود ملكي', value: 'bg-[#000000] text-white', hex: '#000000' },
];

const STATUS_OPTIONS: {
  label: string;
  value: AvatarStatus | 'none';
  dot: string;
}[] = [
  { label: 'متصل', value: 'online', dot: 'bg-emerald-500' },
  { label: 'مشغول', value: 'busy', dot: 'bg-red-500' },
  { label: 'بعيد', value: 'away', dot: 'bg-amber-400' },
  { label: 'غير متصل', value: 'offline', dot: 'bg-gray-400' },
  { label: 'بدون', value: 'none', dot: 'border-2 border-gray-300 bg-transparent' },
];

const SHAPES: { label: string; value: AvatarCustomization['rounded']; preview: string }[] = [
  { label: 'دائري', value: 'full', preview: 'rounded-full' },
  { label: 'ناعم', value: '2xl', preview: 'rounded-[9px]' },
  { label: 'مربع', value: 'xl', preview: 'rounded-[3px]' },
];

const DEFAULT_STATE: AvatarCustomization = {
  type: 'animoji',
  animojiId: 2,
  bgColor: 'bg-white',
  status: 'online',
  rounded: 'full',
};

const FOCUS =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] focus-visible:ring-offset-2';

/* ───────────────────────── Section wrapper ───────────────────────── */

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <section className="space-y-3">
    <h4 className="flex items-center gap-2 text-[13px] font-bold text-black">
      <span className="text-[#5E6665]">{icon}</span>
      {title}
    </h4>
    {children}
  </section>
);

/* ───────────────────────── Component ───────────────────────── */

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  onSave,
  className = '',
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalState, setInternalState] = useState<AvatarCustomization>(
    defaultValue ?? DEFAULT_STATE
  );
  const state = isControlled ? controlledValue! : internalState;

  const [saved, setSaved] = useState<AvatarCustomization>(state);
  const [justSaved, setJustSaved] = useState(false);
  const [tab, setTab] = useState<'animoji' | 'upload'>(
    state.type === 'custom' ? 'upload' : 'animoji'
  );
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const objectUrl = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  useEffect(() => {
    if (!justSaved) return;
    const t = setTimeout(() => setJustSaved(false), 1800);
    return () => clearTimeout(t);
  }, [justSaved]);

  const update = (updates: Partial<AvatarCustomization>) => {
    const next = { ...state, ...updates };
    if (!isControlled) setInternalState(next);
    onChange?.(next);
  };

  const isDirty = JSON.stringify(state) !== JSON.stringify(saved);

  /* Library filtering + pagination */
  const results = useMemo(() => {
    const q = query.replace(/\D/g, '');
    if (!q) return ALL_IDS;
    return ALL_IDS.filter((id) => String(id).includes(q));
  }, [query]);
  const shown = results.slice(0, visible);

  /* Upload */
  const processFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('الملف لازم يكون صورة (PNG, JPG, WebP أو SVG).');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`حجم الصورة أكبر من ${MAX_FILE_MB} م.ب، اختر صورة أصغر.`);
      return;
    }
    setError(null);
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    const url = URL.createObjectURL(file);
    objectUrl.current = url;
    update({ type: 'custom', customSrc: url });
  };

  const removeCustom = () => {
    if (objectUrl.current) {
      URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
    }
    update({ type: 'animoji', customSrc: undefined, animojiId: state.animojiId ?? 2 });
    setTab('animoji');
  };

  const randomize = () => {
    update({
      type: 'animoji',
      animojiId: Math.floor(Math.random() * TOTAL_ANIMOJI) + 1,
      bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)].value,
    });
    setTab('animoji');
  };

  const save = () => {
    onSave?.(state);
    setSaved(state);
    setJustSaved(true);
  };

  const statusDot = state.status
    ? STATUS_OPTIONS.find((s) => s.value === state.status)?.dot
    : undefined;

  const label =
    state.type === 'animoji' ? `Animoji #${state.animojiId}` : 'صورة مخصصة';

  return (
    <div
      dir="rtl"
      className={`w-full select-none text-start rounded-[28px] border border-[#E5E9E8] bg-white shadow-sm ${className}`}
    >
      <div className="grid gap-0 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* ═══════════ 1. PREVIEW ═══════════ */}
        <div className="relative lg:row-start-1 lg:col-start-1 rounded-t-[28px] lg:rounded-se-none p-5 sm:p-6 bg-gradient-to-b from-[#91B8C0]/20 via-[#E5E9E8]/40 to-transparent">
          <div className="flex lg:flex-col items-center gap-4 lg:gap-5 lg:text-center">
            <div className="relative shrink-0">
              <div className="absolute inset-0 -z-0 rounded-full bg-[#91B8C0]/30 blur-2xl scale-90" />
              <Avatar
                src={state.type === 'custom' ? state.customSrc : undefined}
                animojiId={state.type === 'animoji' ? state.animojiId : undefined}
                size="xl"
                rounded={state.rounded}
                className={`relative ${state.bgColor} border-[3px] border-white shadow-lg transition-all duration-300`}
              />
              {statusDot && (
                <span
                  aria-hidden
                  className={`absolute z-10 h-5 w-5 rounded-full border-[3px] border-white shadow-sm ${statusDot} ${
                    state.rounded === 'full' ? 'bottom-1 end-1' : '-bottom-1 -end-1'
                  }`}
                />
              )}
            </div>

            <div className="min-w-0 flex-1 lg:flex-none">
              <p className="text-[11px] font-semibold text-[#5E6665]">معاينة مباشرة</p>
              <h3 className="mt-0.5 text-lg font-semibold text-black truncate">{label}</h3>
              <p className="mt-1 hidden sm:block text-xs leading-relaxed text-[#5E6665]">
                غيّر الشكل واللون والحالة وشوف النتيجة فورًا.
              </p>
            </div>

            <button
              type="button"
              onClick={randomize}
              className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E5E9E8] bg-white px-4 text-[13px] font-bold text-black transition-colors hover:bg-[#E5E9E8]/50 active:scale-95 lg:w-full ${FOCUS}`}
            >
              <Shuffle className="h-4 w-4 shrink-0" />
              <span>عشوائي</span>
            </button>
          </div>
        </div>

        {/* ═══════════ 2. LIBRARY ═══════════ */}
        <div className="lg:row-span-2 lg:col-start-2 lg:row-start-1 p-5 sm:p-6 lg:border-s border-[#E5E9E8] space-y-4 min-w-0">
          {/* Segmented control */}
          <div
            role="tablist"
            aria-label="مصدر الصورة"
            className="grid grid-cols-2 gap-1 rounded-2xl bg-[#E5E9E8]/60 p-1"
          >
            {[
              { id: 'animoji', label: 'مكتبة Animoji', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'upload', label: 'رفع صورة', icon: <Upload className="w-4 h-4" /> },
            ].map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id as 'animoji' | 'upload')}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl text-[13px] font-bold transition-all ${FOCUS} ${
                    active
                      ? 'bg-white text-black shadow-sm'
                      : 'text-[#5E6665] hover:text-black'
                  }`}
                >
                  {t.icon}
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* ───── Animoji tab ───── */}
          {tab === 'animoji' && (
            <div role="tabpanel" className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E6665]" />
                  <input
                    type="search"
                    inputMode="numeric"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisible(PAGE_SIZE);
                    }}
                    placeholder="ابحث برقم الأفاتار، مثلاً 25"
                    aria-label="بحث برقم الأفاتار"
                    className={`h-11 w-full rounded-xl border border-[#E5E9E8] bg-white ps-10 pe-10 text-sm text-black placeholder:text-[#5E6665]/60 focus:border-[#91B8C0] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:appearance-none ${FOCUS}`}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="مسح البحث"
                      className={`absolute end-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#5E6665] hover:bg-[#E5E9E8] ${FOCUS}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <span className="shrink-0 text-xs font-semibold text-[#5E6665] tabular-nums">
                  {results.length} / {TOTAL_ANIMOJI}
                </span>
              </div>

              {results.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-[#E5E9E8] py-12 text-center">
                  <Search className="h-6 w-6 text-[#5E6665]" />
                  <p className="text-sm font-semibold text-black">مفيش أفاتار بالرقم ده</p>
                  <p className="text-xs text-[#5E6665]">جرّب رقم من 1 إلى {TOTAL_ANIMOJI}</p>
                </div>
              ) : (
                <div className="lg:max-h-[560px] lg:overflow-y-auto overscroll-contain rounded-2xl border border-[#E5E9E8] bg-[#E5E9E8]/20 p-2.5 sm:p-3">
                  <div
                    role="radiogroup"
                    aria-label="اختيار الأفاتار"
                    className="grid grid-cols-4 gap-2 min-[480px]:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-7 xl:grid-cols-9"
                  >
                    {shown.map((id) => {
                      const selected = state.type === 'animoji' && state.animojiId === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          aria-label={`أفاتار ${id}`}
                          onClick={() => update({ type: 'animoji', animojiId: id })}
                          className={`group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl p-1 transition-all ${FOCUS} ${
                            selected
                              ? 'bg-white ring-2 ring-inset ring-[#91B8C0]'
                              : 'bg-white/70 hover:bg-white active:scale-95'
                          }`}
                        >
                          <Avatar
                            animojiId={id}
                            size="md"
                            rounded={state.rounded}
                            className="pointer-events-none bg-white"
                          />
                          {selected && (
                            <span className="absolute end-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#91B8C0] text-black">
                              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {visible < results.length && (
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className={`mt-3 h-11 w-full rounded-xl border border-[#E5E9E8] bg-white text-[13px] font-bold text-black transition-colors hover:bg-[#E5E9E8]/50 ${FOCUS}`}
                    >
                      عرض المزيد ({results.length - visible})
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ───── Upload tab ───── */}
          {tab === 'upload' && (
            <div role="tabpanel" className="space-y-3">
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  processFile(e.dataTransfer.files?.[0]);
                }}
                className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center transition-colors focus-within:ring-2 focus-within:ring-[#91B8C0] ${
                  dragging
                    ? 'border-[#91B8C0] bg-[#91B8C0]/15'
                    : 'border-[#E5E9E8]/70 hover:border-[#91B8C0] hover:bg-[#E5E9E8]/20'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    processFile(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#91B8C0]/25 text-black">
                  <ImagePlus className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold text-black">
                    اسحب الصورة هنا أو اضغط للاختيار
                  </p>
                  <p className="mt-1 text-xs text-[#5E6665]">
                    PNG, JPG, WebP أو SVG — حتى {MAX_FILE_MB} م.ب
                  </p>
                </div>
              </label>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700"
                >
                  <AlertCircle className="mt-px h-4 w-4 shrink-0" />
                  {error}
                </p>
              )}

              {state.type === 'custom' && state.customSrc && (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E5E9E8] bg-[#E5E9E8]/30 p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={state.customSrc}
                      size="md"
                      rounded={state.rounded}
                      className={state.bgColor}
                    />
                    <span className="truncate text-sm font-bold text-black">
                      الصورة المرفوعة مفعّلة
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCustom}
                    className={`flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-bold text-red-600 hover:bg-red-50 ${FOCUS}`}
                  >
                    <Trash2 className="h-4 w-4" />
                    إزالة
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══════════ 3. CUSTOMIZATION ═══════════ */}
        <div className="lg:row-start-2 lg:col-start-1 space-y-6 border-t border-[#E5E9E8] p-5 sm:p-6 lg:border-t-0">
          <Section icon={<Palette className="h-4 w-4" />} title="لون الخلفية">
            <div role="radiogroup" aria-label="لون الخلفية" className="flex flex-wrap gap-3">
              {BG_COLORS.map((bg) => {
                const selected = state.bgColor === bg.value;
                return (
                  <button
                    key={bg.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={bg.label}
                    title={bg.label}
                    onClick={() => update({ bgColor: bg.value })}
                    style={{ backgroundColor: bg.hex }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform active:scale-90 ${FOCUS} ${
                      selected
                        ? 'border-black ring-2 ring-[#91B8C0] ring-offset-2'
                        : 'border-[#E5E9E8] hover:scale-110'
                    }`}
                  >
                    {selected && (
                      <Check
                        className={`h-4 w-4 ${bg.hex === '#000000' ? 'text-white' : 'text-black'}`}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section icon={<Shapes className="h-4 w-4" />} title="شكل الحواف">
            <div role="radiogroup" aria-label="شكل الحواف" className="grid grid-cols-3 gap-2">
              {SHAPES.map((s) => {
                const selected = state.rounded === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => update({ rounded: s.value })}
                    className={`flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl border text-xs font-bold transition-all ${FOCUS} ${
                      selected
                        ? 'border-black bg-black text-white'
                        : 'border-[#E5E9E8] bg-white text-black hover:bg-[#E5E9E8]/40'
                    }`}
                  >
                    <span
                      className={`h-6 w-6 border-2 ${s.preview} ${
                        selected ? 'border-white' : 'border-black'
                      }`}
                    />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section icon={<Radio className="h-4 w-4" />} title="حالة التواجد">
            <div role="radiogroup" aria-label="حالة التواجد" className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((st) => {
                const selected =
                  st.value === 'none' ? !state.status : state.status === st.value;
                return (
                  <button
                    key={st.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      update({ status: st.value === 'none' ? undefined : st.value })
                    }
                    className={`flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs font-bold transition-all ${FOCUS} ${
                      selected
                        ? 'border-[#91B8C0] bg-[#91B8C0]/20 text-black'
                        : 'border-[#E5E9E8] bg-white text-[#5E6665] hover:text-black'
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${st.dot}`} />
                    {st.label}
                  </button>
                );
              })}
            </div>
          </Section>
        </div>
      </div>

      {/* ═══════════ SAVE BAR ═══════════ */}
      <div className="sticky bottom-0 z-10 flex items-center rounded-b-[28px] justify-between gap-3 border-t border-[#E5E9E8] bg-white/90 px-5 py-3 backdrop-blur sm:px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="min-w-0 truncate text-xs font-semibold text-[#5E6665]">
          {justSaved ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <Check className="h-4 w-4" strokeWidth={3} />
              تم الحفظ بنجاح
            </span>
          ) : isDirty ? (
            'عندك تغييرات غير محفوظة'
          ) : (
            'كل التغييرات محفوظة'
          )}
        </p>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={save}
          disabled={!isDirty}
          className="min-w-[120px] shrink-0"
        >
          حفظ وتطبيق
        </Button>
      </div>
    </div>
  );
};

export default AvatarPicker;