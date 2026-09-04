export type RecoveryState = 'RECOVERY' | 'IN_RHYTHM' | 'PEAK_SIGNAL';

export interface UserProfile {
  id: string;
  name: string;
  greetingName: string;
  avatarText: string;
  memberSince: string;
  level: number;
  auraScore: number;
  auraScoreDelta: string;
  auraPoints: number;
  pointsToNextLevel: number;
  streakDays: number;
  consistencyRate: number;
  strengthSessionsTotal: number;
  mindPracticeTotal: string;
  recoveryQuality: string;
}

export interface TodayPracticeItem {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  type: 'mobility' | 'breathing' | 'chess';
  completed: boolean;
  accentColor?: string;
}

export interface ComingUpSession {
  chapter: string;
  title: string;
  durationMinutes: number;
  impactLevel: string;
  equipment: string;
}

export interface TodaySignals {
  bodyReadiness: number;
  bodyReadinessTrend: string;
  mindfulMinutes: number;
  mindfulMinutesTrend: string;
  waterCurrentLiters: number;
  waterGoalLiters: number;
  chessRating: number;
  chessRatingTrend: string;
}

export interface MovementLogItem {
  id: string;
  title: string;
  status: 'COMPLETED' | 'ACTIVE';
  timeAgo: string;
}

export interface TodayData {
  profile: UserProfile;
  dateString: string;
  auraScore: number;
  auraScoreMax: number;
  auraScoreDelta: string;
  recoveryState: RecoveryState;
  guidanceText: string;
  weeklyProgressPercent: number;
  weekDaysStatus: { day: string; active: boolean }[];
  todayPractices: TodayPracticeItem[];
  nextSession: ComingUpSession;
  signals: TodaySignals;
  recentMovements: MovementLogItem[];
}

export interface TrainerGoal {
  id: string;
  title: string;
  selected: boolean;
}

export interface ChessBoardSquare {
  row: number;
  col: number;
  piece?: string; // e.g. 'R', 'P', 'N', 'K', 'Q', 'B' or lowercase
  isTarget?: boolean;
  isSelected?: boolean;
}

export interface LeaderboardEntry {
  rank: string;
  initials: string;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'aura' | 'user';
  text: string;
  time: string;
}
