import * as Location from 'expo-location';
import type { RoutePoint } from '@/types/domain';

export async function requestRunLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
}

export function toRoutePoint(location: Location.LocationObject): RoutePoint {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    timestamp: location.timestamp,
    altitude: location.coords.altitude,
    accuracy: location.coords.accuracy
  };
}

export async function getCurrentRoutePoint(): Promise<RoutePoint | null> {
  const granted = await requestRunLocationPermission();
  if (!granted) return null;
  const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  return toRoutePoint(location);
}
