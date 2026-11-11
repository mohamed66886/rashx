/**
 * ============================================================================
 * RashX (راش إكس) | Firebase Main Module
 * ============================================================================
 * Exports database operations, session management, and configuration.
 */

export * from './config';
export * from './firestore';
export * from './auth-db';

import { firebaseConfig } from './config';

/**
 * Compatibility helper matching standard Firebase Web SDK signature
 */
export function initializeApp(config = firebaseConfig) {
  return {
    name: '[DEFAULT]',
    options: config,
    automaticDataCollectionEnabled: true,
  };
}

export function getFirestore(app?: any) {
  return {
    app: app || initializeApp(),
    type: 'firestore-rest-client',
  };
}

export function getAnalytics(app?: any) {
  return {
    app: app || initializeApp(),
    logEvent: (name: string, params?: Record<string, any>) => {
      if (typeof window !== 'undefined') {
        console.log(`[Firebase Analytics Simulator] ${name}`, params);
      }
    },
  };
}

