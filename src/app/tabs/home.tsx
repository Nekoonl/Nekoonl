import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { MetricCard } from '@/components/cards/MetricCard';
import { HistoryBars } from '@/components/charts/HistoryBars';
import { CALORIE_DISCLAIMER } from '@/constants/product';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function HomeScreen() {
  const theme = useAppTheme();
  return (
    <Screen>
      <AppText variant="h1">Today’s run</AppText>
      <Card style={{ borderColor: theme.colors.primary }}>
        <AppText variant="label" style={{ color: theme.colors.primary }}>GOAL OF THE DAY</AppText>
        <AppText variant="h2">Run 3.0 km easy</AppText>
        <Link href="/run/setup" asChild><Button title="Quick start run" /></Link>
      </Card>
      <View style={styles.grid}>
        <MetricCard label="Streak" value="4 days" accent={theme.colors.secondary} />
        <MetricCard label="Last run" value="2.8 km" />
        <MetricCard label="Calories*" value="212" />
        <MetricCard label="Hydration" value="1.2 L" accent={theme.colors.info} />
      </View>
      <Card>
        <AppText variant="label">15-DAY HISTORY</AppText>
        <HistoryBars values={[0, 2, 0, 4, 3, 0, 5, 2, 1, 4, 0, 3, 3, 0, 5]} />
      </Card>
      <AppText variant="muted">Routes are private by default. {CALORIE_DISCLAIMER}</AppText>
    </Screen>
  );
}
const styles = StyleSheet.create({ grid: { gap: 12 } });
