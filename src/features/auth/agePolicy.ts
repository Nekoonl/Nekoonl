import type { MotivationLevel } from '@/types/domain';

export type AgeBand = 'under_13' | 'teen' | 'adult';

export function calculateAge(dateOfBirth: string, now: Date = new Date()): number {
  const birthDate = new Date(`${dateOfBirth}T00:00:00.000Z`);
  if (Number.isNaN(birthDate.getTime())) throw new Error('Invalid date of birth');
  let age = now.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDiff = now.getUTCMonth() - birthDate.getUTCMonth();
  const dayDiff = now.getUTCDate() - birthDate.getUTCDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
  return age;
}

export function getAgeBand(dateOfBirth: string, now: Date = new Date()): AgeBand {
  const age = calculateAge(dateOfBirth, now);
  if (age < 13) return 'under_13';
  if (age < 18) return 'teen';
  return 'adult';
}

export function allowedMotivationLevels(dateOfBirth: string, now: Date = new Date()): MotivationLevel[] {
  const band = getAgeBand(dateOfBirth, now);
  if (band === 'under_13') return [1];
  if (band === 'teen') return [1, 2];
  return [1, 2, 3];
}

export function canUseMotivationLevel(
  dateOfBirth: string,
  level: MotivationLevel,
  acceptedRoastTerms: boolean,
  now: Date = new Date()
): boolean {
  if (!allowedMotivationLevels(dateOfBirth, now).includes(level)) return false;
  if (level === 3) return acceptedRoastTerms;
  return true;
}

export function normalizeMotivationLevel(
  dateOfBirth: string,
  requestedLevel: MotivationLevel,
  acceptedRoastTerms: boolean,
  now: Date = new Date()
): MotivationLevel {
  if (canUseMotivationLevel(dateOfBirth, requestedLevel, acceptedRoastTerms, now)) return requestedLevel;
  const allowed = allowedMotivationLevels(dateOfBirth, now);
  return allowed[allowed.length - 1] ?? 1;
}
