import axios from "axios";
import apiInstance from "./axiosInstance";

export const getAllUserRequests = async (user_id: string) => {
	try {
		const response = await apiInstance.get("/api/requests/requests/user/" + user_id);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 *
 * 	Acessibilities
 */

// get the current users acessiblity and load it

/**
 * {
  "dietary_restrictions": "other",
  "dietary_restrictions_other": "string",
  "bedding_pillows": 2,
  "bedding_mattress_type": "any",
  "bedding_pillow_type": "any",
  "bedding_other": "string",
  "climate_control": "Temperature set to 75°F",
  "room_view": "any",
  "quiet_room": false,
  "misc": "string"
}

 */

const preferencesEndPoints = {
	getAll: "/api/auth/users/{user_id}/preferences",
};

export const updateUserPreferences = async (userId: string, preferences: any) => {
	try {
		console.log(preferences);
		const response = await apiInstance.put(
			`/api/auth/users/${userId}/preferences`,
			preferences
		);
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const getUserPreferences = async (userId: string) => {
	//console.log("\ngetting the user's preferences: " + userId + "\n");
	try {
		const response = await apiInstance.get(`/api/auth/users/${userId}/preferences`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

// update the users acessibility based on user id

/**
 *
 * AUTH (USER)
 *
 */

const authEndPoints = {
	signin: "/api/auth/login",
	getUser: "/api/auth/users/", // takes user id as well (getUser + userId)
};

export const signIn = async (email: string, password: string) => {
	console.log(`Signing in ${email} and ${password}...\n`);
	try {
		const requestBody = {
			email: email,
			password: password,
		};
		const response = await apiInstance.post(authEndPoints.signin, requestBody);
		console.log(response.data);
		return response.data.access_token;
	} catch (err) {
		console.error("Error" + err);
		throw err;
	}
};

export const submitRequest = async (requestId: string, userEmail: string) => {
	console.log("I have been called");
	try {
		const response = await apiInstance.post(
			`https://p5vfoq23g5ps45rtvky2xydcxe0sbwph.lambda-url.us-east-1.on.aws/api/request/${requestId}/${encodeURIComponent(
				userEmail
			)}`
		);
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.error("Error submitting request:", err);
		throw err;
	}
};
