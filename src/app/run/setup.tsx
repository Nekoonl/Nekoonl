import { Link } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { RouteMapPreview } from '@/components/maps/RouteMapPreview';
import { WARMUP_STEPS } from '@/constants/product';

export default function RunSetupScreen() {
  return (
    <Screen>
      <AppText variant="h1">Run setup</AppText>
      <RouteMapPreview />
      <Card>
        <AppText variant="label">PRIVATE ROUTE</AppText>
        <AppText>Enabled by default. No live sharing. No public routes in MVP.</AppText>
      </Card>
      <Card>
        <AppText variant="label">5-MIN WARMUP</AppText>
        {WARMUP_STEPS.map((step) => <AppText key={step} variant="muted">• {step}</AppText>)}
      </Card>
      <Link href="/run/tracking" asChild><Button title="Start run" /></Link>
    </Screen>
  );
}
