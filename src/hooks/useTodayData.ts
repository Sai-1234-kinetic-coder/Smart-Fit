import { useState, useEffect, useCallback } from 'react';
import { TodayData } from '../types/database.types';
import {
  INITIAL_TODAY_DATA,
  subscribeToTodayData,
  saveTodayData,
  togglePracticeComplete,
} from '../lib/activityService';

interface Options {
  uid: string | null;
  displayName?: string | null;
  avatarText?: string;
}

export function useTodayData({ uid, displayName, avatarText }: Options) {
  const [data, setData] = useState<TodayData>(INITIAL_TODAY_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToTodayData(
      uid,
      { name: displayName, avatarText },
      (nextData) => {
        setData(nextData);
        setIsLoading(false);
      }
    );
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const handleTogglePractice = useCallback(
    async (id: string) => {
      const updated = await togglePracticeComplete(uid, data, id);
      setData(updated);
    },
    [uid, data]
  );

  const updateSignals = useCallback(
    async (newSignals: Partial<TodayData['signals']>) => {
      const updated: TodayData = {
        ...data,
        signals: { ...data.signals, ...newSignals },
      };
      setData(updated);
      await saveTodayData(uid, updated);
    },
    [uid, data]
  );

  return {
    todayData: data,
    isLoading,
    togglePractice: handleTogglePractice,
    updateSignals,
  };
}
