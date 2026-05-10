export type MotivationLevel = 1 | 2 | 3;
export type ThemePreference = 'system' | 'light' | 'dark';
export type RunningGoal = 'distance' | 'time' | 'frequency';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  date_of_birth: string;
  weight_kg: number | null;
  running_goal: RunningGoal;
  motivation_level: MotivationLevel;
  theme_preference: ThemePreference;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number | null;
  accuracy?: number | null;
}

export interface RunRoute {
  id: string;
  user_id: string;
  name: string | null;
  polyline: string;
  start_lat: number;
  start_lng: number;
  end_lat: number;
  end_lng: number;
  is_private: boolean;
  created_at: string;
}

export interface RunRecord {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  distance_meters: number;
  avg_pace_seconds_per_km: number | null;
  estimated_calories: number | null;
  avg_heart_rate: number | null;
  route_id: string | null;
  created_at: string;
}

export interface RunDraft {
  startedAt: Date;
  endedAt: Date;
  points: RoutePoint[];
  weightKg?: number | null;
  userId: string;
}
