import { Link } from 'expo-router';
import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { PRODUCT_NAME, TAGLINE } from '@/constants/product';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function LoginScreen() {
  const theme = useAppTheme();
  const [loading, setLoading] = useState(false);
  return (
    <Screen>
      <View style={styles.hero}>
        <AppText variant="title">{PRODUCT_NAME}</AppText>
        <AppText variant="muted">{TAGLINE}</AppText>
      </View>
      <TextInput placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" keyboardType="email-address" style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} />
      <TextInput placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} />
      <Button title="Login" loading={loading} onPress={() => setLoading((value) => !value)} />
      <Button title="Continue with Google" variant="ghost" />
      <Link href="/auth/register" asChild><Button title="Create account" variant="secondary" /></Link>
      <Link href="/auth/recover"><AppText variant="muted" style={{ textAlign: 'center' }}>Recover account</AppText></Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 64, marginBottom: 32, gap: 8 },
  input: { minHeight: 54, borderWidth: 1, borderRadius: 18, paddingHorizontal: 16, fontSize: 16 }
});
