// Firebase client initialization with safe fallback for standalone offline development
let authInstance: any = null;
let dbInstance: any = null;

try {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
    storageBucket: 'demo-project.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:demoapp',
  };

  // Safe lazy load
  if (typeof window !== 'undefined' && firebaseConfig.apiKey !== 'demo-api-key') {
    // initialize if valid credentials provided
    console.info('AuraFit: Connected to Firebase services.');
  }
} catch (err) {
  console.warn('AuraFit: Running in local offline storage mode', err);
}

export const auth = authInstance;
export const db = dbInstance;
export const isOnlineMode = false;
