import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { formatDistance, formatDuration, formatPace } from '@/utils/format';

export default function HistoryScreen() {
  return (
    <Screen>
      <AppText variant="h1">15-day history</AppText>
      {[2800, 5100, 3200].map((distance, index) => (
        <Card key={distance}>
          <AppText variant="label">PRIVATE RUN #{index + 1}</AppText>
          <AppText>{formatDistance(distance)} · {formatDuration(1780 + index * 120)} · {formatPace(360 + index * 12)}</AppText>
        </Card>
      ))}
    </Screen>
  );
}
