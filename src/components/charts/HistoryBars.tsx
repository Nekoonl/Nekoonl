import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export function HistoryBars({ values }: { values: number[] }) {
  const theme = useAppTheme();
  const max = Math.max(1, ...values);
  return (
    <View style={styles.row}>
      {values.map((value, index) => (
        <View key={`${value}-${index}`} style={[styles.bar, { height: 18 + (value / max) * 82, backgroundColor: value > 0 ? theme.colors.primary : theme.colors.border }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { height: 110, flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  bar: { flex: 1, borderRadius: 999, minHeight: 18 }
});
