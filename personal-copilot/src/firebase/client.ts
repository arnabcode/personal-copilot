import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, Firestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import Constants from 'expo-constants';

let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
	if (firebaseApp) return firebaseApp;
	const config = Constants.expoConfig?.extra?.firebase as any;
	firebaseApp = getApps().length ? getApps()[0] : initializeApp(config);
	return firebaseApp;
}

export function getFirebaseAuth(): Auth {
	if (authInstance) return authInstance;
	const app = getFirebaseApp();
	try {
		authInstance = initializeAuth(app, {
			persistence: browserLocalPersistence,
		});
	} catch (e) {
		authInstance = getAuth(app);
	}
	return authInstance!;
}

export function getFirestoreDb(): Firestore {
	if (firestoreInstance) return firestoreInstance;
	const app = getFirebaseApp();
	try {
		firestoreInstance = initializeFirestore(app, {
			localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
			experimentalForceLongPolling: true,
		});
	} catch (e) {
		firestoreInstance = getFirestore(app);
	}
	return firestoreInstance!;
}

export async function ensureAnonymousSignIn(): Promise<string> {
	const auth = getFirebaseAuth();
	const { signInAnonymously, onAuthStateChanged } = await import('firebase/auth');
	return new Promise((resolve, reject) => {
		const unsub = onAuthStateChanged(auth, async user => {
			if (user) {
				unsub();
				resolve(user.uid);
				return;
			}
			try {
				await signInAnonymously(auth);
			} catch (err) {
				unsub();
				reject(err);
			}
		});
	});
}