import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function TabsLayout() {
  const theme = useAppTheme();
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: theme.colors.background, borderTopColor: theme.colors.border }, tabBarActiveTintColor: theme.colors.primary, tabBarInactiveTintColor: theme.colors.muted }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="speedometer-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
