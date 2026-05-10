import { supabase } from '@/lib/supabase/client';
import type { EmailPasswordInput } from '@/validations/authSchema';

export async function signInWithEmail(input: EmailPasswordInput) {
  const { data, error } = await supabase.auth.signInWithPassword(input);
  if (error) throw new Error('No pudimos iniciar sesión. Revisa tus datos e intenta otra vez.');
  return data;
}

export async function signUpWithEmail(input: EmailPasswordInput) {
  const { data, error } = await supabase.auth.signUp(input);
  if (error) throw new Error('No pudimos crear tu cuenta. Intenta de nuevo.');
  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error('No pudimos enviar el correo de recuperación.');
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('No pudimos cerrar sesión.');
}
