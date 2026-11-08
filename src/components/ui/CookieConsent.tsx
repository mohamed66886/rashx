'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import {
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Lock,
  BarChart3,
  Sparkles,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

/* =========================================================================
   TYPES & INTERFACES (أنواع البيانات والواجهات البرمجية)
   ========================================================================= */

export type CookieCategoryType = 'necessary' | 'analytics' | 'preferences' | 'marketing';

export type CookieConsentVariant = 'modal' | 'banner' | 'floating' | 'bottom-sheet';

export type CookieConsentPosition = 'bottom-right' | 'bottom-left' | 'center' | 'bottom';

export interface CookieItem {
  name: string;
  provider: string;
  duration: string;
  purpose: string;
  type?: 'HTTP' | 'LocalStorage' | 'Session';
}

export interface CookieCategory {
  id: CookieCategoryType;
  title: string;
  description: string;
  required?: boolean;
  defaultEnabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  cookies: CookieItem[];
}

export interface CookieConsentState {
  hasResponded: boolean;
  timestamp: string;
  version: string;
  categories: Record<CookieCategoryType, boolean>;
}

export interface CookieConsentTexts {
  title: string;
  badge: string;
  description: string;
  readMore: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  savePreferences: string;
  backToSummary: string;
  preferencesTitle: string;
  preferencesDescription: string;
  activeCount: (active: number, total: number) => string;
  requiredBadge: string;
  optionalBadge: string;
  viewCookies: string;
  hideCookies: string;
  cookieNameCol: string;
  providerCol: string;
  durationCol: string;
  purposeCol: string;
  privacyLinkText: string;
  cookiePolicyLinkText: string;
  floatingButtonLabel: string;
  resetButtonText: string;
  statusSaved: string;
}

export interface CookieConsentProps {
  /** Display mode of the cookie consent banner/modal */
  variant?: CookieConsentVariant;
  /** Floating position for 'floating' variant */
  position?: CookieConsentPosition;
  /** Storage key in localStorage */
  storageKey?: string;
  /** Policy version to track updates */
  version?: string;
  /** Days before consent expires and re-prompts the user (default: 180 days) */
  expiryDays?: number;
  /** Privacy policy link URL */
  privacyPolicyUrl?: string;
  /** Cookie policy link URL */
  cookiePolicyUrl?: string;
  /** Custom categories definition */
  customCategories?: CookieCategory[];
  /** Controlled open state */
  isOpen?: boolean;
  /** Controlled open state callback */
  onOpenChange?: (open: boolean) => void;
  /** Whether to show a floating badge button to reopen settings after dismiss */
  showFloatingTrigger?: boolean;
  /** Trigger button position */
  triggerPosition?: 'bottom-left' | 'bottom-right';
  /** Language mode */
  lang?: 'ar' | 'en';
  /** Custom text dictionary overrides */
  texts?: Partial<CookieConsentTexts>;
  /** Callback fired when user accepts all cookies */
  onAcceptAll?: (consent: CookieConsentState) => void;
  /** Callback fired when user rejects non-essential cookies */
  onRejectAll?: (consent: CookieConsentState) => void;
  /** Callback fired when user saves custom preferences */
  onSavePreferences?: (consent: CookieConsentState) => void;
  /** Callback fired whenever consent changes */
  onChange?: (consent: CookieConsentState) => void;
  /** Extra container className */
  className?: string;
}

/* =========================================================================
   DEFAULT CATEGORIES & DATA (الفئات الافتراضية المتوافقة مع PDPL و GDPR)
   ========================================================================= */

