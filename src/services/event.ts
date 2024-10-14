import axiosClient from "@/lib/axios-client";
import { IEvent } from "@/interfaces/event";
import { IVideo } from "@/interfaces/video";

export const joinEvent = async ({ eventId }: { eventId: string }) => {
	try {
		const res = await axiosClient.post(`/events/join`, {
			eventId,
		});

		if (res.data.error) {
			return {
				error: true,
				message: res.data.body.message,
				data: null,
			};
		}

		return {
			error: false,
			message: "Ok.",
			data: res.data.body as IEvent,
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al obtener el evento.",
			data: null,
		};
	}
};

export const getPlaylists = async ({ eventId }: { eventId: string }) => {
	try {
		const res = await axiosClient.get(`/events/${eventId}/playlists`);

		if (res.data.error) {
			return {
				error: true,
				message: res.data.body.message,
				data: null,
			};
		}

		return {
			error: false,
			message: "Ok.",
			data: res.data.body as IVideo[],
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al obtener las playlists.",
			data: null,
		};
	}
};

export const createEvent = async ({ name }: { name: string }) => {
	try {
		const res = await axiosClient.post("/events/create", {
			name,
		});

		if (res.data.error) {
			return {
				error: true,
				message: res.data.body.message,
				data: null,
			};
		}

		return {
			error: false,
			message: "Ok.",
			data: res.data.body as IEvent,
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al crear el evento.",
			data: null,
		};
	}
};

export const closeEvent = async ({ eventId }: { eventId: string }) => {
	try {
		const res = await axiosClient.post(`/events/leave`, {
			eventId,
		});

		if (res.data.error) {
			return {
				error: true,
				message: res.data.body.message,
			};
		}

		return {
			error: false,
			message: "Ok.",
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al culminar el evento.",
		};
	}
};
