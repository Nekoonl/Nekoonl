import { describe, it } from 'node:test';
import { deepEqual, equal, ok } from 'node:assert/strict';
import { encodeRoute, decodeRoute } from '@/features/routes/polyline';

describe('route storage', () => {
  it('serializes full route points for private persistence', () => {
    const route = [{ latitude: 1, longitude: 2, timestamp: 1000 }, { latitude: 3, longitude: 4, timestamp: 2000 }];
    deepEqual(decodeRoute(encodeRoute(route)), route);
  });
});
