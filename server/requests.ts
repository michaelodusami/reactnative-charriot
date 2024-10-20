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

export const getCurrnetUserBooking = async (user_id: string) => {
	try {
		const response = await apiInstance.get("/api/bookings/bookings/current/" + user_id);
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const getHotel = async (user_id: string) => {
	try {
		const currentbooking = await getCurrnetUserBooking(user_id);
		const response = await apiInstance.get("/api/hotels/hotels/" + currentbooking[0].hotel_id);
		console.log(response.data);
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const getHotelEventsForCurrentBookings = async (userId: string) => {
	try {
		const hotel = await getHotel(userId);
		const events = hotel["local_community_projects"];
		console.log(events);
		//return response.data;
	} catch (err) {
		throw err;
	}
};

// getHotelEventsForCurrentBookings("dhruv@example.com");

/**
 *
 * {"amenities": {"bar": true, "breakfast": true, "front_desk_24_7": true, "parking": true, "pet_friendly": false, "room_service": true}, "chain_id": "dhruv", "eco_rating": 10, "hotel_id": "13dfa963-d69d-4feb-8714-bae9b2c81811", "local_community_projects": [{"description": "Join fellow volunteers in cleaning up local beaches and protecting marine wildlife.", "image_url": "https://chariott-assets.s3.amazonaws.com/lcp1.png", "title": "Beach Cleanup: Make Our Shores Shine!"}, {"description": "Assist in sorting, packing, and distributing food to families in need at the local food bank.", "image_url": "https://chariott-assets.s3.amazonaws.com/lcp2.png", "title": "Food Bank Drive: Help Fight Hunger in Your Community!"}], "location": {"city": "Miami", "country": "US", "state": "Florida"}, "name": "courtyard"}
 *
 */

/**
 *
 * 	Acessibilities
 *
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
		console.log("Preferences = ", preferences);
		console.log("User ID = ", userId);
		const response = await apiInstance.put(
			`https://p5vfoq23g5ps45rtvky2xydcxe0sbwph.lambda-url.us-east-1.on.aws/api/auth/users/${userId}/preferences`,
			preferences
		);
		console.log("Response Data = ", response.data);
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
