export interface WellnessCarryItem {
  id: string;
  title: string;
  subtitle: string;
  selected: boolean;
}

export const INITIAL_WELLNESS_CARRIES: WellnessCarryItem[] = [
  {
    id: 'plate',
    title: 'Plate color',
    subtitle: 'Add one bright thing to your next meal',
    selected: false,
  },
  {
    id: 'outside',
    title: 'Outside time',
    subtitle: 'Seven minutes is still a reset',
    selected: false,
  },
  {
    id: 'sleep',
    title: 'Sleep landing',
    subtitle: 'Dim the last hour before bed',
    selected: false,
  },
];

export interface MindMenuItem {
  id: string;
  title: string;
  meta: string;
  description: string;
  durationSeconds: number;
}

export const MIND_MENU: MindMenuItem[] = [
  {
    id: 'unclench',
    title: 'Unclench',
    meta: '3 min · body scan',
    description: 'Release tension in jaw, shoulders, and brow.',
    durationSeconds: 180,
  },
  {
    id: 'clear',
    title: 'Clear the noise',
    meta: '4 min · focus',
    description: 'Anchor on cadence breaths to quiet mental chatter.',
    durationSeconds: 240,
  },
  {
    id: 'mudra',
    title: 'Mudra for grounding',
    meta: '4 min · hands + breath',
    description: 'Connect thumb and index finger to restore center.',
    durationSeconds: 240,
  },
];