const DEFAULT_CATEGORIES_AR: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'ملفات تعريف الارتباط الضرورية',
    description:
      'أساسية لتشغيل المنصة وتأمين جلسة المستخدم، حماية النماذج ضد هجمات CSRF، وإدارة الأذونات الأمنية. لا يمكن تعطيلها.',
    required: true,
    defaultEnabled: true,
    icon: Lock,
    cookies: [
      {
        name: 'rashx_session',
        provider: 'RASHX System',
        duration: 'جلسة التصفح',
        purpose: 'الحفاظ على جلسة تسجيل الدخول المشفرة للمستخدم والتحقق من الهوية.',
        type: 'HTTP',
      },
      {
        name: 'rashx_csrf_token',
        provider: 'RASHX Security',
        duration: 'جلسة التصفح',
        purpose: 'حماية المنظومة ومنع هجمات التزوير عبر المواقع (CSRF).',
        type: 'HTTP',
      },
      {
        name: 'rashx_consent',
        provider: 'RASHX Compliance',
        duration: '180 يوماً',
        purpose: 'تخزين تفضيلات ملفات تعريف الارتباط واختيارات الخصوصية المعتمدة.',
        type: 'LocalStorage',
      },
    ],
  },
  {
    id: 'preferences',
    title: 'ملفات التفضيلات والوظائف',
    description:
      'تتيح للموقع تذكر خياراتك السابقة مثل اللغة المفضلة، حالة القوائم الجانبية، وإعدادات الواجهة لتوفير تجربة مخصصة.',
    required: false,
    defaultEnabled: true,
    icon: SlidersHorizontal,
    cookies: [
      {
        name: 'rashx_lang',
        provider: 'RASHX UI',
        duration: 'سنة واحدة',
        purpose: 'حفظ اختيارك للغة الواجهة (العربية / الإنجليزية) واتجاه النص (RTL/LTR).',
        type: 'LocalStorage',
      },
      {
        name: 'rashx_theme_mode',
        provider: 'RASHX UI',
        duration: 'سنة واحدة',
        purpose: 'تذكر تفضيلات المظهر المختار ودرجة التباين.',
        type: 'LocalStorage',
      },
      {
        name: 'rashx_sidebar_state',
        provider: 'RASHX UI',
        duration: '30 يوماً',
        purpose: 'تذكر حالة القائمة الجانبية (مفتوحة / مصغرة).',
        type: 'LocalStorage',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'ملفات الأداء والتحليلات',
    description:
      'تساعدنا في فهم كيفية استخدام الزوار للمنصة ومعدلات سرعة الاستجابة وتشخيص الأخطاء الفنية لتطوير وتحسين الأداء.',
    required: false,
    defaultEnabled: false,
    icon: BarChart3,
    cookies: [
      {
        name: '_ga, _gid',
        provider: 'Google Analytics',
        duration: 'سنتان',
        purpose: 'إحصاء عدد الزوار وتحليل مسارات التنقل وسرعة استجابة الصفحات.',
        type: 'HTTP',
      },
      {
        name: 'rashx_telemetry',
        provider: 'RASHX Performance',
        duration: '90 يوماً',
        purpose: 'تسجيل مؤشرات زمن التحميل اللحظي وأخطاء الواجهة البرمجية.',
        type: 'LocalStorage',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'ملفات التسويق والإعلانات الموجهة',
    description:
      'تُستخدم لتتبع فاعلية الحملات الإعلانية وتقديم تجارب ترويجية تناسب اهتماماتك بناءً على سلوك التصفح عبر شبكات الشركاء.',
    required: false,
    defaultEnabled: false,
    icon: Sparkles,
    cookies: [
      {
        name: '_fbp, _gcl_au',
        provider: 'Meta / Google Ads',
        duration: '90 يوماً',
        purpose: 'قياس عائد الحملات الإعلانية ومتابعة تفاعل الزوار مع الإعلانات.',
        type: 'HTTP',
      },
      {
        name: 'rashx_campaign_ref',
        provider: 'RASHX Growth',
        duration: '30 يوماً',
        purpose: 'تحديد كود الخصم أو الشريك التسويقي الذي أحال الزائر.',
        type: 'LocalStorage',
      },
    ],
  },
];

const DEFAULT_CATEGORIES_EN: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'Strictly Necessary Cookies',
    description:
      'Essential for the core platform functionality, secure authentication, CSRF token validation, and safety. Cannot be disabled.',
    required: true,
    defaultEnabled: true,
    icon: Lock,
    cookies: [
      {
        name: 'rashx_session',
        provider: 'RASHX System',
        duration: 'Session',
        purpose: 'Maintains authenticated encrypted user session and identity.',
        type: 'HTTP',
      },
      {
        name: 'rashx_csrf_token',
        provider: 'RASHX Security',
        duration: 'Session',
        purpose: 'Mitigates Cross-Site Request Forgery attacks.',
        type: 'HTTP',
      },
      {
        name: 'rashx_consent',
        provider: 'RASHX Compliance',
        duration: '180 days',
        purpose: 'Stores your validated cookie and privacy choices.',
        type: 'LocalStorage',
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Functional & Preferences',
    description:
      'Remembers your chosen language, layout state, and UI options to provide an optimized, personalized experience.',
    required: false,
    defaultEnabled: true,
    icon: SlidersHorizontal,
    cookies: [
      {
        name: 'rashx_lang',
        provider: 'RASHX UI',
        duration: '1 year',
        purpose: 'Remembers your interface language and direction.',
        type: 'LocalStorage',
      },
      {
        name: 'rashx_theme_mode',
        provider: 'RASHX UI',
        duration: '1 year',
        purpose: 'Stores preferred color mode and contrast.',
        type: 'LocalStorage',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Performance & Analytics',
    description:
      'Helps us understand how visitors interact with the platform, identify performance bottlenecks, and monitor uptime.',
    required: false,
    defaultEnabled: false,
    icon: BarChart3,
    cookies: [
      {
        name: '_ga, _gid',
        provider: 'Google Analytics',
        duration: '2 years',
        purpose: 'Aggregated page visit metrics and navigation analytics.',
        type: 'HTTP',
      },
      {
        name: 'rashx_telemetry',
        provider: 'RASHX Performance',
        duration: '90 days',
        purpose: 'Real-time performance metrics and frontend error monitoring.',
        type: 'LocalStorage',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Targeting',
    description:
      'Used to measure marketing campaign efficiency and deliver relevant contextual promotions across partner networks.',
    required: false,
    defaultEnabled: false,
    icon: Sparkles,
    cookies: [
      {
        name: '_fbp, _gcl_au',
        provider: 'Meta / Google Ads',
        duration: '90 days',
        purpose: 'Measures campaign conversion and ad effectiveness.',
        type: 'HTTP',
      },
    ],
  },
];

/* =========================================================================
   LOCALIZATION DICTIONARIES
   ========================================================================= */

const TEXTS_AR: CookieConsentTexts = {
  title: 'إشعار ملفات تعريف الارتباط والخصوصية',
  badge: 'نظام حماية البيانات الشخصية (PDPL)',
  description:
    'نستخدم ملفات تعريف الارتباط (Cookies) والتقنيات المماثلة لتعزيز أمان المنصة، وتخصيص تجربتك، وتحليل أداء الخدمة وفقاً للأنظمة واللوائح المعتمدة بالمملكة العربية السعودية.',
  readMore: 'معرفة المزيد',
  acceptAll: 'قبول الكل',
  rejectAll: 'رفض غير الأساسية',
  customize: 'تخصيص التفضيلات',
  savePreferences: 'حفظ التفضيلات',
  backToSummary: 'العودة للملخص',
  preferencesTitle: 'تخصيص تفضيلات الخصوصية',
  preferencesDescription:
    'يمكنك إدارة موافقتك على أنواع ملفات تعريف الارتباط المختلفة. الملفات الضرورية تظل مفعلة دائماً لضمان عمل المنظومة بأمان.',
  activeCount: (active, total) => `${active} من ${total} فئات مفعّلة`,
  requiredBadge: 'إلزامية دائماً',
  optionalBadge: 'اختيارية',
  viewCookies: 'عرض ملفات الفئة التفصيلية',
  hideCookies: 'إخفاء التفاصيل',
  cookieNameCol: 'اسم الملف / المعرف',
  providerCol: 'المصدر',
  durationCol: 'فترة الصلاحية',
  purposeCol: 'الغرض والاستخدام',
  privacyLinkText: 'سياسة الخصوصية',
  cookiePolicyLinkText: 'سياسة الكوكيز',
  floatingButtonLabel: 'تفضيلات الخصوصية والكوكيز',
  resetButtonText: 'إعادة ضبط الخيارات',
  statusSaved: 'تم حفظ تفضيلاتك بنجاح',
};

const TEXTS_EN: CookieConsentTexts = {
  title: 'Cookie Notice & Privacy Preferences',
  badge: 'Data Protection & Compliance',
  description:
    'We use cookies and similar technologies to ensure secure operations, personalize your experience, and analyze site performance in compliance with applicable privacy regulations.',
  readMore: 'Learn more',
  acceptAll: 'Accept All',
  rejectAll: 'Reject Non-Essential',
  customize: 'Customize Settings',
  savePreferences: 'Save Preferences',
  backToSummary: 'Back to summary',
  preferencesTitle: 'Cookie & Privacy Preferences',
  preferencesDescription:
    'Manage your consent for different categories of cookies. Strictly necessary cookies remain active to ensure the safe operation of our platform.',
  activeCount: (active, total) => `${active} of ${total} categories enabled`,
  requiredBadge: 'Always Active',
  optionalBadge: 'Optional',
  viewCookies: 'View detailed cookies list',
  hideCookies: 'Hide details',
  cookieNameCol: 'Cookie Name',
  providerCol: 'Provider',
  durationCol: 'Duration',
  purposeCol: 'Purpose & Use',
  privacyLinkText: 'Privacy Policy',
  cookiePolicyLinkText: 'Cookie Policy',
  floatingButtonLabel: 'Cookie & Privacy Settings',
  resetButtonText: 'Reset Choices',
  statusSaved: 'Preferences saved successfully',
};

/* =========================================================================
   STYLIZED VECTOR COOKIE BADGE (أيقونة كوكيز مصممة بهوية راش اكس)
   ========================================================================= */

export const StylizedCookieIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 44 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#F0C5AE]/40 via-[#F0C5AE]/20 to-[#91B8C0]/30 border border-[#F0C5AE]/60 p-2 text-black shadow-xs ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Cookie className="w-6 h-6 text-[#9E6540] transition-transform duration-300 group-hover:rotate-12" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#91B8C0] opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#91B8C0] border-2 border-white" />
      </span>
    </div>
  );
};

/* =========================================================================
   SWITCH COMPONENT FOR CATEGORY TOGGLES
   ========================================================================= */

interface CategorySwitchProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}

const CategorySwitch: React.FC<CategorySwitchProps> = ({
  id,
  checked,
  disabled = false,
  onChange,
  ariaLabel,
}) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onChange(!checked);
        }
      }}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] focus-visible:ring-offset-2 ${
        disabled
          ? 'bg-[#91B8C0]/70 cursor-not-allowed opacity-90'
          : checked
          ? 'bg-[#91B8C0] hover:bg-[#7fa4ac]'
          : 'bg-[#E5E9E8] hover:bg-[#d8dedd]'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

/* =========================================================================
   CUSTOM HOOK & STORE FOR CONSENT MANAGEMENT
   ========================================================================= */

export const CONSENT_STORAGE_KEY = 'rashx_cookie_consent';
export const CONSENT_CHANGE_EVENT = 'rashx-cookie-consent-change';

const emptySubscribe = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function getStoredConsentSnapshot(storageKey: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function subscribeToStorage(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function useCookieConsent(storageKey = CONSENT_STORAGE_KEY) {
  const [isOpen, setIsOpen] = useState(false);

  const rawConsent = useSyncExternalStore(
    subscribeToStorage,
    () => getStoredConsentSnapshot(storageKey),
    () => null
  );

  const consent = useMemo<CookieConsentState | null>(() => {
    if (!rawConsent) return null;
    try {
      return JSON.parse(rawConsent) as CookieConsentState;
    } catch {
      return null;
    }
  }, [rawConsent]);

  const hasConsent = useCallback(
    (category: CookieCategoryType): boolean => {
      if (!consent) return false;
      if (category === 'necessary') return true;
      return Boolean(consent.categories?.[category]);
    },
    [consent]
  );

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setIsOpen(true);
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: null })
    );
  }, [storageKey]);

  return {
    consent,
    hasConsent,
    isOpen,
    setIsOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    resetConsent,
  };
}

