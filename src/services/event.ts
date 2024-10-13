import axiosClient from "@/lib/axios-client";
import { IEvent, IEventCreate } from "@/interfaces/event";
import { ISearchVideo, IVideo } from "@/interfaces/video";
import { data } from "autoprefixer";

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

export const addVideoToPlaylist = async ({
	userName,
	eventId,
	video,
}: {
	userName: string;
	eventId: string;
	video: ISearchVideo;
}) => {
	try {
		const res = await axiosClient.patch(`/events/add-video-to-playlist`, {
			eventId,
			userName,
			...video,
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
			message: "Error al agregar el video a la playlist.",
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
