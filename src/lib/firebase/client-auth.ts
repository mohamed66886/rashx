'use client';

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyATjgLeqTCHLD9NQprV4UB09fhPHbbZnR0',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'aya2-a5057.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || 'aya2-a5057',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'aya2-a5057.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '243107940517',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:243107940517:web:9b113315c697baa09c254c',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-CH5T1GVWM3',
};

export const firebaseApp: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(firebaseApp);