/* =========================================================================
   MAIN COMPONENT (كمبوننت موديل وملف تعريف الارتباط)
   ========================================================================= */

export const CookieConsent: React.FC<CookieConsentProps> = ({
  variant = 'floating',
  position = 'bottom-right',
  storageKey = CONSENT_STORAGE_KEY,
  version = '1.0',
  expiryDays = 180,
  privacyPolicyUrl = '#privacy',
  cookiePolicyUrl = '#cookies',
  customCategories,
  isOpen: controlledIsOpen,
  onOpenChange,
  showFloatingTrigger = true,
  triggerPosition = 'bottom-right',
  lang = 'ar',
  texts: userTexts,
  onAcceptAll,
  onRejectAll,
  onSavePreferences,
  onChange,
  className = '',
}) => {
  const isClient = useIsClient();
  const isRtl = lang === 'ar';

  const defaultCategories = useMemo(
    () => (lang === 'ar' ? DEFAULT_CATEGORIES_AR : DEFAULT_CATEGORIES_EN),
    [lang]
  );
  const categories = customCategories || defaultCategories;

  const baseTexts = lang === 'ar' ? TEXTS_AR : TEXTS_EN;
  const texts = useMemo(
    () => ({ ...baseTexts, ...userTexts }),
    [baseTexts, userTexts]
  );

  // Sync with localStorage
  const rawConsent = useSyncExternalStore(
    subscribeToStorage,
    () => getStoredConsentSnapshot(storageKey),
    () => null
  );

  const parsedConsent = useMemo<CookieConsentState | null>(() => {
    if (!rawConsent) return null;
    try {
      const parsed = JSON.parse(rawConsent) as CookieConsentState;
      if (parsed.version === version) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }, [rawConsent, version]);

  // Check expiration in an effect (runs after render)
  useEffect(() => {
    if (!parsedConsent?.timestamp) return;
    const consentTime = new Date(parsedConsent.timestamp).getTime();
    const expiryMs = expiryDays * 24 * 60 * 60 * 1000;
    if (Date.now() - consentTime > expiryMs) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
      window.dispatchEvent(
        new CustomEvent(CONSENT_CHANGE_EVENT, { detail: null })
      );
    }
  }, [parsedConsent, expiryDays, storageKey]);

  const hasValidConsent = Boolean(parsedConsent);

  // User manually dismissed this session
  const [isDismissed, setIsDismissed] = useState(false);
  // User manually opened modal
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const [viewMode, setViewMode] = useState<'summary' | 'preferences'>('summary');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Category selections state
  const [selectedCategories, setSelectedCategories] = useState<
    Record<CookieCategoryType, boolean>
  >(() => {
    const initial: Record<CookieCategoryType, boolean> = {
      necessary: true,
      analytics: false,
      preferences: true,
      marketing: false,
    };
    categories.forEach((cat) => {
      initial[cat.id] = cat.required ? true : Boolean(cat.defaultEnabled);
    });
    const stored = getStoredConsentSnapshot(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieConsentState;
        if (parsed.categories) {
          return { ...initial, ...parsed.categories, necessary: true };
        }
      } catch {
        // ignore
      }
    }
    return initial;
  });

  // Effective open state calculation
  const isAutoOpen = !hasValidConsent && !isDismissed;
  const effectiveIsOpen =
    controlledIsOpen !== undefined
      ? controlledIsOpen
      : isManuallyOpened || isAutoOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (onOpenChange) {
        onOpenChange(open);
      }
      if (!open) {
        setIsDismissed(true);
        setIsManuallyOpened(false);
      } else {
        setIsManuallyOpened(true);
        setIsDismissed(false);
      }
    },
    [onOpenChange]
  );

  // Lock body scroll only when variant is modal or bottom-sheet on mobile
  useEffect(() => {
    if (effectiveIsOpen && (variant === 'modal' || variant === 'bottom-sheet')) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [effectiveIsOpen, variant]);

  // Keyboard accessibility: ESC key to close preferences view back to summary or dismiss if modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && effectiveIsOpen) {
        if (viewMode === 'preferences') {
          setViewMode('summary');
        } else if (variant === 'modal') {
          setOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [effectiveIsOpen, viewMode, variant, setOpen]);

  // Helper to persist consent
  const saveConsentState = useCallback(
    (
      cats: Record<CookieCategoryType, boolean>,
      type: 'accept-all' | 'reject-all' | 'save-preferences'
    ) => {
      const consentData: CookieConsentState = {
        hasResponded: true,
        timestamp: new Date().toISOString(),
        version,
        categories: { ...cats, necessary: true },
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify(consentData));
      } catch {
        // storage disabled
      }

      window.dispatchEvent(
        new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consentData })
      );

      if (type === 'accept-all') {
        onAcceptAll?.(consentData);
      } else if (type === 'reject-all') {
        onRejectAll?.(consentData);
      } else {
        onSavePreferences?.(consentData);
      }
      onChange?.(consentData);

      setOpen(false);
      setViewMode('summary');
    },
    [storageKey, version, onAcceptAll, onRejectAll, onSavePreferences, onChange, setOpen]
  );

  // Handlers
  const handleAcceptAll = () => {
    const allEnabled: Record<CookieCategoryType, boolean> = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    setSelectedCategories(allEnabled);
    saveConsentState(allEnabled, 'accept-all');
  };

  const handleRejectAll = () => {
    const onlyNecessary: Record<CookieCategoryType, boolean> = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    };
    setSelectedCategories(onlyNecessary);
    saveConsentState(onlyNecessary, 'reject-all');
  };

  const handleSavePreferences = () => {
    saveConsentState(selectedCategories, 'save-preferences');
  };

  const toggleCategory = (id: CookieCategoryType, val: boolean) => {
    if (id === 'necessary') return; // Cannot toggle necessary
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const activeCategoriesCount = useMemo(() => {
    return Object.values(selectedCategories).filter(Boolean).length;
  }, [selectedCategories]);

  if (!isClient) return null;

  // Positioning classes for floating variant
  const positionClasses = {
    'bottom-right': 'bottom-5 right-5 sm:right-6',
    'bottom-left': 'bottom-5 left-5 sm:left-6',
    center: 'bottom-5 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-0 right-0',
  }[position];

  return (
    <>
      {/* Floating Re-Open Trigger Button (زر التفضيلات العائم عندما يكون الموديل مغلقاً) */}
      {showFloatingTrigger && !effectiveIsOpen && (
        <button
          type="button"
          onClick={() => {
            setViewMode('preferences');
            setOpen(true);
          }}
          className={`fixed z-[9990] flex items-center gap-2 px-3 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E9E8] shadow-lg text-black hover:bg-[#F0C5AE]/20 hover:border-[#91B8C0] focus:outline-none focus:ring-2 focus:ring-[#91B8C0] transition-all duration-300 group cursor-pointer ${
            triggerPosition === 'bottom-left'
              ? 'bottom-5 left-5'
              : 'bottom-5 right-5'
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
          title={texts.floatingButtonLabel}
          aria-label={texts.floatingButtonLabel}
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#F0C5AE]/40 text-[#9E6540] group-hover:scale-110 transition-transform">
            <Cookie className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-black hidden sm:inline-block">
            {texts.floatingButtonLabel}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#91B8C0]" />
        </button>
      )}

      {/* Main Cookie Consent Container */}
      {effectiveIsOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Backdrop for 'modal' or mobile 'bottom-sheet' */}
          {(variant === 'modal' || (variant === 'bottom-sheet' && viewMode === 'preferences')) && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
              onClick={() => {
                if (variant === 'modal') setOpen(false);
              }}
              aria-hidden="true"
            />
          )}

          {/* Dialog Container */}
          <div
            className={`pointer-events-auto ${
              variant === 'modal'
                ? 'fixed inset-0 flex items-center justify-center p-4 sm:p-6 overflow-y-auto'
                : variant === 'bottom-sheet'
                ? 'fixed bottom-0 inset-x-0 p-0 sm:p-4 sm:pb-6 flex justify-center'
                : variant === 'banner'
                ? 'fixed bottom-0 inset-x-0 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-[#E5E9E8] shadow-2xl'
                : `fixed ${positionClasses} max-w-[480px] w-[calc(100vw-2.5rem)]`
            }`}
          >
            <div
              role="dialog"
              aria-modal={variant === 'modal'}
              aria-labelledby="cookie-consent-title"
              className={`relative w-full bg-white rounded-2xl border border-[#E5E9E8] shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
                variant === 'modal'
                  ? 'max-w-2xl my-auto max-h-[90vh] flex flex-col'
                  : variant === 'bottom-sheet'
                  ? 'max-w-3xl rounded-b-none sm:rounded-2xl max-h-[90vh] flex flex-col'
                  : variant === 'banner'
                  ? 'max-w-7xl mx-auto'
                  : 'max-h-[85vh] flex flex-col'
              } ${className}`}
            >
              {/* TOP HEADER ACCENT STRIP */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#91B8C0] via-[#F0C5AE] to-[#91B8C0]" />

              {/* VIEW 1: SUMMARY / QUICK CONSENT (الملخص السريع) */}
              {viewMode === 'summary' && (
                <div className="p-5 sm:p-6 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <StylizedCookieIcon />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2
                            id="cookie-consent-title"
                            className="text-base sm:text-lg font-bold text-black tracking-tight"
                          >
                            {texts.title}
                          </h2>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF6F0] text-emerald-800 border border-[#9CD3BE]">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            {texts.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#5E6665] leading-relaxed">
                          {texts.description}
                        </p>
                      </div>
                    </div>

                    {/* Quick Close (only in non-mandatory modal modes) */}
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="p-1.5 rounded-lg text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors shrink-0 cursor-pointer"
                      aria-label="إغلاق الإشعار"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Legal links strip */}
                  <div className="flex items-center gap-4 text-xs text-[#5E6665] border-t border-[#E5E9E8]/70 pt-3">
                    <a
                      href={privacyPolicyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#91B8C0] hover:underline font-medium transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {texts.privacyLinkText}
                    </a>
                    <span>•</span>
                    <a
                      href={cookiePolicyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#91B8C0] hover:underline font-medium transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {texts.cookiePolicyLinkText}
                    </a>
                    <span className="mr-auto text-[11px] text-[#5E6665]/80 font-mono">
                      v{version}
                    </span>
                  </div>

                  {/* Actions / Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('preferences')}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-black bg-white hover:bg-[#E5E9E8]/60 border border-[#E5E9E8] rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#5E6665]" />
                      {texts.customize}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleRejectAll}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-black bg-[#E5E9E8]/70 hover:bg-[#E5E9E8] border border-[#E5E9E8] rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        {texts.rejectAll}
                      </button>

                      <button
                        type="button"
                        onClick={handleAcceptAll}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-bold text-black bg-[#91B8C0] hover:bg-[#7fa4ac] rounded-xl shadow-xs transition-all cursor-pointer active:scale-[0.98] focus:ring-2 focus:ring-[#91B8C0]/40"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        {texts.acceptAll}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: GRANULAR PREFERENCES (تخصيص تفضيلات الكوكيز بالتفصيل) */}
              {viewMode === 'preferences' && (
                <div className="flex flex-col max-h-[80vh] overflow-hidden">
                  {/* Preferences Header */}
                  <div className="p-5 sm:p-6 border-b border-[#E5E9E8] bg-white sticky top-0 z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setViewMode('summary')}
                        className="p-2 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/70 transition-colors border border-[#E5E9E8] cursor-pointer"
                        title={texts.backToSummary}
                        aria-label={texts.backToSummary}
                      >
                        {isRtl ? (
                          <ChevronDown className="w-4 h-4 rotate-90" />
                        ) : (
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-black tracking-tight">
                            {texts.preferencesTitle}
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#91B8C0]/20 text-black font-semibold border border-[#91B8C0]/40">
                            {texts.activeCount(
                              activeCategoriesCount,
                              categories.length
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-[#5E6665] mt-0.5 hidden sm:block">
                          {texts.preferencesDescription}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors cursor-pointer"
                      aria-label="إغلاق النافذة"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Categories Accordion List */}
                  <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 divide-y divide-[#E5E9E8]/60">
                    {categories.map((cat) => {
                      const IconComponent = cat.icon || Cookie;
                      const isChecked = selectedCategories[cat.id];
                      const isExpanded = expandedCategory === cat.id;
                      const switchId = `cookie-cat-${cat.id}`;

                      return (
                        <div
                          key={cat.id}
                          className="pt-3.5 first:pt-0 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                                  cat.required
                                    ? 'bg-[#91B8C0]/20 text-black border border-[#91B8C0]/30'
                                    : isChecked
                                    ? 'bg-[#F0C5AE]/30 text-black border border-[#F0C5AE]/50'
                                    : 'bg-[#E5E9E8]/60 text-[#5E6665] border border-[#E5E9E8]'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <label
                                    htmlFor={switchId}
                                    className="font-bold text-sm text-black cursor-pointer"
                                  >
                                    {cat.title}
                                  </label>

                                  {cat.required ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white">
                                      <Lock className="w-2.5 h-2.5" />
                                      {texts.requiredBadge}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E5E9E8] text-[#5E6665]">
                                      {texts.optionalBadge}
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-[#5E6665] leading-relaxed">
                                  {cat.description}
                                </p>
                              </div>
                            </div>

                            {/* Category Switch */}
                            <div className="shrink-0 pt-1">
                              <CategorySwitch
                                id={switchId}
                                checked={isChecked}
                                disabled={cat.required}
                                onChange={(val) => toggleCategory(cat.id, val)}
                                ariaLabel={`${cat.title} (${
                                  isChecked ? 'مفعلة' : 'معطلة'
                                })`}
                              />
                            </div>
                          </div>

                          {/* Specific Cookies Toggle & Table */}
                          {cat.cookies && cat.cookies.length > 0 && (
                            <div className="pr-10 sm:pr-11">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedCategory(
                                    isExpanded ? null : cat.id
                                  )
                                }
                                className="inline-flex items-center gap-1 text-xs text-[#5E6665] hover:text-black font-medium transition-colors cursor-pointer"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                    <span>{texts.hideCookies}</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                    <span>
                                      {texts.viewCookies} ({cat.cookies.length})
                                    </span>
                                  </>
                                )}
                              </button>

                              {isExpanded && (
                                <div className="mt-2.5 rounded-xl border border-[#E5E9E8] overflow-hidden bg-[#FAFBFB] text-xs">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-right border-collapse">
                                      <thead>
                                        <tr className="border-b border-[#E5E9E8] bg-[#F3F6F6] text-[11px] font-bold text-black">
                                          <th className="p-2.5">
                                            {texts.cookieNameCol}
                                          </th>
                                          <th className="p-2.5">
                                            {texts.providerCol}
                                          </th>
                                          <th className="p-2.5">
                                            {texts.durationCol}
                                          </th>
                                          <th className="p-2.5">
                                            {texts.purposeCol}
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-[#E5E9E8]/70">
                                        {cat.cookies.map((cookie, idx) => (
                                          <tr
                                            key={idx}
                                            className="hover:bg-white transition-colors text-[11px] text-[#5E6665]"
                                          >
                                            <td className="p-2.5 font-mono font-medium text-black">
                                              {cookie.name}
                                            </td>
                                            <td className="p-2.5 whitespace-nowrap">
                                              {cookie.provider}
                                            </td>
                                            <td className="p-2.5 whitespace-nowrap">
                                              {cookie.duration}
                                            </td>
                                            <td className="p-2.5 leading-relaxed min-w-[180px]">
                                              {cookie.purpose}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Preferences Footer Actions */}
                  <div className="p-4 sm:p-5 border-t border-[#E5E9E8] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-10">
                    <button
                      type="button"
                      onClick={() => {
                        const resetCats: Record<CookieCategoryType, boolean> = {
                          necessary: true,
                          analytics: false,
                          preferences: false,
                          marketing: false,
                        };
                        setSelectedCategories(resetCats);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-[#5E6665] hover:text-black cursor-pointer font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {texts.resetButtonText}
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleRejectAll}
                        className="flex-1 sm:flex-none px-3.5 py-2 text-xs sm:text-sm font-semibold text-black bg-[#E5E9E8]/70 hover:bg-[#E5E9E8] border border-[#E5E9E8] rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        {texts.rejectAll}
                      </button>

                      <button
                        type="button"
                        onClick={handleSavePreferences}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4.5 py-2 text-xs sm:text-sm font-bold text-black bg-[#91B8C0] hover:bg-[#7fa4ac] rounded-xl shadow-xs transition-all cursor-pointer focus:ring-2 focus:ring-[#91B8C0]/40"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        {texts.savePreferences}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const CookieModal = CookieConsent;
export default CookieConsent;
