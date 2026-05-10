import { Link } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { selectMotivation } from '@/services/motivationService';
import { CALORIE_DISCLAIMER } from '@/constants/product';

export default function PostRunSummaryScreen() {
  const motivation = selectMotivation(2, 'post_run', 0, 4);
  return (
    <Screen>
      <AppText variant="h1">Run saved</AppText>
      <Card>
        <AppText variant="label">PRIVATE ROUTE SAVED</AppText>
        <AppText variant="h2">3.21 km · 20:14 · 6:18 /km</AppText>
        <AppText variant="muted">Calories estimated: 239. {CALORIE_DISCLAIMER}</AppText>
      </Card>
      <Card>
        <AppText variant="label">COACH LEVEL {motivation.level}</AppText>
        <AppText>{motivation.message}</AppText>
      </Card>
      <Button title="Delete route" variant="danger" />
      <Link href="/tabs/settings" asChild><Button title="Change motivation mode" variant="ghost" /></Link>
      <Link href="/tabs/home" asChild><Button title="Back home" /></Link>
    </Screen>
  );
}
