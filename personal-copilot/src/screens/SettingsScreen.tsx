import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ensureAnonymousSignIn } from '../firebase/client';
import { requestNotificationPermissions } from '../services/notifications';

export default function SettingsScreen() {
	const [uid, setUid] = useState<string | null>(null);
	useEffect(() => {
		ensureAnonymousSignIn().then(setUid).catch(console.warn);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#0b1220', paddingHorizontal: 16, paddingTop: 16 }}>
			<View style={{ backgroundColor: '#0f172a', borderRadius: 12, padding: 16, marginBottom: 16 }}>
				<Text style={{ color: '#fff', marginBottom: 8 }}>UID</Text>
				<Text style={{ color: '#94a3b8', marginBottom: 16 }}>{uid}</Text>
				<TouchableOpacity onPress={requestNotificationPermissions} style={{ backgroundColor: '#6366f1', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 }}>
					<Text style={{ color: '#fff', fontWeight: '600' }}>Enable Notifications</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}