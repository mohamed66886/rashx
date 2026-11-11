'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Check,
  Sparkles,
  Database,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { Button } from '@/components/ui/Button';
import { usePresence } from '@/hooks/usePresence';

// Curated list of popular 3D animojis available in /public/avatars/
const CURATED_ANIMOJIS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  60, 70, 80, 90, 100, 110,
];

/**
 * Three dedicated layouts:
 *  - Mobile  (< sm)    : full-screen page - title bar, big centered preview, 4-col gallery,
 *                        stacked full-width action buttons at the bottom.
 *  - Tablet  (sm - lg) : centered card - title bar, horizontal preview strip, 6-col gallery,
 *                        actions aligned to the end in the footer.
 *  - Desktop (>= lg)   : two-pane dialog - preview + actions in a side panel, gallery on the other side.
 */
export function AvatarPickerModal() {
  const { admin, isAvatarPickerOpen, closeAvatarPicker, updateAvatar } =
    useDashboardAuth();

  const [selectedId, setSelectedId] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { mounted, visible } = usePresence(isAvatarPickerOpen, 260);

  // Sync selectedId with current admin avatar on open
  useEffect(() => {
    void Promise.resolve().then(() => {
      setSelectedId(admin?.avatarId || 1);
      setSaveSuccess(false);
      setErrorMsg(null);
    });
  }, [admin, isAvatarPickerOpen]);

  // ESC to close + lock body scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAvatarPickerOpen) {
        closeAvatarPicker();
      }
    };
    if (isAvatarPickerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isAvatarPickerOpen, closeAvatarPicker]);

  if (!mounted || !admin) return null;

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const res = await updateAvatar(selectedId);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          closeAvatarPicker();
        }, 1200);
      } else {
        setErrorMsg(res.error || 'حدث خطأ أثناء الحفظ في قاعدة البيانات');
      }
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : 'فشل الاتصال بقاعدة البيانات';
      setErrorMsg(err);
    } finally {
      setIsSaving(false);
    }
  };

  const saveButton = (cls: string) => (
    <Button
      variant="primary"
      size="sm"
      onClick={handleSave}
      disabled={isSaving}
      className={`font-bold gap-2 ${cls}`}
    >
      {isSaving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>جاري الحفظ...</span>
        </>
      ) : (
        <>
          <Check className="w-4 h-4" strokeWidth={2.5} />
          <span>حفظ الأفاتار</span>
        </>
      )}
    </Button>
  );

  const cancelButton = (cls: string) => (
    <Button
      variant="outline"
      size="sm"
      onClick={closeAvatarPicker}
      disabled={isSaving}
      className={cls}
    >
      إلغاء
    </Button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-picker-title"
    >
      {/* Backdrop */}
      <div
        data-state={visible ? 'open' : 'closed'}
        className="fixed inset-0 bg-ink/60 data-[state=open]:animate-rx-fade-in data-[state=closed]:animate-rx-fade-out"
        onClick={closeAvatarPicker}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        data-state={visible ? 'open' : 'closed'}
        className="
          relative z-10 flex flex-col w-full h-[100dvh] bg-base text-ink overflow-hidden data-[state=open]:animate-rx-sheet-in data-[state=closed]:animate-rx-sheet-out
          sm:data-[state=open]:animate-rx-modal-in sm:data-[state=closed]:animate-rx-modal-out
          sm:h-auto sm:max-h-[88vh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-neutral sm:shadow-2xl
          lg:grid lg:max-w-4xl lg:h-[640px] lg:grid-cols-[18rem_1fr] lg:grid-rows-[auto_1fr_auto]
        "
      >
        {/* ───────── Title bar ───────── */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 h-16 bg-base border-b border-neutral lg:col-start-2 lg:row-start-1">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid place-items-center w-10 h-10 shrink-0 rounded-2xl bg-primary text-ink">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="avatar-picker-title"
                className="text-sm sm:text-base font-bold text-ink leading-snug truncate"
              >
                تخصيص الأفاتار (3D Animoji)
              </h2>
              <p className="hidden sm:block text-xs text-ink-muted mt-0.5 truncate">
                اختر شخصيتك وسيتم حفظها مباشرة في حسابك.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAvatarPicker}
            className="grid place-items-center w-10 h-10 shrink-0 rounded-xl text-ink-muted hover:text-ink hover:bg-neutral/60 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ───────── Preview (mobile: centered / tablet: strip / desktop: side panel) ───────── */}
        <aside
          className="
            shrink-0 bg-neutral/40 border-b border-neutral
            flex flex-col items-center text-center gap-2 px-4 py-4
            sm:flex-row sm:text-start sm:gap-4 sm:px-6
            lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:flex-col lg:items-center lg:justify-start lg:text-center lg:gap-3 lg:p-6 lg:border-b-0 lg:border-e
          "
        >
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-16 sm:h-16 lg:w-36 lg:h-36 rounded-3xl bg-warm-peach ring-4 ring-base shadow-md overflow-hidden relative">
              <Image
                src={`/avatars/animoji-${selectedId}.webp`}
                alt="المعاينة الحية"
                width={144}
                height={144}
                decoding="async"
                priority
                key={selectedId}
                className="w-full h-full object-cover animate-rx-pop"
              />
            </div>
            <span className="absolute -bottom-1 -end-1 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-emerald-500 ring-2 ring-base" />
          </div>

          <div className="min-w-0 w-full sm:w-auto sm:flex-1 lg:flex-none lg:w-full">
            <div className="flex flex-wrap items-center justify-center sm:justify-start lg:justify-center gap-x-2 gap-y-1">
              <span className="font-bold text-sm text-ink truncate max-w-[220px]">
                {admin.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-warm-peach text-ink whitespace-nowrap">
                المشرف العام
              </span>
            </div>
            <div className="text-xs text-ink-muted mt-1 font-mono truncate" dir="ltr">
              {admin.email}
            </div>
            <div className="text-[11px] font-bold text-ink mt-1">
              المختار حالياً: Animoji #{selectedId}
            </div>
          </div>

          {/* Desktop only: DB pill + actions live in the side panel */}
          <div className="hidden lg:flex flex-col items-stretch gap-3 w-full mt-auto">
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-base border border-primary text-ink text-[11px] font-bold">
              <Database className="w-3.5 h-3.5 text-primary" />
              <span>Firebase Cloud Auth</span>
            </div>
            {saveButton('w-full h-11')}
            {cancelButton('w-full h-11')}
          </div>
        </aside>

        {/* ───────── Gallery ───────── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 bg-base lg:col-start-2 lg:row-start-2">
          <div className="flex items-center justify-between text-xs font-bold text-ink-muted px-0.5">
            <span>اختر من مكتبة الشخصيات:</span>
            <span className="text-[11px] font-mono font-normal">
              {CURATED_ANIMOJIS.length} شخصية
            </span>
          </div>

          {isAvatarPickerOpen && (
            <div className="grid grid-cols-4 min-[420px]:grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-3">
              {CURATED_ANIMOJIS.map((id, index) => {
                const isSelected = selectedId === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedId(id)}
                    aria-pressed={isSelected}
                    title={`أفاتار رقم ${id}`}
                    style={{ animationDelay: `${Math.min(index * 12, 240)}ms` }}
                    className={`group relative flex flex-col items-center p-1.5 sm:p-2 rounded-2xl border-2 transition-all duration-200 ease-smooth active:scale-95 animate-rx-fade-up ${
                      isSelected
                        ? 'bg-base border-primary shadow-md'
                        : 'bg-neutral/40 border-transparent hover:bg-base hover:border-neutral hover:shadow-sm'
                    }`}
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-warm-peach/50 relative">
                      <Image
                        src={`/avatars/thumbs/animoji-${id}.webp`}
                        alt={`Animoji ${id}`}
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>

                    <span
                      className={`text-[9px] sm:text-[10px] mt-1 font-mono ${
                        isSelected ? 'font-bold text-ink' : 'text-ink-muted'
                      }`}
                    >
                      #{id}
                    </span>

                    {isSelected && (
                      <span className="absolute -top-1.5 -end-1.5 grid place-items-center w-5 h-5 rounded-full bg-primary text-ink ring-2 ring-base animate-rx-pop">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ───────── Footer: feedback + actions (mobile & tablet) / feedback only (desktop) ───────── */}
        <div className="shrink-0 bg-base border-t border-neutral lg:col-start-2 lg:row-start-3">
          {(saveSuccess || errorMsg) && (
            <div className="px-4 sm:px-6 pt-3">
              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تم حفظ الأفاتار بنجاح!</span>
                </div>
              )}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* Mobile: stacked, full width. Tablet: row, aligned to end. Hidden on desktop. */}
          <div className="lg:hidden flex flex-col gap-2 sm:flex-row sm:justify-end px-4 sm:px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-4">
            {saveButton('w-full h-11 sm:w-auto sm:h-auto')}
            {cancelButton('w-full h-11 sm:w-auto sm:h-auto')}
          </div>

          {/* Desktop: spacer so the feedback area keeps a consistent bottom edge */}
          <div className="hidden lg:block h-3" />
        </div>
      </div>
    </div>
  );
}