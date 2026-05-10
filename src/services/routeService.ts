import { supabase } from '@/lib/supabase/client';
import { encodeRoute } from '@/features/routes/polyline';
import type { RoutePoint } from '@/types/domain';

export async function createPrivateRoute(userId: string, points: RoutePoint[], name = 'Private run') {
  if (points.length < 2) throw new Error('La ruta necesita al menos dos puntos GPS.');
  const first = points[0];
  const last = points[points.length - 1];
  const { data, error } = await supabase
    .from('routes')
    .insert({
      user_id: userId,
      name,
      polyline: encodeRoute(points),
      start_lat: first.latitude,
      start_lng: first.longitude,
      end_lat: last.latitude,
      end_lng: last.longitude,
      is_private: true
    })
    .select('*')
    .single();
  if (error) throw new Error('No pudimos guardar la ruta privada.');
  return data;
}

export async function deleteRoute(routeId: string) {
  const { error } = await supabase.from('routes').delete().eq('id', routeId);
  if (error) throw new Error('No pudimos borrar la ruta.');
}
