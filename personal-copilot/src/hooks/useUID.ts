import { useEffect, useState } from 'react';
import { ensureAnonymousSignIn } from '../firebase/client';

export function useUID() {
	const [uid, setUid] = useState<string | null>(null);
	useEffect(() => {
		ensureAnonymousSignIn().then(setUid).catch(console.warn);
	}, []);
	return uid;
}