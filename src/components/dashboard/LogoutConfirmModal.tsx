'use client';

import React, { useEffect } from 'react';
import { LogOut } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white text-[#0D1514] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E5E9E8] animate-scaleUp">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <LogOut className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#0D1514] mb-2">تأكيد إنهاء الجلسة الإدارية</h3>
        <p className="text-xs text-[#5E6665] leading-relaxed mb-6">
          سيتم إنهاء جلستك في قاعدة بيانات Firebase Firestore (`admin_sessions`). هل ترغب في تسجيل الخروج الآن من لوحة إدارة راش إكس؟
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            نعم، تسجيل الخروج
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[#F5F8F8] hover:bg-[#E5E9E8] active:scale-98 text-[#0D1514] font-bold text-xs transition-all cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
