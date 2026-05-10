import * as Notifications from 'expo-notifications';

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const next = await Notifications.requestPermissionsAsync();
  return next.granted;
}

export async function scheduleHydrationReminder(hour = 18, minute = 0) {
  const granted = await requestNotificationPermission();
  if (!granted) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title: 'Rush Coach', body: 'Hidratarte también es parte del plan.' },
    trigger: { hour, minute, repeats: true }
  });
}
