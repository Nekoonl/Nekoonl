import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';

export function MetricCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <Card style={accent ? { borderColor: accent } : undefined}>
      <AppText variant="label" style={accent ? { color: accent } : undefined}>{label}</AppText>
      <AppText variant="h2">{value}</AppText>
    </Card>
  );
}
