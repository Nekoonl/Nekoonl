import { describe, expect, it } from 'vitest';
import { allowedMotivationLevels, calculateAge, canUseMotivationLevel, normalizeMotivationLevel } from '@/features/auth/agePolicy';

describe('age policy', () => {
  const now = new Date('2026-05-09T12:00:00.000Z');

  it('calculates age from date of birth', () => {
    expect(calculateAge('2008-05-10', now)).toBe(17);
    expect(calculateAge('2008-05-09', now)).toBe(18);
  });

  it('limits motivation levels for minors', () => {
    expect(allowedMotivationLevels('2015-01-01', now)).toEqual([1]);
    expect(allowedMotivationLevels('2010-01-01', now)).toEqual([1, 2]);
    expect(allowedMotivationLevels('1990-01-01', now)).toEqual([1, 2, 3]);
  });

  it('blocks level 3 for minors and without explicit terms', () => {
    expect(canUseMotivationLevel('2010-01-01', 3, true, now)).toBe(false);
    expect(canUseMotivationLevel('1990-01-01', 3, false, now)).toBe(false);
    expect(canUseMotivationLevel('1990-01-01', 3, true, now)).toBe(true);
  });

  it('normalizes unsafe requested levels to the strongest allowed safe level', () => {
    expect(normalizeMotivationLevel('2015-01-01', 3, true, now)).toBe(1);
    expect(normalizeMotivationLevel('2010-01-01', 3, true, now)).toBe(2);
  });
});
