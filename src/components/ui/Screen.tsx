import type { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/tokens';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
}

export function Screen({ children, scroll = true, style }: ScreenProps) {
  const theme = useAppTheme();
  const content = scroll ? (
    <ScrollView contentContainerStyle={[styles.content, style]}>{children}</ScrollView>
  ) : (
    <>{children}</>
  );
  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: spacing.xl, gap: spacing.lg }
});
