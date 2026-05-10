import { describe, it } from 'node:test';
import { deepEqual, equal, ok } from 'node:assert/strict';
import { allowedMotivationLevels, calculateAge, canUseMotivationLevel, normalizeMotivationLevel } from '@/features/auth/agePolicy';

describe('age policy', () => {
  const now = new Date('2026-05-09T12:00:00.000Z');

  it('calculates age from date of birth', () => {
    equal(calculateAge('2008-05-10', now), 17);
    equal(calculateAge('2008-05-09', now), 18);
  });

  it('limits motivation levels for minors', () => {
    deepEqual(allowedMotivationLevels('2015-01-01', now), [1]);
    deepEqual(allowedMotivationLevels('2010-01-01', now), [1, 2]);
    deepEqual(allowedMotivationLevels('1990-01-01', now), [1, 2, 3]);
  });

  it('blocks level 3 for minors and without explicit terms', () => {
    equal(canUseMotivationLevel('2010-01-01', 3, true, now), false);
    equal(canUseMotivationLevel('1990-01-01', 3, false, now), false);
    equal(canUseMotivationLevel('1990-01-01', 3, true, now), true);
  });

  it('normalizes unsafe requested levels to the strongest allowed safe level', () => {
    equal(normalizeMotivationLevel('2015-01-01', 3, true, now), 1);
    equal(normalizeMotivationLevel('2010-01-01', 3, true, now), 2);
  });
});
