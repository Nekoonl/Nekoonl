import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { PREMIUM_MONTHLY_PRICE_USD } from '@/constants/product';

export default function SettingsScreen() {
  return (
    <Screen>
      <AppText variant="h1">Settings</AppText>
      <Card><AppText variant="label">THEME</AppText><AppText>System · Light · Dark</AppText></Card>
      <Card><AppText variant="label">PROFILE</AppText><AppText>Edit weight, goal and preferred run days.</AppText></Card>
      <Card><AppText variant="label">MOTIVATION</AppText><AppText>Change level anytime. Level 3 requires 18+ and explicit consent.</AppText></Card>
      <Card><AppText variant="label">PRIVACY</AppText><AppText>Routes private by default. Delete route or full history anytime.</AppText></Card>
      <Card><AppText variant="label">PREMIUM</AppText><AppText>Prepared for ${PREMIUM_MONTHLY_PRICE_USD}/month: no ads, Level 3 trial, extended history later.</AppText></Card>
      <Button title="Delete history" variant="danger" />
      <Button title="Sign out" variant="ghost" />
    </Screen>
  );
}
