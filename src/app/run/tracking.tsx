import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { MetricCard } from '@/components/cards/MetricCard';
import { RouteMapPreview } from '@/components/maps/RouteMapPreview';
import { buildRunMetrics } from '@/features/runs/metrics';
import type { RoutePoint } from '@/types/domain';
import { formatDistance, formatDuration, formatPace } from '@/utils/format';

const demoPoints: RoutePoint[] = [
  { latitude: 25.7617, longitude: -80.1918, timestamp: 1 },
  { latitude: 25.7627, longitude: -80.1818, timestamp: 2 },
  { latitude: 25.7647, longitude: -80.1718, timestamp: 3 }
];

export default function TrackingScreen() {
  const [paused, setPaused] = useState(false);
  const metrics = useMemo(() => buildRunMetrics({ userId: '00000000-0000-0000-0000-000000000000', startedAt: new Date(Date.now() - 18 * 60 * 1000), endedAt: new Date(), points: demoPoints, weightKg: 72 }), []);
  return (
    <Screen>
      <AppText variant="h1">Running</AppText>
      <RouteMapPreview label="Live GPS route" />
      <View style={styles.grid}>
        <MetricCard label="Distance" value={formatDistance(metrics.distanceMeters)} />
        <MetricCard label="Time" value={formatDuration(metrics.durationSeconds)} />
        <MetricCard label="Avg pace" value={formatPace(metrics.avgPaceSecondsPerKm)} />
        <MetricCard label="Calories*" value={String(metrics.estimatedCalories ?? '--')} />
      </View>
      <Card><AppText variant="muted">GPS usa permisos foreground. Background tracking queda como mejora controlada para una fase posterior.</AppText></Card>
      <Button title={paused ? 'Resume' : 'Pause'} variant="ghost" onPress={() => setPaused((value) => !value)} />
      <Link href="/run/summary" asChild><Button title="Finish and save private route" /></Link>
    </Screen>
  );
}
const styles = StyleSheet.create({ grid: { gap: 12 } });
