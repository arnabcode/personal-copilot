import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ensureAnonymousSignIn, getFirestoreDb } from '../firebase/client';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { registerGeofence, unregisterGeofence, requestLocationPermissions } from '../services/location';

export default function PlacesScreen() {
	const [uid, setUid] = useState<string | null>(null);
	const [name, setName] = useState('My Place');
	const [lat, setLat] = useState('12.9716');
	const [lng, setLng] = useState('77.5946');
	const [radius, setRadius] = useState('200');
	const [places, setPlaces] = useState<{ id: string; name: string; lat: number; lng: number; radius: number }[]>([]);

	useEffect(() => {
		ensureAnonymousSignIn().then(setUid).catch(console.warn);
	}, []);

	useEffect(() => {
		if (!uid) return;
		const db = getFirestoreDb();
		const q = query(collection(db, 'places', uid, 'items'), orderBy('name'));
		const unsub = onSnapshot(q, snap => {
			const data: { id: string; name: string; lat: number; lng: number; radius: number }[] = [];
			snap.forEach(doc => {
				const d = doc.data() as any;
				data.push({ id: doc.id, name: d.name, lat: d.lat, lng: d.lng, radius: d.radius });
			});
			setPlaces(data);
		});
		return () => unsub();
	}, [uid]);

	async function addPlace() {
		if (!uid) return;
		const ok = await requestLocationPermissions();
		if (!ok) return;
		const db = getFirestoreDb();
		const docRef = await addDoc(collection(db, 'places', uid, 'items'), {
			uid,
			name: name.trim() || 'Place',
			lat: parseFloat(lat),
			lng: parseFloat(lng),
			radius: parseInt(radius, 10) || 200,
		});
		await registerGeofence([
			{ identifier: docRef.id, latitude: parseFloat(lat), longitude: parseFloat(lng), radius: parseInt(radius, 10) || 200, notifyOnEnter: true, notifyOnExit: false },
		]);
	}

	async function clearGeofences() {
		await unregisterGeofence();
	}

	return (
		<View style={{ flex: 1, backgroundColor: '#0b1220', paddingHorizontal: 16, paddingTop: 16 }}>
			<View style={{ backgroundColor: '#0f172a', borderRadius: 12, padding: 16, marginBottom: 16 }}>
				<Text style={{ color: '#fff', marginBottom: 8, fontWeight: '600' }}>Add Place</Text>
				<View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
					<TextInput style={{ flex: 1, backgroundColor: '#0b1220', color: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#64748b" />
				</View>
				<View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
					<TextInput style={{ flex: 1, backgroundColor: '#0b1220', color: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} value={lat} onChangeText={setLat} placeholder="Lat" placeholderTextColor="#64748b" />
					<TextInput style={{ flex: 1, backgroundColor: '#0b1220', color: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} value={lng} onChangeText={setLng} placeholder="Lng" placeholderTextColor="#64748b" />
					<TextInput style={{ width: 96, backgroundColor: '#0b1220', color: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }} value={radius} onChangeText={setRadius} placeholder="Radius" placeholderTextColor="#64748b" />
				</View>
				<View style={{ flexDirection: 'row', gap: 8 }}>
					<TouchableOpacity onPress={addPlace} style={{ backgroundColor: '#6366f1', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 }}><Text style={{ color: '#fff' }}>Save</Text></TouchableOpacity>
					<TouchableOpacity onPress={clearGeofences} style={{ backgroundColor: '#32349a', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 }}><Text style={{ color: '#fff' }}>Clear</Text></TouchableOpacity>
				</View>
			</View>

			<FlatList
				data={places}
				keyExtractor={p => p.id}
				renderItem={({ item }) => (
					<View style={{ backgroundColor: '#0f172a', borderRadius: 12, padding: 16, marginBottom: 12 }}>
						<Text style={{ color: '#fff' }}>{item.name} ({item.radius}m)</Text>
						<Text style={{ color: '#94a3b8' }}>{item.lat.toFixed(4)}, {item.lng.toFixed(4)}</Text>
					</View>
				)}
			/>
		</View>
	);
}