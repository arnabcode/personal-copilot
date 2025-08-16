import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});

export async function requestNotificationPermissions(): Promise<boolean> {
	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.DEFAULT,
			sound: 'default',
		});
	}
	if (!Device.isDevice) return true;
	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	let finalStatus = existingStatus;
	if (existingStatus !== 'granted') {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}
	return finalStatus === 'granted';
}

export async function scheduleLocalNotification(title: string, body: string, trigger: Notifications.NotificationTriggerInput) {
	return Notifications.scheduleNotificationAsync({
		content: { title, body, sound: 'default' },
		trigger,
	});
}