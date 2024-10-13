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
