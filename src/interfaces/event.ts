export interface IEvent {
	eventId: string;
	name: string;
	maxParticipants: number;
	createdAt: number;
	uid: string;
}

export interface IEventCreate {
	name: string;
	uid: string;
}
