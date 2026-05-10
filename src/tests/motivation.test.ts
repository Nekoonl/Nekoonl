import { describe, expect, it } from 'vitest';
import { isUnsafeMotivationCopy, safetyAdjustedMotivationLevel } from '@/features/motivation/motivationMessages';

describe('motivation safety', () => {
  it('downgrades level 3 after repeated missed days', () => {
    expect(safetyAdjustedMotivationLevel(3, 3)).toBe(1);
    expect(safetyAdjustedMotivationLevel(2, 3)).toBe(2);
  });

  it('detects banned destructive copy', () => {
    expect(isUnsafeMotivationCopy('Eres un perdedor')).toBe(true);
    expect(isUnsafeMotivationCopy('No excuses. Lace up.')).toBe(false);
  });
});
