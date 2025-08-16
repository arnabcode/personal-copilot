export type UserDoc = {
	uid: string;
	prefs?: Record<string, unknown>;
	quietHours?: { start: string; end: string };
	energyProfile?: 'morning' | 'afternoon' | 'evening';
	commuteMode?: 'driving' | 'walking' | 'transit';
};

export type TaskTrigger = {
	type: 'time' | 'geofence';
	time?: string;
	rrule?: string;
	placeId?: string;
	radius?: number;
};

export type TaskDoc = {
	uid: string;
	title: string;
	notes?: string;
	priority?: number;
	trigger?: TaskTrigger;
	status?: 'pending' | 'done';
	snoozeUntil?: string | null;
	createdAt?: string;
	updatedAt?: string;
};

export type PlaceDoc = {
	uid: string;
	placeId: string;
	name: string;
	lat: number;
	lng: number;
	radius: number;
	types?: string[];
};