import { ISearchVideo } from "@/interfaces/video";
import axiosClient from "@/lib/axios-client";

export const searchVideo = async (q: string) => {
	try {
		const res = await axiosClient.get(`/videos/search?q=${q}`);
		return {
			error: false,
			message: "Ok.",
			data: res.data.body,
		};
	} catch (error) {
		console.log({ error });
		return {
			error: true,
			message: "Error al buscar el video.",
			data: [],
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
		const res = await axiosClient.patch(`/videos/add-video-to-playlist`, {
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

export const removeVideoFromPlaylist = async ({
	eventId,
	videoId,
}: {
	eventId: string;
	videoId: string;
}) => {
	try {
		const res = await axiosClient.patch(`/videos/remove-video-from-playlist`, {
			eventId,
			videoId,
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
			message: "Error al eliminar el video a la playlist.",
		};
	}
};
