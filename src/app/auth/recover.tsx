import { TextInput, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function RecoverScreen() {
  const theme = useAppTheme();
  return (
    <Screen>
      <AppText variant="h1">Recover account</AppText>
      <AppText variant="muted">Te enviaremos instrucciones seguras por email.</AppText>
      <TextInput placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} />
      <Button title="Send recovery email" />
    </Screen>
  );
}
const styles = StyleSheet.create({ input: { minHeight: 54, borderWidth: 1, borderRadius: 18, paddingHorizontal: 16, fontSize: 16 } });
