import { describe, expect, it } from 'vitest';
import { encodeRoute, decodeRoute } from '@/features/routes/polyline';

describe('route storage', () => {
  it('serializes full route points for private persistence', () => {
    const route = [{ latitude: 1, longitude: 2, timestamp: 1000 }, { latitude: 3, longitude: 4, timestamp: 2000 }];
    expect(decodeRoute(encodeRoute(route))).toEqual(route);
  });
});
