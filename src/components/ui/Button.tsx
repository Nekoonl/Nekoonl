import { Pressable, StyleSheet, ActivityIndicator, type PressableProps } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/tokens';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  loading?: boolean;
}

export function Button({ title, variant = 'primary', loading = false, disabled, style, ...props }: ButtonProps) {
  const theme = useAppTheme();
  const backgroundColor =
    variant === 'ghost' ? 'transparent' : variant === 'secondary' ? theme.colors.info : variant === 'danger' ? theme.colors.danger : theme.colors.primary;
  const color = variant === 'ghost' ? theme.colors.text : '#0A0A0A';
  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor: theme.colors.border, opacity: disabled ? 0.5 : pressed ? 0.82 : 1 },
        style
      ]}
    >
      {loading ? <ActivityIndicator color={color} /> : <AppText variant="label" style={{ color, textAlign: 'center' }}>{title}</AppText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 54, borderRadius: radius.pill, paddingHorizontal: spacing.xl, alignItems: 'center', justifyContent: 'center', borderWidth: 1 }
});
