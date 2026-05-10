import { Link } from 'expo-router';
import { TextInput, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function RegisterScreen() {
  const theme = useAppTheme();
  return (
    <Screen>
      <AppText variant="h1">Create your Rush account</AppText>
      <AppText variant="muted">Supabase Auth maneja credenciales; Rush Coach nunca guarda contraseñas manualmente.</AppText>
      <TextInput placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} />
      <TextInput placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} />
      <Link href="/onboarding" asChild><Button title="Continue to onboarding" /></Link>
    </Screen>
  );
}
const styles = StyleSheet.create({ input: { minHeight: 54, borderWidth: 1, borderRadius: 18, paddingHorizontal: 16, fontSize: 16 } });
