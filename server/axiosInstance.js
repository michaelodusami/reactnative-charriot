import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const apiInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		"API-KEY": apiKey,
	},
});

export default apiInstance;
