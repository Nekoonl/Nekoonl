import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/tokens';

export function RouteMapPreview({ label = 'Private route preview' }: { label?: string }) {
  const theme = useAppTheme();
  return (
    <View style={[styles.map, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <AppText variant="label">{label}</AppText>
      <AppText variant="muted">Mapa listo para conectar con Google Maps/Mapbox. Rutas privadas por defecto.</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { minHeight: 220, borderWidth: 1, borderRadius: radius.lg, padding: spacing.lg, justifyContent: 'flex-end', gap: spacing.sm }
});
