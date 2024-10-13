import { auth } from "@/firebase";
import axios from "axios";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await auth.currentUser?.getIdToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default axiosClient;
