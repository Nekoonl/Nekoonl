import type { RoutePoint, RunDraft } from '@/types/domain';

const EARTH_RADIUS_METERS = 6371000;

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

export function distanceBetweenMeters(a: RoutePoint, b: RoutePoint): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h));
}

export function calculateDistanceMeters(points: RoutePoint[]): number {
  return points.slice(1).reduce((total, point, index) => total + distanceBetweenMeters(points[index], point), 0);
}

export function calculateDurationSeconds(startedAt: Date, endedAt: Date): number {
  return Math.max(0, Math.round((endedAt.getTime() - startedAt.getTime()) / 1000));
}

export function calculateAveragePaceSecondsPerKm(distanceMeters: number, durationSeconds: number): number | null {
  if (distanceMeters < 1 || durationSeconds < 1) return null;
  return Math.round(durationSeconds / (distanceMeters / 1000));
}

export function estimateCalories(distanceMeters: number, weightKg?: number | null): number | null {
  if (!weightKg || weightKg <= 0 || distanceMeters <= 0) return null;
  return Math.round(weightKg * (distanceMeters / 1000) * 1.036);
}

export function buildRunMetrics(draft: RunDraft) {
  const distanceMeters = Math.round(calculateDistanceMeters(draft.points));
  const durationSeconds = calculateDurationSeconds(draft.startedAt, draft.endedAt);
  return {
    durationSeconds,
    distanceMeters,
    avgPaceSecondsPerKm: calculateAveragePaceSecondsPerKm(distanceMeters, durationSeconds),
    estimatedCalories: estimateCalories(distanceMeters, draft.weightKg)
  };
}
