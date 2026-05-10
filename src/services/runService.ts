import { buildRunMetrics } from '@/features/runs/metrics';
import { supabase } from '@/lib/supabase/client';
import { createPrivateRoute } from '@/services/routeService';
import type { RunDraft } from '@/types/domain';

export async function createRun(draft: RunDraft) {
  const metrics = buildRunMetrics(draft);
  const route = await createPrivateRoute(draft.userId, draft.points);
  const { data, error } = await supabase
    .from('runs')
    .insert({
      user_id: draft.userId,
      started_at: draft.startedAt.toISOString(),
      ended_at: draft.endedAt.toISOString(),
      duration_seconds: metrics.durationSeconds,
      distance_meters: metrics.distanceMeters,
      avg_pace_seconds_per_km: metrics.avgPaceSecondsPerKm,
      estimated_calories: metrics.estimatedCalories,
      route_id: route.id
    })
    .select('*')
    .single();
  if (error) throw new Error('No pudimos guardar la carrera.');
  return { run: data, route };
}

export async function getRecentRuns(userId: string, days = 15) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const { data, error } = await supabase
    .from('runs')
    .select('*, routes(*)')
    .eq('user_id', userId)
    .gte('started_at', since.toISOString())
    .order('started_at', { ascending: false });
  if (error) throw new Error('No pudimos cargar tu historial.');
  return data ?? [];
}

export async function deleteRunHistory(userId: string) {
  const { error } = await supabase.from('runs').delete().eq('user_id', userId);
  if (error) throw new Error('No pudimos borrar tu historial.');
}
