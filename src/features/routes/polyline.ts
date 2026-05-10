import type { RoutePoint } from '@/types/domain';

export function encodeRoute(points: RoutePoint[]): string {
  return JSON.stringify(points.map(({ latitude, longitude, timestamp }) => [latitude, longitude, timestamp]));
}

export function decodeRoute(polyline: string): RoutePoint[] {
  const parsed = JSON.parse(polyline) as [number, number, number][];
  return parsed.map(([latitude, longitude, timestamp]) => ({ latitude, longitude, timestamp }));
}

export function routeBounds(points: RoutePoint[]) {
  if (points.length === 0) return null;
  return points.reduce(
    (bounds, point) => ({
      minLat: Math.min(bounds.minLat, point.latitude),
      maxLat: Math.max(bounds.maxLat, point.latitude),
      minLng: Math.min(bounds.minLng, point.longitude),
      maxLng: Math.max(bounds.maxLng, point.longitude)
    }),
    { minLat: points[0].latitude, maxLat: points[0].latitude, minLng: points[0].longitude, maxLng: points[0].longitude }
  );
}
