import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { TodayData } from '../types/database.types';
import { db, isOnlineMode } from './firebase';

export const INITIAL_TODAY_DATA: TodayData = {
  dateString: new Date().toDateString().toUpperCase(),
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
    greetingName: 'Friend',
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

const LOCAL_STORAGE_KEY = 'aurafit_today_data_v1';

function readLocal(): TodayData {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return INITIAL_TODAY_DATA;
}

function writeLocal(data: TodayData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
}

/**
 * Subscribes to a user's Today data in real time.
 * - Online mode: live Firestore listener, seeds the doc on first sign-in.
 * - Offline/local mode (no uid or Firebase not configured): reads localStorage once.
 * Returns an unsubscribe function.
 */
export function subscribeToTodayData(
  uid: string | null,
  seedProfile: { name?: string | null; avatarText?: string } | undefined,
  callback: (data: TodayData) => void
): Unsubscribe {
  if (!isOnlineMode || !db || !uid) {
    callback(readLocal());
    return () => {};
  }

  const ref = doc(db, 'users', uid);

  // Seed the document the first time this user signs in.
  getDoc(ref).then((snap) => {
    if (!snap.exists()) {
      const seeded: TodayData = {
        ...INITIAL_TODAY_DATA,
        profile: {
          ...INITIAL_TODAY_DATA.profile,
          id: uid,
          name: seedProfile?.name || INITIAL_TODAY_DATA.profile.name,
          greetingName: (seedProfile?.name || 'Friend').split(' ')[0],
          avatarText: seedProfile?.avatarText || INITIAL_TODAY_DATA.profile.avatarText,
        },
      };
      setDoc(ref, seeded).catch((e) => console.warn('Seed write error:', e));
    }
  });

  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) callback(snap.data() as TodayData);
    },
    (err) => console.warn('Today data listener error:', err)
  );
}

export async function saveTodayData(uid: string | null, data: TodayData): Promise<void> {
  if (!isOnlineMode || !db || !uid) {
    writeLocal(data);
    return;
  }
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
  } catch (e) {
    console.warn('Firestore write error:', e);
  }
}

export async function togglePracticeComplete(
  uid: string | null,
  current: TodayData,
  practiceId: string
): Promise<TodayData> {
  const updatedPractices = current.todayPractices.map((p) =>
    p.id === practiceId ? { ...p, completed: !p.completed } : p
  );
  const updated: TodayData = { ...current, todayPractices: updatedPractices };
  await saveTodayData(uid, updated);
  return updated;
}
