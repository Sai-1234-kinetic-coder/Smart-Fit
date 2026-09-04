// Real Firebase client initialization.
// Fill in your project's keys in a `.env` file (see `.env.example`).
// If keys are missing, the app falls back to local-only mode so `npm run dev`
// still works before you've set up a Firebase project.
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isOnlineMode = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain
);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isOnlineMode) {
  try {
    app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    console.info('AuraFit: Connected to Firebase services.');
  } catch (err) {
    console.warn('AuraFit: Firebase init failed, falling back to local mode', err);
  }
} else {
  console.warn(
    'AuraFit: No Firebase config found — running in local-only (offline) mode. ' +
    'Copy .env.example to .env and add your Firebase project keys to enable sign-in and sync.'
  );
}

export const auth = authInstance;
export const db = dbInstance;
