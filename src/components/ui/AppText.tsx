import { Text, type TextProps, StyleSheet } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { typography } from '@/theme/tokens';

type Variant = 'title' | 'h1' | 'h2' | 'body' | 'label' | 'muted';

export function AppText({ style, variant = 'body', ...props }: TextProps & { variant?: Variant }) {
  const theme = useAppTheme();
  return <Text {...props} style={[styles[variant], { color: variant === 'muted' ? theme.colors.muted : theme.colors.text }, style]} />;
}

const styles = StyleSheet.create({
  title: typography.title,
  h1: typography.h1,
  h2: typography.h2,
  body: typography.body,
  label: typography.label,
  muted: { ...typography.body, fontSize: 14 }
});
