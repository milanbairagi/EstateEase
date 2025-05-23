import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 15000,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// handle response for 401 error
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			if (localStorage.getItem(ACCESS_TOKEN)) {
				localStorage.removeItem(ACCESS_TOKEN);
				localStorage.removeItem(REFRESH_TOKEN);
				const config = error.config;
				delete config.headers.Authorization;
				return api(config);
			}
		}
		return Promise.reject(error);
	}
);

export default api;
