import { View, StyleSheet, type ViewProps } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/tokens';

export function Card({ style, ...props }: ViewProps) {
  const theme = useAppTheme();
  return <View {...props} style={[styles.card, { backgroundColor: theme.colors.elevated, borderColor: theme.colors.border }, style]} />;
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md }
});
