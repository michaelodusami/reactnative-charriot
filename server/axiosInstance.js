import { API_URL, API_KEY } from "@env";
import axios from "axios";

const apiInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"x-api-key": API_KEY,
	},
});

export default apiInstance;
