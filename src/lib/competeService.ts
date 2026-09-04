import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { LeaderboardEntry } from '../types/database.types';
import { db, isOnlineMode } from './firebase';

export interface CompeteData {
  seasonText: string;
  seasonDays: number;
  points: number;
  rankThisWeek: string;
  badgesCount: string;
  nextUnlockTitle: string;
  nextUnlockSubtitle: string;
  badgeClaimed: boolean;
}

export const INITIAL_COMPETE_DATA: CompeteData = {
  seasonText: '12 days in rhythm.',
  seasonDays: 12,
  points: 428,
  rankThisWeek: '#—',
  badgesCount: '04',
  nextUnlockTitle: 'Steady mind',
  nextUnlockSubtitle: '2 practices to go',
  badgeClaimed: false,
};

const LOCAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: '01', initials: 'MC', name: 'Maya Chen', points: 612, isCurrentUser: false },
  { rank: '02', initials: 'JB', name: 'Jon Bell', points: 588, isCurrentUser: false },
  { rank: '03', initials: 'YOU', name: 'You', points: 428, isCurrentUser: true },
  { rank: '04', initials: 'NO', name: 'Nia Okafor', points: 417, isCurrentUser: false },
];

/**
 * Live leaderboard for the whole friend group. Every signed-in user's points
 * live in a shared `leaderboard` Firestore collection (one doc per uid), and
 * everyone subscribes to the same query — so a point change on one phone
 * shows up on everyone else's screen within moments.
 */
export function subscribeToLeaderboard(
  uid: string | null,
  callback: (entries: LeaderboardEntry[]) => void
): Unsubscribe {
  if (!isOnlineMode || !db) {
    callback(LOCAL_LEADERBOARD);
    return () => {};
  }

  const q = query(collection(db, 'leaderboard'), orderBy('points', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const entries: LeaderboardEntry[] = snap.docs.map((d, idx) => {
        const data = d.data() as Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>;
        return {
          rank: String(idx + 1).padStart(2, '0'),
          initials: data.initials,
          name: data.name,
          points: data.points,
          isCurrentUser: d.id === uid,
        };
      });
      callback(entries);
    },
    (err) => console.warn('Leaderboard listener error:', err)
  );
}

export async function upsertLeaderboardEntry(
  uid: string,
  entry: { name: string; initials: string; points: number }
): Promise<void> {
  if (!isOnlineMode || !db) return;
  try {
    await setDoc(doc(db, 'leaderboard', uid), entry, { merge: true });
  } catch (e) {
    console.warn('Leaderboard write error:', e);
  }
}
