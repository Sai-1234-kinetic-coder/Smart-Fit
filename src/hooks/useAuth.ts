import { useEffect, useState } from 'react';
import { subscribeToAuth, User } from '../lib/authService';
import { isOnlineMode } from '../lib/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isOnlineMode: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => {
      setUser(u);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading, isOnlineMode };
}
