import { LeaderboardEntry } from '../types/database.types';

export interface CompeteData {
  seasonText: string;
  seasonDays: number;
  points: number;
  rankThisWeek: string;
  badgesCount: string;
  nextUnlockTitle: string;
  nextUnlockSubtitle: string;
  badgeClaimed: boolean;
  leaderboard: LeaderboardEntry[];
}

export const INITIAL_COMPETE_DATA: CompeteData = {
  seasonText: '12 days in rhythm.',
  seasonDays: 12,
  points: 428,
  rankThisWeek: '#08',
  badgesCount: '04',
  nextUnlockTitle: 'Steady mind',
  nextUnlockSubtitle: '2 practices to go',
  badgeClaimed: false,
  leaderboard: [
    { rank: '01', initials: 'MC', name: 'Maya Chen', points: 612, isCurrentUser: false },
    { rank: '02', initials: 'JB', name: 'Jon Bell', points: 588, isCurrentUser: false },
    { rank: '03', initials: 'YOU', name: 'You · Alex', points: 428, isCurrentUser: true },
    { rank: '05', initials: 'NO', name: 'Nia Okafor', points: 417, isCurrentUser: false },
  ],
};
