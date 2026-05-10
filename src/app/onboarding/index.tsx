import { Link } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { allowedMotivationLevels } from '@/features/auth/agePolicy';

export default function OnboardingScreen() {
  const sampleDob = '1996-01-01';
  return (
    <Screen>
      <AppText variant="h1">Setup your coach</AppText>
      <AppText variant="muted">Flujo MVP: fecha de nacimiento, peso opcional, objetivo, experiencia, días preferidos, meta inicial y tono.</AppText>
      <Card>
        <AppText variant="label">Age-safe motivation</AppText>
        <AppText>Para un adulto demo ({sampleDob}) están disponibles niveles: {allowedMotivationLevels(sampleDob).join(', ')}.</AppText>
      </Card>
      <Card>
        <AppText variant="label">Nivel 3 terms</AppText>
        <AppText variant="muted">Roast-lite es opcional, reversible y nunca usa insultos sobre cuerpo, salud mental, identidad, apariencia o valor personal.</AppText>
      </Card>
      <Link href="/tabs/home" asChild><Button title="Finish setup" /></Link>
    </Screen>
  );
}
