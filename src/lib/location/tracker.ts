import type { RoutePoint } from '@/types/domain';

export interface LocationPermissionResult {
  granted: boolean;
  reason?: string;
}

export async function requestRunLocationPermission(): Promise<LocationPermissionResult> {
  return {
    granted: false,
    reason: 'Location runtime is intentionally deferred for the next GPS implementation phase.'
  };
}

export function toRoutePoint(location: { timestamp: number; coords: { latitude: number; longitude: number; altitude?: number | null; accuracy?: number | null } }): RoutePoint {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    timestamp: location.timestamp,
    altitude: location.coords.altitude,
    accuracy: location.coords.accuracy
  };
}

export async function getCurrentRoutePoint(): Promise<RoutePoint | null> {
  return null;
}
