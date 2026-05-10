import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from '@/theme/tokens';

describe('theme tokens', () => {
  it('supports light and dark modes with consistent semantic keys', () => {
    expect(lightTheme.mode).toBe('light');
    expect(darkTheme.mode).toBe('dark');
    expect(Object.keys(lightTheme.colors)).toEqual(Object.keys(darkTheme.colors));
  });
});
