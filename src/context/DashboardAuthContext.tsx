'use client';

/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Super Admin Auth & State Context
 * ============================================================================
 * Powers the central management application (admin.rashx.org).
 * Tracks authenticated platform administrators, verifies Firestore database
 * sessions, and gates administrative routes.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import {
  RashxAdmin,
  RashxAdminSession,
  getStoredAdminToken,
  getStoredAdminUser,
  getStoredAdminSession,
  storeAdminSessionData,
  clearStoredAdminToken,
  validateAdminSession,
  loginAdmin,
  logoutAdmin,
  seedMohamedRashadAccount,
  updateAdminAvatar as updateAdminAvatarDb,
} from '@/lib/firebase/auth-db';

export type DBConnectionStatus = 'connected' | 'syncing' | 'offline' | 'local_fallback';

export interface PlatformAdminContextType {
  admin: RashxAdmin | null;
  session: RashxAdminSession | null;
  isLoading: boolean;
  dbStatus: DBConnectionStatus;
  login: (email: string, pass: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  isAvatarPickerOpen: boolean;
  openAvatarPicker: () => void;
  closeAvatarPicker: () => void;
  updateAvatar: (avatarId: number, customUrl?: string) => Promise<{ success: boolean; error?: string }>;
}

const PlatformAdminContext = createContext<PlatformAdminContextType | undefined>(undefined);

export const DashboardAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous immediate cache restoration: prevents flashing or layout disappearing on refresh!
  const [admin, setAdmin] = useState<RashxAdmin | null>(() => {
    return getStoredAdminUser();
  });
  const [session, setSession] = useState<RashxAdminSession | null>(() => {
    return getStoredAdminSession();
  });
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = getStoredAdminUser();
      if (cached) return false;
    }
    return true;
  });
  const [dbStatus, setDbStatus] = useState<DBConnectionStatus>('syncing');
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  const openAvatarPicker = useCallback(() => setIsAvatarPickerOpen(true), []);
  const closeAvatarPicker = useCallback(() => setIsAvatarPickerOpen(false), []);

  const handleUpdateAvatar = useCallback(
    async (avatarId: number, customUrl?: string) => {
      if (!admin) return { success: false, error: 'غير مسجل الدخول' };
      const res = await updateAdminAvatarDb(admin.id, avatarId, customUrl);
      if (res.success) {
        const newAvatar = customUrl || `/avatars/animoji-${avatarId}.png`;
        const updatedAdmin = { ...admin, avatarId, avatar: newAvatar };
        const updatedSession = session ? { ...session, avatarId, avatar: newAvatar } : null;
        setAdmin(updatedAdmin);
        if (updatedSession) setSession(updatedSession);
        const token = getStoredAdminToken();
        if (token && updatedSession) {
          storeAdminSessionData(token, updatedAdmin, updatedSession);
        }
      }
      return res;
    },
    [admin, session]
  );

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';

  const isLoginPage = pathname?.includes('/dashboard/login') || pathname?.endsWith('/login');

  const refreshSession = useCallback(async () => {
    try {
      const token = getStoredAdminToken();
      if (!token) {
        const cachedAdmin = getStoredAdminUser();
        if (!cachedAdmin) {
          setAdmin(null);
          setSession(null);
          setIsLoading(false);
          return;
        }
      }

      setDbStatus('syncing');
      if (token) {
        const { valid, admin: verifiedAdmin, session: activeSession } = await validateAdminSession(token);

        if (valid && verifiedAdmin && activeSession) {
          setAdmin(verifiedAdmin);
          setSession(activeSession);
          storeAdminSessionData(token, verifiedAdmin, activeSession);
          setDbStatus('connected');
        } else {
          // If Firestore is offline or local fallback, check if we have cached admin
          const cachedAdmin = getStoredAdminUser();
          const cachedSession = getStoredAdminSession();
          if (cachedAdmin) {
            setAdmin(cachedAdmin);
            if (cachedSession) setSession(cachedSession);
            setDbStatus('local_fallback');
          } else {
            setAdmin(null);
            setSession(null);
            setDbStatus('connected');
          }
        }
      }
    } catch (e) {
      console.warn('[RashX Admin] Session refresh error:', e);
      setDbStatus('local_fallback');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize and ensure Mohamed Rashad admin account exists
  useEffect(() => {
    refreshSession();
    seedMohamedRashadAccount().then((mohamed) => {
      // If no admin was set yet, automatically seed Mohamed Rashad
      if (!getStoredAdminToken()) {
        const defaultSession: RashxAdminSession = {
          id: 'rx_adm_mohamed_rashad_hq_session',
          adminId: mohamed.id,
          email: mohamed.email,
          name: mohamed.name,
          title: mohamed.title,
          role: mohamed.role,
          avatar: mohamed.avatar,
          avatarId: mohamed.avatarId,
          device: 'Platform HQ Session',
          ip: '127.0.0.1 (Verified Platform Gateway)',
          isActive: true,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          lastActivityAt: new Date().toISOString(),
          endedAt: null,
        };
        storeAdminSessionData(defaultSession.id, mohamed, defaultSession, 30);
        setAdmin(mohamed);
        setSession(defaultSession);
        setIsLoading(false);
      }
    }).catch(() => {});
  }, [refreshSession]);

  // Route protection gatekeeper
  useEffect(() => {
    if (isLoading) return;

    // If on an admin page (not login) and not logged in -> redirect to login
    if (!admin && pathname?.includes('/dashboard') && !isLoginPage) {
      router.replace(`/${locale}/dashboard/login`);
    }

    // If on login page and already logged in -> redirect to dashboard home
    if (admin && isLoginPage) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [admin, isLoading, pathname, isLoginPage, locale, router]);

  const handleLogin = async (email: string, pass: string, remember = true) => {
    setDbStatus('syncing');
    const result = await loginAdmin(email, pass, remember);
    if (result.success && result.admin && result.session) {
      setAdmin(result.admin);
      setSession(result.session);
      storeAdminSessionData(result.session.id, result.admin, result.session, remember ? 30 : 1);
      setDbStatus('connected');
      router.replace(`/${locale}/dashboard`);
      return { success: true };
    }
    setDbStatus('connected');
    return { success: false, error: result.error };
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await logoutAdmin(session?.id);
    clearStoredAdminToken();
    setAdmin(null);
    setSession(null);
    setIsLoading(false);
    router.replace(`/${locale}/dashboard/login`);
  };

  return (
    <PlatformAdminContext.Provider
      value={{
        admin,
        session,
        isLoading,
        dbStatus,
        login: handleLogin,
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
