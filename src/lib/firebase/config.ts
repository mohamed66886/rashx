/**
 * ============================================================================
 * RashX (راش إكس) | Firebase Database Configuration
 * ============================================================================
 * Connected to Firebase Project: aya2-a5057
 * Configured specifically for Database-driven authentication, Session management,
 * and real-time business documents (POS, Bookings, Clients, Staff)
 * WITHOUT using Firebase Authentication.
 */

export const firebaseConfig = {
  apiKey: "AIzaSyATjgLeqTCHLD9NQprV4UB09fhPHbbZnR0",
  authDomain: "aya2-a5057.firebaseapp.com",
  projectId: "aya2-a5057",
  storageBucket: "aya2-a5057.firebasestorage.app",
  messagingSenderId: "243107940517",
  appId: "1:243107940517:web:9b113315c697baa09c254c",
  measurementId: "G-CH5T1GVWM3",
};

export const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

