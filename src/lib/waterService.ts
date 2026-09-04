const WATER_STORAGE_KEY = 'aurafit_water_intake';

export interface WaterState {
  currentGlasses: number;
  maxGlasses: number;
  nextReminderMinutes: number;
}

export function getWaterState(): WaterState {
  try {
    const saved = localStorage.getItem(WATER_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return {
    currentGlasses: 4,
    maxGlasses: 8,
    nextReminderMinutes: 42,
  };
}

export function updateGlassesCount(count: number): WaterState {
  const updated: WaterState = {
    currentGlasses: Math.max(0, Math.min(8, count)),
    maxGlasses: 8,
    nextReminderMinutes: 45,
  };
  try {
    localStorage.setItem(WATER_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}
