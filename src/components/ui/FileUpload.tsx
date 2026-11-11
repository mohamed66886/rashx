'use client';

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  UploadCloud,
  File as FileGeneric, // renamed: lucide's `File` would shadow the DOM `File` type
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  FileArchive,
  Camera,
  FolderOpen,
  RotateCw,
} from 'lucide-react';

/* =========================================================================
   DESIGN PER SCREEN SIZE  (layout="auto" picks by viewport width)
   -------------------------------------------------------------------------
   • Mobile  (< 640)   : no drag zone (nobody drags on a phone) — a clean card
                         with two big buttons: "اختيار من الجهاز" + "التقاط صورة".
                         Files are touch-sized rows with progress.
   • Tablet  (640–1023): compact horizontal dashed drop zone, files in a
                         2-column card grid.
   • Desktop (≥ 1024)  : large drop zone with illustration, drag-over state,
                         paste support (Ctrl+V), limits as chips, files in a
                         table (name · type · size · status).
   Force one with layout="mobile" | "tablet" | "desktop".
   ========================================================================= */

/* ───────────────────────── Types ───────────────────────── */

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  progress?: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export type FileUploadLayout = 'auto' | 'mobile' | 'tablet' | 'desktop';

export interface FileUploadProps {
  onFilesChange?: (files: UploadedFile[]) => void;
  /**
   * Optional real upload. When provided, each accepted file starts uploading
   * (status "uploading" with a progress bar), can be retried on error and is
   * aborted if the user removes it. Without it, files are "completed" at once.
   */
  onUpload?: (
    file: File,
    ctx: { onProgress: (percent: number) => void; signal: AbortSignal }
  ) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: string;
  disabled?: boolean;
  showPreviewList?: boolean;
  /** Which design to render (default: 'auto' = by screen width) */
  layout?: FileUploadLayout;
  className?: string;
}

/* ───────────────────────── Helpers ───────────────────────── */

const DEFAULT_DESCRIPTION = 'اسحب وأفلت الملفات هنا، أو اضغط للتصفح من جهازك';

const FOCUS =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] focus-visible:ring-offset-2';

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 بايت';
  const k = 1024;
  const sizes = ['بايت', 'ك.ب', 'م.ب', 'ج.ب'];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.includes('pdf') || type.includes('word') || type.includes('text')) return FileText;
  if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return FileArchive;
  return FileGeneric;
}

function getExt(name: string): string {
  const i = name.lastIndexOf('.');
  return i > 0 && i < name.length - 1 ? name.slice(i + 1).toUpperCase().slice(0, 5) : 'ملف';
}

/** drop & paste bypass the <input accept>, so validate it ourselves */
function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true;
  const rules = accept
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!rules.length) return true;
  const name = file.name.toLowerCase();
  const type = (file.type || '').toLowerCase();
  return rules.some((r) =>
    r.startsWith('.') ? name.endsWith(r) : r.endsWith('/*') ? type.startsWith(r.slice(0, -1)) : type === r
  );
}

/** "image/*,.pdf" → ["صور", "PDF"] — friendly labels instead of raw MIME strings */
function formatAccept(accept?: string): string[] {
  if (!accept) return [];
  const out = new Set<string>();
  accept
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .forEach((r) => {
      if (r === 'image/*') out.add('صور');
      else if (r === 'video/*') out.add('فيديو');
      else if (r === 'audio/*') out.add('صوت');
      else if (r.startsWith('.')) out.add(r.slice(1).toUpperCase());
      else if (r.includes('/')) {
        const sub = r.split('/')[1];
        if (sub && sub !== '*' && sub.length <= 5) out.add(sub.toUpperCase());
      }
    });
  return Array.from(out);
}

function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/* ───────────────────────── Screen detection ───────────────────────── */

type Screen = 'mobile' | 'tablet' | 'desktop';
const Q_TABLET = '(min-width: 640px)';
const Q_DESKTOP = '(min-width: 1024px)';

function subscribeScreen(cb: () => void) {
  const a = window.matchMedia(Q_TABLET);
  const b = window.matchMedia(Q_DESKTOP);
  a.addEventListener('change', cb);
  b.addEventListener('change', cb);
  return () => {
    a.removeEventListener('change', cb);
    b.removeEventListener('change', cb);
  };
}
function getScreen(): Screen {
  if (window.matchMedia(Q_DESKTOP).matches) return 'desktop';
  if (window.matchMedia(Q_TABLET).matches) return 'tablet';
  return 'mobile';
}
function useScreen(): Screen {
  return useSyncExternalStore(subscribeScreen, getScreen, () => 'mobile' as Screen);
}

