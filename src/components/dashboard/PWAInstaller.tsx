'use client';

import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, Smartphone, Monitor } from 'lucide-react';

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[RashX PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[RashX PWA] Service Worker registration failed:', err);
        });
    }

    // 2. Detect if already installed / standalone
    if (typeof window !== 'undefined') {
      const isRunningStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(isRunningStandalone);

      // 3. Listen for install prompt
      const handleBeforeInstall = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('[RashX PWA] Install outcome:', outcome);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // If already running standalone, show subtle verified pill
  if (isStandalone) {
    return (
      <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[#91B8C0] text-[10px] font-bold">
        <Monitor className="w-3 h-3" />
        <span>تطبيق مكتبي مثبت (PWA)</span>
      </div>
    );
  }

  // If installable or available, show install button
  return (
    <button
      type="button"
      onClick={handleInstallClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
        isInstallable
          ? 'bg-[#91B8C0] hover:bg-white text-[#0D1514] animate-pulse'
          : 'bg-white/10 hover:bg-white/20 text-[#E5E9E8] border border-white/10'
      }`}
      title="تثبيت لوحة تحكم راش إكس كبرنامج أصلي على حاسوبك أو هاتفك المحمول"
    >
      <Download className="w-3.5 h-3.5" />
      <span>تثبيت البرنامج (PWA)</span>
    </button>
  );
}

