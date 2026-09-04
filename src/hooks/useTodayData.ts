import { useState, useEffect } from 'react';
import { TodayData } from '../types/database.types';
import { getTodayData, saveTodayData, togglePracticeComplete } from '../lib/activityService';

export function useTodayData() {
  const [data, setData] = useState<TodayData>(getTodayData);

  useEffect(() => {
    setData(getTodayData());
  }, []);

  const handleTogglePractice = (id: string) => {
    const updated = togglePracticeComplete(id);
    setData(updated);
  };

  const updateSignals = (newSignals: Partial<TodayData['signals']>) => {
    const updated: TodayData = {
      ...data,
      signals: {
        ...data.signals,
        ...newSignals,
      },
    };
    saveTodayData(updated);
    setData(updated);
  };

  return {
    todayData: data,
    togglePractice: handleTogglePractice,
    updateSignals,
  };
}
