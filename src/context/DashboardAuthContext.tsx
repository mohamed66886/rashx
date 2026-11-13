'use client';

/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Super Admin Auth & State Context
 * ============================================================================
 * Powers the central management application (admin.rashx.org).
 * Receives the verified administrator session from Server Components.
 * No localStorage fallbacks or JS-written session cookies.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { logoutAction } from '@/server/actions/auth';
import { updateAdminAvatarAction } from '@/server/actions/admins';
import type { AdminUser } from '@/server/auth/session';

export type DBConnectionStatus = 'connected' | 'syncing' | 'offline';

export interface DashboardSessionData {
  id: string;
  adminId: string;
  email: string;
  name: string;
  role: string;
  title?: string;
  avatarId?: number;
  avatar?: string;
}

export interface PlatformAdminContextType {
  admin: AdminUser | null;
  session: DashboardSessionData | null;
  isLoading: boolean;
  dbStatus: DBConnectionStatus;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  isAvatarPickerOpen: boolean;
  openAvatarPicker: () => void;
  closeAvatarPicker: () => void;
  updateAvatar: (avatarId: number, customUrl?: string) => Promise<{ success: boolean; error?: string }>;
}

const PlatformAdminContext = createContext<PlatformAdminContextType | undefined>(undefined);

export interface DashboardAuthProviderProps {
  children: React.ReactNode;
  initialAdmin?: AdminUser | null;
}

export const DashboardAuthProvider: React.FC<DashboardAuthProviderProps> = ({
  children,
  initialAdmin = null,
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(initialAdmin);
  const [prevInitialAdmin, setPrevInitialAdmin] = useState<AdminUser | null>(initialAdmin);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  // Synchronize state during render when initialAdmin changes from server components
  if (initialAdmin !== prevInitialAdmin) {
    setPrevInitialAdmin(initialAdmin);
    setAdmin(initialAdmin);
  }

  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';

  const openAvatarPicker = useCallback(() => setIsAvatarPickerOpen(true), []);
  const closeAvatarPicker = useCallback(() => setIsAvatarPickerOpen(false), []);

  const handleUpdateAvatar = useCallback(
    async (avatarId: number, customUrl?: string) => {
      if (!admin) return { success: false, error: 'غير مسجل الدخول' };
      try {
        // 1. Persist to Firestore & Audit Log via Server Action
        const res = await updateAdminAvatarAction({ avatarId, customUrl });
        if (!res.success) {
          return { success: false, error: res.error || 'فشل حفظ الأفاتار في قاعدة البيانات' };
        }

        const finalAvatar = res.avatar || customUrl || `/avatars/animoji-${avatarId}.webp`;
        const finalAvatarId = res.avatarId || avatarId;

        // 2. Synchronize client-side state
        setAdmin((prev) => (prev ? { ...prev, avatarId: finalAvatarId, avatar: finalAvatar } : null));

        // 3. Trigger server components revalidation
        router.refresh();
        return { success: true };
      } catch (err: unknown) {
        const error = err instanceof Error ? err.message : 'فشل الاتصال بالخادم';
        return { success: false, error };
      }
    },
    [admin, router]
  );

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutAction(locale);
    } catch {
      // logoutAction performs a server redirect
    } finally {
      setAdmin(null);
      setIsLoading(false);
      router.replace(`/${locale}/dashboard/login`);
    }
  }, [locale, router]);

  const refreshSession = useCallback(async () => {
    router.refresh();
  }, [router]);

  const session: DashboardSessionData | null = admin
    ? {
        id: admin.uid,
        adminId: admin.uid,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        title: admin.title,
        avatarId: admin.avatarId,
        avatar: admin.avatar,
      }
    : null;

  return (
    <PlatformAdminContext.Provider
      value={{
        admin,
        session,
        isLoading,
        dbStatus: 'connected',
        logout: handleLogout,
        refreshSession,
        isAvatarPickerOpen,
        openAvatarPicker,
        closeAvatarPicker,
        updateAvatar: handleUpdateAvatar,
      }}
    >
      {children}
    </PlatformAdminContext.Provider>
  );
};

export const useDashboardAuth = () => {
  const context = useContext(PlatformAdminContext);
  if (!context) {
    throw new Error('useDashboardAuth must be used within a DashboardAuthProvider');
  }
  return context;
};
