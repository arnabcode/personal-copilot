import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const GEOFENCE_TASK = 'geofenceTask';

TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
	if (error) {
		console.warn('Geofence task error', error);
		return;
	}
	const event = data as any;
	// The app layer should subscribe to Notifications in-app for now
	console.log('Geofence event', event);
});

export async function requestLocationPermissions() {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') return false;
	const bg = await Location.requestBackgroundPermissionsAsync();
	return bg.status === 'granted';
}

export async function registerGeofence(geos: Location.LocationRegion[]) {
	await Location.startGeofencingAsync(GEOFENCE_TASK, geos);
}

export async function unregisterGeofence() {
	const started = await Location.hasStartedGeofencingAsync(GEOFENCE_TASK);
	if (started) await Location.stopGeofencingAsync(GEOFENCE_TASK);
}