import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

function TabGlyph({ label, color }: { label: string; color: string }) {
  return <Text style={{ color, fontSize: 18, fontWeight: '800' }}>{label}</Text>;
}

export default function TabsLayout() {
  const theme = useAppTheme();
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }, tabBarActiveTintColor: theme.colors.primary, tabBarInactiveTintColor: theme.colors.muted }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }: { color: string }) => <TabGlyph label="R" color={color} /> }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: ({ color }: { color: string }) => <TabGlyph label="15" color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }: { color: string }) => <TabGlyph label="⚙" color={color} /> }} />
    </Tabs>
  );
}
