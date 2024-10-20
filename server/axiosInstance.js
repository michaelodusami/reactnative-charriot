import { API_URL, API_KEY } from "@env";
import axios from "axios";

const apiInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"API-KEY": API_KEY,
	},
});

export default apiInstance;
