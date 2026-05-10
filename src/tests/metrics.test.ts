import { describe, it } from 'node:test';
import { deepEqual, equal, ok } from 'node:assert/strict';
import { buildRunMetrics, calculateAveragePaceSecondsPerKm, estimateCalories } from '@/features/runs/metrics';
import type { RoutePoint } from '@/types/domain';

describe('run metrics', () => {
  it('calculates pace defensively', () => {
    equal(calculateAveragePaceSecondsPerKm(0, 100), null);
    equal(calculateAveragePaceSecondsPerKm(2000, 720), 360);
  });

  it('marks calories as estimated and requires weight', () => {
    equal(estimateCalories(5000, null), null);
    equal(estimateCalories(5000, 70), 363);
  });

  it('builds metrics from a run draft', () => {
    const points: RoutePoint[] = [
      { latitude: 0, longitude: 0, timestamp: 1 },
      { latitude: 0, longitude: 0.01, timestamp: 2 }
    ];
    const metrics = buildRunMetrics({ userId: 'user', startedAt: new Date('2026-05-09T10:00:00Z'), endedAt: new Date('2026-05-09T10:10:00Z'), points, weightKg: 70 });
    equal(metrics.durationSeconds, 600);
    ok(metrics.distanceMeters > 1000);
    ok((metrics.estimatedCalories ?? 0) > 70);
  });
});
