import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, isOnlineMode } from './firebase';

export type { User };

export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  if (!isOnlineMode || !auth) {
    // Local-only mode: no real user, callback fires once with null.
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle(): Promise<User | null> {
  if (!isOnlineMode || !auth) {
    throw new Error(
      'Sign-in is unavailable: Firebase is not configured. Add your keys to .env first.'
    );
  }
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  if (!isOnlineMode || !auth) return;
  await firebaseSignOut(auth);
}
