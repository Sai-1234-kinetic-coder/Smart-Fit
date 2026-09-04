import { TrainerGoal } from '../types/database.types';

export const INITIAL_GOALS: TrainerGoal[] = [
  { id: 'strength', title: 'Build strength', selected: true },
  { id: 'mobility', title: 'Move without tension', selected: false },
  { id: 'energy', title: 'Feel more energized', selected: false },
  { id: 'sport', title: 'Train for a sport', selected: false },
];

export interface BMIData {
  bmi: number;
  category: 'Underweight' | 'Normal range' | 'Elevated' | 'High';
  note: string;
}

export function calculateBMI(weightKg: number, heightCm: number): BMIData {
  const heightM = heightCm / 100;
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  let category: BMIData['category'] = 'Normal range';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 18.5 && bmi < 24.9) category = 'Normal range';
  else if (bmi >= 25 && bmi < 29.9) category = 'Elevated';
  else category = 'High';

  return {
    bmi: Number.isFinite(bmi) ? bmi : 22.4,
    category,
    note: 'Aura keeps the conversation about capability, not a number.',
  };
}
