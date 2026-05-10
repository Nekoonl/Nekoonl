import { describe, it } from 'node:test';
import { deepEqual, equal, ok } from 'node:assert/strict';
import { isUnsafeMotivationCopy, safetyAdjustedMotivationLevel } from '@/features/motivation/motivationMessages';

describe('motivation safety', () => {
  it('downgrades level 3 after repeated missed days', () => {
    equal(safetyAdjustedMotivationLevel(3, 3), 1);
    equal(safetyAdjustedMotivationLevel(2, 3), 2);
  });

  it('detects banned destructive copy', () => {
    equal(isUnsafeMotivationCopy('Eres un perdedor'), true);
    equal(isUnsafeMotivationCopy('No excuses. Lace up.'), false);
  });
});
