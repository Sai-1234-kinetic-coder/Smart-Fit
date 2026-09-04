import { TodayData, MovementLogItem } from '../types/database.types';

const INITIAL_TODAY_DATA: TodayData = {
  dateString: 'THURSDAY, 14 MARCH 2024',
  auraScore: 842,
  auraScoreMax: 1000,
  auraScoreDelta: '+2.8 from last week',
  recoveryState: 'IN_RHYTHM',
  guidanceText: 'Your body is asking for steady strength today. Start small and let momentum do the rest.',
  weeklyProgressPercent: 74,
  weekDaysStatus: [
    { day: 'S', active: true },
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: false },
    { day: 'S', active: false },
  ],
  profile: {
    id: 'user_alex',
    name: 'Alex Morgan',
    greetingName: 'Mouli',
    avatarText: 'AM',
    memberSince: 'March 2024',
    level: 7,
    auraScore: 842,
    auraScoreDelta: '+2.8 from last week',
    auraPoints: 1294,
    pointsToNextLevel: 384,
    streakDays: 12,
    consistencyRate: 82,
    strengthSessionsTotal: 18,
    mindPracticeTotal: '3h 42m',
    recoveryQuality: 'Good',
  },
  todayPractices: [
    {
      id: 'p1',
      title: 'Mobility flow',
      subtitle: 'Hips, shoulders & spine',
      durationMinutes: 18,
      type: 'mobility',
      completed: false,
      accentColor: '#4E7A66',
    },
    {
      id: 'p2',
      title: 'Box breathing',
      subtitle: 'Reset your nervous system',
      durationMinutes: 4,
      type: 'breathing',
      completed: false,
      accentColor: '#D75A30',
    },
    {
      id: 'p3',
      title: 'Daily chess puzzle',
      subtitle: 'Sharpen your pattern sense',
      durationMinutes: 10,
      type: 'chess',
      completed: false,
      accentColor: '#E5A83B',
    },
  ],
  nextSession: {
    chapter: 'CHAPTER 2',
    title: 'Strong foundations',
    durationMinutes: 32,
    impactLevel: 'low impact',
    equipment: 'no equipment',
  },
  signals: {
    bodyReadiness: 84,
    bodyReadinessTrend: '+6 this week',
    mindfulMinutes: 126,
    mindfulMinutesTrend: '+24 this week',
    waterCurrentLiters: 1.8,
    waterGoalLiters: 2.4,
    chessRating: 1248,
    chessRatingTrend: '+48 this month',
  },
  recentMovements: [
    {
      id: 'm1',
      title: 'Mobility & Hip Opener',
      status: 'COMPLETED',
      timeAgo: '42 MIN AGO',
    },
    {
      id: 'm2',
      title: 'Chest & Arms Alignment',
      status: 'ACTIVE',
      timeAgo: 'YESTERDAY',
    },
  ],
};

const STORAGE_KEY = 'aurafit_today_data_v1';

export function getTodayData(): TodayData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return INITIAL_TODAY_DATA;
}

export function saveTodayData(data: TodayData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
}

export function togglePracticeComplete(id: string): TodayData {
  const current = getTodayData();
  const updatedPractices = current.todayPractices.map((p) =>
    p.id === id ? { ...p, completed: !p.completed } : p
  );
  const updated: TodayData = {
    ...current,
    todayPractices: updatedPractices,
  };
  saveTodayData(updated);
  return updated;
}
