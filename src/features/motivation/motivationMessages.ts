import type { MotivationLevel } from '@/types/domain';

export type MotivationContext = 'pre_run' | 'during_run' | 'post_run' | 'missed_days' | 'hydration';

const messages: Record<MotivationLevel, Record<MotivationContext, string[]>> = {
  1: {
    pre_run: ['Nice work. You showed up today.', 'Un paso más cuenta.', 'Hoy no tienes que ser perfecto, solo presente.'],
    during_run: ['Breathe steady. You are moving forward.', 'Suave y constante también es progreso.'],
    post_run: ['You kept the promise. Save this win.', 'Bien hecho. La constancia se construye así.'],
    missed_days: ['Reset sin culpa. Hoy puedes volver.', 'Un descanso no borra tu progreso.'],
    hydration: ['Toma agua y escucha a tu cuerpo.', 'Hidratarte también es parte del plan.']
  },
  2: {
    pre_run: ['You said you wanted progress. Go earn it.', 'La meta no se cumple sola.', 'No negocies con la excusa.'],
    during_run: ['Move. One more block.', 'Mantén el ritmo. La disciplina se entrena.'],
    post_run: ['Eso fue disciplina, no suerte.', 'Hoy ganaste evidencia de progreso.'],
    missed_days: ['Vuelve hoy. La racha se reconstruye corriendo.', 'Menos promesa, más primer kilómetro.'],
    hydration: ['Cuida lo básico. Agua, tenis, salida.']
  },
  3: {
    pre_run: ['No excuses. Lace up.', 'Tu plan no se va a correr solo.', 'Hoy gana Rush o gana la excusa. Decide.'],
    during_run: ['Cinco minutos de queja o cinco minutos de carrera. Tú eliges.', 'Move. One more block.'],
    post_run: ['You earned that. Tomorrow, no speech—repeat.', 'Hoy no ganó la excusa. Bien.'],
    missed_days: ['Bajamos el ruido: vuelve con una carrera fácil hoy.', 'Sin drama. Reinicia con Nivel 1 si lo necesitas.'],
    hydration: ['No compliques lo básico: agua y a seguir.']
  }
};

export function getMotivationMessage(level: MotivationLevel, context: MotivationContext, seed = 0): string {
  const pool = messages[level][context];
  return pool[Math.abs(seed) % pool.length];
}

export function safetyAdjustedMotivationLevel(level: MotivationLevel, missedDays: number): MotivationLevel {
  if (missedDays >= 3 && level === 3) return 1;
  return level;
}

export function isUnsafeMotivationCopy(message: string): boolean {
  const blocked = [/perdedor/i, /vergüenza/i, /nunca vas a lograr nada/i, /gord[oa]/i, /feo/i, /inútil/i];
  return blocked.some((pattern) => pattern.test(message));
}
