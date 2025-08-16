import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { getFirestoreDb } from '../firebase/client';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { ensureAnonymousSignIn } from '../firebase/client';
import { Card, Button, ButtonText, Title } from '../ui/AceternityPrimitives';

export default function TasksScreen() {
	const [uid, setUid] = useState<string | null>(null);
	const [taskTitle, setTaskTitle] = useState('');
	const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);

	useEffect(() => {
		ensureAnonymousSignIn().then(setUid).catch(console.warn);
	}, []);

	useEffect(() => {
		if (!uid) return;
		const db = getFirestoreDb();
		const q = query(collection(db, 'tasks', uid, 'items'), orderBy('createdAt', 'desc'));
		const unsub = onSnapshot(q, snap => {
			const data: { id: string; title: string }[] = [];
			snap.forEach(doc => data.push({ id: doc.id, title: (doc.data() as any).title }));
			setTasks(data);
		});
		return () => unsub();
	}, [uid]);

	async function addTask() {
		if (!uid || !taskTitle.trim()) return;
		const db = getFirestoreDb();
		await addDoc(collection(db, 'tasks', uid, 'items'), {
			title: taskTitle.trim(),
			uid,
			createdAt: new Date().toISOString(),
		});
		setTaskTitle('');
	}

	return (
		<View style={{ flex: 1, backgroundColor: '#0b1220', paddingHorizontal: 16, paddingTop: 16 }}>
			<Card>
				<Title>Quick Add</Title>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 }}>
					<TextInput
						style={{ flex: 1, backgroundColor: '#0b1220', color: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 }}
						placeholder="Add a task"
						placeholderTextColor="#64748b"
						value={taskTitle}
						onChangeText={setTaskTitle}
					/>
					<Button onPress={addTask}><ButtonText>Add</ButtonText></Button>
				</View>
			</Card>
			<FlatList
				style={{ marginTop: 12 }}
				data={tasks}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Card>
						<Text style={{ color: '#fff', fontSize: 16 }}>{item.title}</Text>
					</Card>
				)}
			/>
		</View>
	);
}