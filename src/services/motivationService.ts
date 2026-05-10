import { getMotivationMessage, safetyAdjustedMotivationLevel, type MotivationContext } from '@/features/motivation/motivationMessages';
import { supabase } from '@/lib/supabase/client';
import type { MotivationLevel } from '@/types/domain';

export function selectMotivation(level: MotivationLevel, context: MotivationContext, missedDays = 0, seed = Date.now()) {
  const safeLevel = safetyAdjustedMotivationLevel(level, missedDays);
  return { level: safeLevel, message: getMotivationMessage(safeLevel, context, seed) };
}

export async function logMotivationEvent(userId: string, level: MotivationLevel, message: string, context: MotivationContext) {
  const { error } = await supabase.from('motivation_events').insert({ user_id: userId, level, message, context });
  if (error) throw new Error('No pudimos registrar el evento de motivación.');
}