/* ───────────────────────── Illustration (flat SVG) ───────────────────────── */

const UploadArt: React.FC<{ active: boolean }> = ({ active }) => (
  <svg
    aria-hidden
    viewBox="0 0 160 120"
    className={`h-28 w-40 transition-transform duration-300 ${active ? 'scale-110' : ''}`}
  >
    <circle cx="80" cy="62" r="48" fill={active ? '#91B8C0' : '#E5E9E8'} fillOpacity={active ? 0.35 : 1} />
    <g transform="rotate(-9 62 54)">
      <rect x="42" y="26" width="42" height="54" rx="6" fill="#fff" stroke="#91B8C0" strokeWidth="2" />
      <path d="M50 42h26M50 50h26M50 58h16" stroke="#91B8C0" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g transform="rotate(9 98 50)">
      <rect x="76" y="22" width="42" height="54" rx="6" fill="#fff" stroke="#F0C5AE" strokeWidth="2" />
      <path d="M84 38h26M84 46h26M84 54h16" stroke="#F0C5AE" strokeWidth="2" strokeLinecap="round" />
    </g>
    <circle cx="80" cy="86" r="20" fill="#91B8C0" />
    <path d="M80 96V77M71.5 85.5 80 77l8.5 8.5" stroke="#000" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="24" cy="34" r="4" fill="#F0C5AE" />
    <circle cx="140" cy="96" r="5" fill="#91B8C0" />
    <circle cx="142" cy="30" r="3" fill="#91B8C0" fillOpacity=".7" />
    <rect x="16" y="88" width="9" height="9" rx="2.5" transform="rotate(18 20 92)" fill="#F0C5AE" />
  </svg>
);

