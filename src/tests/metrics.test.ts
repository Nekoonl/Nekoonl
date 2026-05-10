import { describe, expect, it } from 'vitest';
import { buildRunMetrics, calculateAveragePaceSecondsPerKm, estimateCalories } from '@/features/runs/metrics';
import type { RoutePoint } from '@/types/domain';

describe('run metrics', () => {
  it('calculates pace defensively', () => {
    expect(calculateAveragePaceSecondsPerKm(0, 100)).toBeNull();
    expect(calculateAveragePaceSecondsPerKm(2000, 720)).toBe(360);
  });

  it('marks calories as estimated and requires weight', () => {
    expect(estimateCalories(5000, null)).toBeNull();
    expect(estimateCalories(5000, 70)).toBe(363);
  });

  it('builds metrics from a run draft', () => {
    const points: RoutePoint[] = [
      { latitude: 0, longitude: 0, timestamp: 1 },
      { latitude: 0, longitude: 0.01, timestamp: 2 }
    ];
    const metrics = buildRunMetrics({ userId: 'user', startedAt: new Date('2026-05-09T10:00:00Z'), endedAt: new Date('2026-05-09T10:10:00Z'), points, weightKg: 70 });
    expect(metrics.durationSeconds).toBe(600);
    expect(metrics.distanceMeters).toBeGreaterThan(1000);
    expect(metrics.estimatedCalories).toBeGreaterThan(70);
  });
});
