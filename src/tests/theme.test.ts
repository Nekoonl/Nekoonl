import { describe, it } from 'node:test';
import { deepEqual, equal, ok } from 'node:assert/strict';
import { darkTheme, lightTheme } from '@/theme/tokens';

describe('theme tokens', () => {
  it('supports light and dark modes with consistent semantic keys', () => {
    equal(lightTheme.mode, 'light');
    equal(darkTheme.mode, 'dark');
    deepEqual(Object.keys(lightTheme.colors), Object.keys(darkTheme.colors));
  });
});
