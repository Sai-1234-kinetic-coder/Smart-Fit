import { ChatMessage } from '../types/database.types';

export const SUGGESTED_PROMPTS = [
  'What should I do when energy is low?',
  'Build me a 20 minute reset',
  'Help me sleep better tonight',
  'How do I warm up for a run?',
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'aura',
    text: "I'm here. Tell me how your body and mind feel right now.",
    time: 'Now',
  },
];

export function getAuraResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('energy is low') || q.includes('tired') || q.includes('low energy')) {
    return "Got it. Let's make the next step smaller: five minutes of movement, then a glass of water. I'll stay with you.";
  }
  if (q.includes('type of movement') || q.includes('what movement') || q.includes('should i do now')) {
    return "Start with gentle hip circles and shoulder rolls. No pressure to break a sweat—just remind your joints they can glide.";
  }
  if (q.includes('20 minute reset') || q.includes('20 min') || q.includes('reset')) {
    return "Here is your 20-minute reset: 5 mins gentle spinal roll-downs, 10 mins intuitive mobility flow, and 5 mins box breathing. Start whenever you're ready.";
  }
  if (q.includes('sleep') || q.includes('bed')) {
    return "Dim down blue light, sip chamomile or warm water, and try a 4-7-8 breathing rhythm. Let your jaw unhinge and let the day rest.";
  }
  if (q.includes('warm up') || q.includes('run')) {
    return "Spend 3 minutes on ankle alphabets and high knee marching, then 2 minutes of lunges with thoracic twists. Ready to stride!";
  }

  return `I hear you. Whatever rhythm you bring to the mat or floor today is enough. Let's focus on one steady breath and take the next small step together.`;
}