/* ───────────────────────── Component ───────────────────────── */

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  onUpload,
  accept,
  multiple = false,
  maxFiles = 5,
  maxSizeMB = 10,
  label,
  description = DEFAULT_DESCRIPTION,
  helperText,
  disabled = false,
  showPreviewList = true,
  layout = 'auto',
  className = '',
}) => {
  const detected = useScreen();
  const screen: Screen = layout === 'auto' ? detected : layout;

  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const dragDepth = useRef(0);
  const controllers = useRef(new Map<string, AbortController>());

  const filesRef = useRef(files);
  filesRef.current = files;
  const onChangeRef = useRef(onFilesChange);
  onChangeRef.current = onFilesChange;

  /* notify parent whenever the list changes (not on first mount) */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    onChangeRef.current?.(files);
  }, [files]);

  /* cleanup: free preview URLs, abort running uploads */
  useEffect(() => {
    const ctrls = controllers.current;
    return () => {
      filesRef.current.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
      ctrls.forEach((c) => c.abort());
    };
  }, []);

  const patch = useCallback((id: string, p: Partial<UploadedFile>) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...p } : f)));
  }, []);

  const startUpload = useCallback(
    async (item: UploadedFile) => {
      if (!onUpload) return;
      const ctrl = new AbortController();
      controllers.current.set(item.id, ctrl);
      patch(item.id, { status: 'uploading', progress: 0, errorMessage: undefined });
      try {
        await onUpload(item.file, {
          signal: ctrl.signal,
          onProgress: (p) =>
            patch(item.id, { progress: Math.max(0, Math.min(100, Math.round(p))) }),
        });
        if (ctrl.signal.aborted) return;
        patch(item.id, { status: 'completed', progress: 100 });
      } catch (err) {
        if (ctrl.signal.aborted) return;
        patch(item.id, {
          status: 'error',
          errorMessage: err instanceof Error && err.message ? err.message : 'فشل رفع الملف',
        });
      } finally {
        controllers.current.delete(item.id);
      }
    },
    [onUpload, patch]
  );

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      const incoming = Array.from(list);
      if (!incoming.length) return;

      if (!multiple && incoming.length > 1) {
        setError('مسموح برفع ملف واحد فقط.');
        return;
      }
      const slots = multiple ? maxFiles - files.length : 1;
      if (slots <= 0) {
        setError(`وصلت للحد الأقصى (${maxFiles} ملفات). احذف ملف عشان تضيف غيره.`);
        return;
      }

      const problems: string[] = [];
      const valid: UploadedFile[] = [];
      let overLimit = 0;

      for (const file of incoming) {
        if (!matchesAccept(file, accept)) {
          problems.push(`صيغة "${file.name}" غير مدعومة.`);
          continue;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
          problems.push(`الملف "${file.name}" أكبر من ${maxSizeMB} م.ب.`);
          continue;
        }
        if (
          multiple &&
          files.some(
            (f) =>
              f.name === file.name && f.size === file.size && f.file.lastModified === file.lastModified
          )
        ) {
          problems.push(`الملف "${file.name}" مضاف بالفعل.`);
          continue;
        }
        if (valid.length >= slots) {
          overLimit += 1;
          continue;
        }
        valid.push({
          id: makeId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          status: onUpload ? 'uploading' : 'completed',
          progress: onUpload ? 0 : 100,
        });
      }
      if (overLimit) problems.push(`الحد الأقصى ${maxFiles} ملفات، تم تجاهل ${overLimit}.`);

      setError(
        problems.length
          ? problems.slice(0, 2).join(' ') +
              (problems.length > 2 ? ` (و${problems.length - 2} ملاحظات أخرى)` : '')
          : null
      );
      if (!valid.length) return;

      if (!multiple) {
        files.forEach((f) => {
          if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
          controllers.current.get(f.id)?.abort();
        });
        setFiles(valid);
      } else {
        setFiles([...files, ...valid]);
      }
      valid.forEach((v) => void startUpload(v));
    },
    [accept, files, maxFiles, maxSizeMB, multiple, onUpload, startUpload]
  );

  const removeFile = (id: string) => {
    controllers.current.get(id)?.abort();
    controllers.current.delete(id);
    const target = filesRef.current.find((f) => f.id === id);
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setError(null);
  };

  const clearAll = () => {
    files.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      controllers.current.get(f.id)?.abort();
    });
    controllers.current.clear();
    setFiles([]);
    setError(null);
  };

  const retry = (item: UploadedFile) => void startUpload(item);

  const browse = () => {
    if (!disabled) inputRef.current?.click();
  };

  /* ---------- drag / paste (tablet + desktop zone) ---------- */
  const hasFiles = (e: React.DragEvent) => Array.from(e.dataTransfer?.types ?? []).includes('Files');

  const zoneHandlers = {
    onDragEnter: (e: React.DragEvent) => {
      if (disabled || !hasFiles(e)) return;
      e.preventDefault();
      dragDepth.current += 1;
      setIsDragOver(true);
    },
    onDragOver: (e: React.DragEvent) => {
      if (disabled || !hasFiles(e)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    onDragLeave: () => {
      if (disabled) return;
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setIsDragOver(false);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      dragDepth.current = 0;
      setIsDragOver(false);
      if (!disabled && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    onPaste: (e: React.ClipboardEvent) => {
      if (disabled) return;
      const pasted = e.clipboardData?.files;
      if (pasted && pasted.length) {
        e.preventDefault();
        addFiles(pasted);
      }
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        browse();
      }
    },
  };

  /* ---------- derived text ---------- */
  const formats = formatAccept(accept);
  const canCapture = !accept || /image/i.test(accept);
  const isDefaultDesc = description === DEFAULT_DESCRIPTION;
  const limitsText = [
    formats.length ? formats.slice(0, 4).join('، ') : null,
    `حتى ${maxSizeMB} م.ب`,
    multiple ? `${maxFiles} ملفات كحد أقصى` : null,
  ]
    .filter(Boolean)
    .join(' • ');

  const zoneState = disabled
    ? 'cursor-not-allowed border-[#D5DBDA] bg-[#F5F7F7] opacity-50'
    : isDragOver
      ? 'cursor-copy border-[#91B8C0] bg-[#91B8C0]/15'
      : 'cursor-pointer border-[#C5CDCB] bg-white hover:border-[#91B8C0] hover:bg-[#E5E9E8]/30';

  const zoneA11y = {
    role: 'button' as const,
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled,
    'aria-label': typeof description === 'string' ? description : 'رفع ملفات',
    onClick: browse,
    ...zoneHandlers,
  };

  /* ═════════════ Zones ═════════════ */

  const mobileZone = (
    <div
      className={`rounded-2xl border border-[#E5E9E8] bg-[#E5E9E8]/30 p-4 ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#91B8C0]/30 text-black">
          <UploadCloud className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-black">
            {isDefaultDesc ? 'اختار الملفات من جهازك' : description}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-[#5E6665]">{limitsText}</p>
        </div>
      </div>

      <div className={`mt-4 grid gap-2 ${canCapture ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <button
          type="button"
          onClick={browse}
          disabled={disabled}
          className={`flex h-12 items-center justify-center gap-2 rounded-xl bg-black text-sm font-bold text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed ${FOCUS}`}
        >
          <FolderOpen className="h-4 w-4" />
          من الجهاز
        </button>
        {canCapture && (
          <button
            type="button"
            onClick={() => !disabled && cameraRef.current?.click()}
            disabled={disabled}
            className={`flex h-12 items-center justify-center gap-2 rounded-xl border border-black bg-white text-sm font-bold text-black transition-transform active:scale-[0.98] disabled:cursor-not-allowed ${FOCUS}`}
          >
            <Camera className="h-4 w-4" />
            التقاط صورة
          </button>
        )}
      </div>
    </div>
  );

  const tabletZone = (
    <div
      {...zoneA11y}
      className={`flex items-center gap-4 rounded-2xl border-2 border-dashed p-5 transition-colors ${FOCUS} ${zoneState}`}
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-black transition-colors ${
          isDragOver ? 'bg-[#91B8C0]' : 'bg-[#E5E9E8]/80'
        }`}
      >
        <UploadCloud className="h-7 w-7" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-black">
          {isDragOver ? 'أفلت الملفات الآن للرفع' : description}
        </p>
        <p className="mt-1 text-xs text-[#5E6665]">{limitsText}</p>
      </div>
      <span className="shrink-0 rounded-xl bg-black px-4 py-2.5 text-[13px] font-bold text-white">
        تصفح الملفات
      </span>
    </div>
  );

  const desktopZone = (
    <div
      {...zoneA11y}
      className={`flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-8 text-center transition-colors ${FOCUS} ${zoneState}`}
    >
      <UploadArt active={isDragOver} />
      <div>
        <p className="text-base font-semibold text-black">
          {isDragOver ? 'أفلت الملفات الآن للرفع' : description}
        </p>
        <p className="mt-1 text-xs text-[#5E6665]">
          أو الصق ملف مباشرة بالضغط على{' '}
          <kbd className="rounded-md border border-[#D5DBDA] bg-[#E5E9E8]/50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-black">
            Ctrl + V
          </kbd>
        </p>
      </div>
      <span className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white">
        تصفح الملفات
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {formats.slice(0, 5).map((f) => (
          <span
            key={f}
            className="rounded-full bg-[#91B8C0]/25 px-2.5 py-1 text-[11px] font-bold text-black"
          >
            {f}
          </span>
        ))}
        <span className="rounded-full bg-[#E5E9E8]/80 px-2.5 py-1 text-[11px] font-semibold text-[#5E6665]">
          حتى {maxSizeMB} م.ب
        </span>
        {multiple && (
          <span className="rounded-full bg-[#E5E9E8]/80 px-2.5 py-1 text-[11px] font-semibold text-[#5E6665]">
            {maxFiles} ملفات كحد أقصى
          </span>
        )}
      </div>
    </div>
  );

  /* ═════════════ File items ═════════════ */

  const thumb = (item: UploadedFile, box: string) =>
    item.previewUrl ? (
      <div className={`relative shrink-0 overflow-hidden rounded-xl border border-[#E5E9E8] bg-[#E5E9E8]/40 ${box}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.previewUrl} alt="" className="h-full w-full object-cover" />
      </div>
    ) : (
      (() => {
        const Icon = getFileIcon(item.type);
        return (
          <div className={`flex shrink-0 items-center justify-center rounded-xl bg-[#E5E9E8]/70 text-black ${box}`}>
            <Icon className="h-5 w-5" />
          </div>
        );
      })()
    );

  const statusLabel = (item: UploadedFile) =>
    item.status === 'completed' ? (
      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        جاهز
      </span>
    ) : item.status === 'uploading' ? (
      <span className="font-semibold tabular-nums text-[#5E6665]">
        جاري الرفع {item.progress ?? 0}%
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 font-semibold text-red-600">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{item.errorMessage || 'فشل الرفع'}</span>
      </span>
    );

  const progressBar = (item: UploadedFile) =>
    item.status === 'uploading' ? (
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={item.progress ?? 0}
        aria-label={`رفع ${item.name}`}
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E5E9E8]"
      >
        <div
          className="h-full rounded-full bg-[#91B8C0] transition-[width] duration-200"
          style={{ width: `${item.progress ?? 0}%` }}
        />
      </div>
    ) : null;

  const actions = (item: UploadedFile, btn: string) => (
    <div className="flex shrink-0 items-center gap-1">
      {item.status === 'error' && onUpload && (
        <button
          type="button"
          onClick={() => retry(item)}
          aria-label={`إعادة رفع ${item.name}`}
          title="إعادة المحاولة"
          className={`flex items-center justify-center rounded-lg text-[#5E6665] transition-colors hover:bg-[#E5E9E8]/70 hover:text-black ${FOCUS} ${btn}`}
        >
          <RotateCw className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={() => removeFile(item.id)}
        aria-label={`حذف ${item.name}`}
        title="حذف الملف"
        className={`flex items-center justify-center rounded-lg text-[#5E6665] transition-colors hover:bg-red-50 hover:text-red-600 ${FOCUS} ${btn}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  /** mobile row / tablet card */
  const compactItem = (item: UploadedFile, big: boolean) => (
    <li
      key={item.id}
      className={`rounded-2xl border bg-white p-3 ${
        item.status === 'error' ? 'border-red-200' : 'border-[#E5E9E8]'
      }`}
    >
      <div className="flex items-center gap-3">
        {thumb(item, big ? 'h-12 w-12' : 'h-14 w-14')}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold text-black">{item.name}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#5E6665]">
            <span className="tabular-nums">{formatBytes(item.size)}</span>
            <span aria-hidden>•</span>
            {statusLabel(item)}
          </div>
        </div>
        {actions(item, big ? 'h-11 w-11' : 'h-9 w-9')}
      </div>
      {progressBar(item)}
    </li>
  );

  const COLS = 'grid-cols-[minmax(0,1fr)_84px_92px_190px_84px]';

  const tableItem = (item: UploadedFile) => (
    <li
      key={item.id}
      className={`grid ${COLS} items-center gap-4 border-t border-[#E5E9E8] px-4 py-3 first:border-t-0 ${
        item.status === 'error' ? 'bg-red-50/50' : ''
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {thumb(item, 'h-10 w-10')}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold text-black">{item.name}</p>
          {progressBar(item)}
        </div>
      </div>
      <span className="w-fit rounded-md bg-[#E5E9E8]/80 px-2 py-0.5 text-[11px] font-bold text-black">
        {getExt(item.name)}
      </span>
      <span className="text-xs tabular-nums text-[#5E6665]">{formatBytes(item.size)}</span>
      <div className="min-w-0 text-xs">{statusLabel(item)}</div>
      <div className="flex justify-end">{actions(item, 'h-9 w-9')}</div>
    </li>
  );

  const totalSize = files.reduce((s, f) => s + f.size, 0);

  const list =
    showPreviewList && files.length > 0 ? (
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs font-bold text-[#5E6665]">
          <span>
            الملفات المرفوعة ({files.length})
            {screen === 'desktop' && ` • ${formatBytes(totalSize)}`}
          </span>
          {files.length > 1 && (
            <button
              type="button"
              onClick={clearAll}
              className={`rounded-md px-2 py-1 text-red-600 hover:bg-red-50 ${FOCUS}`}
            >
              مسح الكل
            </button>
          )}
        </div>

        {screen === 'desktop' ? (
          <div className="overflow-hidden rounded-2xl border border-[#E5E9E8] bg-white">
            <div
              aria-hidden
              className={`grid ${COLS} gap-4 bg-[#E5E9E8]/40 px-4 py-2.5 text-[11px] font-bold text-[#5E6665]`}
            >
              <span>الملف</span>
              <span>النوع</span>
              <span>الحجم</span>
              <span>الحالة</span>
              <span />
            </div>
            <ul role="list">{files.map(tableItem)}</ul>
          </div>
        ) : screen === 'tablet' ? (
          <ul role="list" className="grid grid-cols-2 gap-2">
            {files.map((f) => compactItem(f, false))}
          </ul>
        ) : (
          <ul role="list" className="space-y-2">
            {files.map((f) => compactItem(f, true))}
          </ul>
        )}
      </div>
    ) : null;

  /* ═════════════ Render ═════════════ */

  return (
    <div dir="rtl" className={`flex select-none flex-col gap-3 text-start ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-black">
          {label}
        </label>
      )}

      {/* real inputs live OUTSIDE the clickable zone (no click re-entrancy) */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files);
          e.target.value = '';
        }}
        className="sr-only"
      />
      {screen === 'mobile' && canCapture && (
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          disabled={disabled}
          tabIndex={-1}
          aria-hidden
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = '';
          }}
          className="sr-only"
        />
      )}

      {screen === 'mobile' ? mobileZone : screen === 'tablet' ? tabletZone : desktopZone}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700"
        >
          <AlertCircle className="mt-px h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1 leading-relaxed">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="إخفاء الرسالة"
            className={`-m-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-red-100 ${FOCUS}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {!error && helperText && <p className="text-xs text-[#5E6665]">{helperText}</p>}

      {list}
    </div>
  );
};

export default FileUpload;