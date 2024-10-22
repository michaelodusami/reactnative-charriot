import apiInstance from "./axiosInstance"; // Adjust the path as needed

/**
 * Update user preferences.
 * @param user_id - The ID of the user.
 * @param preferences - The preferences data to update.
 * @returns The updated preferences data.
 */
export const updateUserPreferences = async (user_id: string, preferences: object) => {
	try {
		const response = await apiInstance.put(
			`/api/auth/users/${user_id}/preferences`,
			preferences
		);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get user preferences.
 * @param user_id - The ID of the user.
 * @returns The user preferences data.
 */
export const getUserPreferences = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/auth/users/${user_id}/preferences`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get user interaction counter.
 * @param user_id - The ID of the user.
 * @returns The interaction counter data.
 */
export const getUserInteractionCounter = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/auth/users/${user_id}/interaction-counter`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get user recommendations.
 * @param user_id - The ID of the user.
 * @returns The recommendations data.
 */
export const getUserRecommendations = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/auth/users/${user_id}/recommendations`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Update user recommendations.
 * @param user_id - The ID of the user.
 * @param recommendations - The recommendations data to update.
 * @returns The updated recommendations data.
 */
export const updateUserRecommendations = async (user_id: string, recommendations: object) => {
	try {
		const response = await apiInstance.put(
			`/api/auth/users/${user_id}/recommendations`,
			recommendations
		);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Create a new request.
 * @param requestData - The data for the new request.
 * @returns The created request data.
 */
export const createRequest = async (requestData: object) => {
	try {
		const response = await apiInstance.post(`/api/requests/requests`, requestData);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get a request by ID.
 * @param request_id - The ID of the request.
 * @returns The request data.
 */
export const getRequestById = async (request_id: string) => {
	try {
		const response = await apiInstance.get(`/api/requests/requests/${request_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Update a request.
 * @param request_id - The ID of the request.
 * @param requestData - The data to update the request with.
 * @returns The updated request data.
 */
export const updateRequest = async (request_id: string, requestData: object) => {
	try {
		const response = await apiInstance.put(`/api/requests/requests/${request_id}`, requestData);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get requests by hotel.
 * @param hotel_id - The ID of the hotel.
 * @returns The requests for the specified hotel.
 */
export const getRequestsByHotel = async (hotel_id: string) => {
	try {
		const response = await apiInstance.get(`/api/requests/requests/hotel/${hotel_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get requests by user.
 * @param user_id - The ID of the user.
 * @returns The requests for the specified user.
 */
export const getRequestsByUser = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/requests/requests/user/${user_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get all requests.
 * @returns All request data.
 */
export const getAllRequests = async () => {
	try {
		const response = await apiInstance.get(`/api/requests/all`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get all request statuses.
 * @returns All request status data.
 */
export const getAllRequestStatuses = async () => {
	try {
		const response = await apiInstance.get(`/api/requests/all_status`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Create a new booking.
 * @param bookingData - The data for the new booking.
 * @returns The created booking data.
 */
export const createBooking = async (bookingData: object) => {
	try {
		const response = await apiInstance.post(`/api/bookings/bookings`, bookingData);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get a booking by ID.
 * @param booking_id - The ID of the booking.
 * @returns The booking data.
 */
export const getBookingById = async (booking_id: string) => {
	try {
		const response = await apiInstance.get(`/api/bookings/bookings/${booking_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Update a booking.
 * @param booking_id - The ID of the booking.
 * @param bookingData - The data to update the booking with.
 * @returns The updated booking data.
 */
export const updateBooking = async (booking_id: string, bookingData: object) => {
	try {
		const response = await apiInstance.put(`/api/bookings/bookings/${booking_id}`, bookingData);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Delete a booking.
 * @param booking_id - The ID of the booking.
 * @returns A success message or status.
 */
export const deleteBooking = async (booking_id: string) => {
	try {
		const response = await apiInstance.delete(`/api/bookings/bookings/${booking_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get current bookings for a user.
 * @param user_id - The ID of the user.
 * @returns The current bookings data.
 */
export const getCurrentBookings = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/bookings/bookings/current/${user_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get upcoming bookings for a user.
 * @param user_id - The ID of the user.
 * @returns The current bookings data.
 */
export const getUpcomingBookings = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/bookings/bookings/future/${user_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};
/**
 * Get past bookings for a user.
 * @param user_id - The ID of the user.
 * @returns The past bookings data.
 */
export const getPastBookings = async (user_id: string) => {
	try {
		const response = await apiInstance.get(`/api/bookings/bookings/past/${user_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get future bookings for a user.
 * @param user_id - The ID of the user.
 * @returns The future bookings data.
 */
// export const getFutureBookings = async (user_id: string) => {
// 	try {
// 		const response = await apiInstance.get(`/api/bookings/bookings/future/${user_id}`);
// 		return response.data;
// 	} catch (err) {
// 		throw err;
// 	}
// };

/**
 * Get all hotels.
 * @returns The list of all hotels.
 */
export const getAllHotels = async () => {
	try {
		const response = await apiInstance.get(`/api/hotels/hotels`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Create a new hotel.
 * @param hotelData - The data for the new hotel.
 * @returns The created hotel data.
 */
export const createHotel = async (hotelData: object) => {
	try {
		const response = await apiInstance.post(`/api/hotels/hotels`, hotelData);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Get a hotel by ID.
 * @param hotel_id - The ID of the hotel.
 * @returns The hotel data.
 */
export const getHotelById = async (hotel_id: string) => {
	try {
		const response = await apiInstance.get(`/api/hotels/hotels/${hotel_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Update a hotel.
 * @param hotel_id - The ID of the hotel.
 * @param hotelData - The data to update the hotel with.
 * @returns The updated hotel data.
 */
export const updateHotel = async (hotel_id: string, hotelData: object) => {
	try {
		const response = await apiInstance.put(`/api/hotels/hotels/${hotel_id}`, hotelData);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Delete a hotel.
 * @param hotel_id - The ID of the hotel.
 * @returns A success message or status.
 */
export const deleteHotel = async (hotel_id: string) => {
	try {
		const response = await apiInstance.delete(`/api/hotels/hotels/${hotel_id}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

/**
 * Fetches user interactions based on user ID, booking ID, and booking type.
 *
 * @param userId - The ID of the user to retrieve interactions for (required).
 * @param bookingId - The ID of the booking (optional).
 * @param bookingType - The type of the booking such as "past", "current", or "upcoming" (optional).
 *
 * @returns A promise that resolves to an array of user interactions, or rejects with an error.
 *
 * @example
 * ```
 * fetchUserInteractions("user123", "booking456", "past", 0, 50)
 *  .then(interactions => console.log(interactions))
 *  .catch(error => console.error(error));
 * ```
 */
export const fetchUserInteractions = async (
	userId: string,
	bookingId?: string,
	bookingType?: string
) => {
	console.log(userId, bookingId, bookingType);
	try {
		const response = await apiInstance.get(`/api/rag/interactions/user/${userId}`, {
			params: {
				booking_id: bookingId,
				booking_type: bookingType,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(`Error fetching user interactions: ${error}`);
	}
};

/**
 * Sends a chat message to the /api/rag/interactions/chat endpoint.
 *
 * @param params - Object containing user_id, booking_id, question, and booking_type.
 * @returns The response from the API, containing the chatbot's reply.
 */
export const sendChatMessage = async (params: {
	user_id: string;
	booking_id: string;
	question: string;
	booking_type: string;
}) => {
	try {
		const response = await apiInstance.post("/api/rag/interactions/chat", params, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		// Check if response data exists and return the correct structure
		if (response && response.data && response.data.response_content) {
			return response.data; // Return the expected response object
		} else {
			throw new Error("Invalid response structure");
		}
	} catch (error) {
		console.error("Error sending chat message:", error);
		throw error;
	}
};

/**
 * Fetches previous user interactions (chat history) from the /api/rag/interactions/user/{user_id} endpoint.
 *
 * @param user_id - The ID of the user.
 * @param booking_type - The type of the booking (current, past, upcoming).
 * @param booking_id - Optional booking ID to filter interactions.
 * @param skip - Number of interactions to skip (default is 0).
 * @param limit - Limit the number of interactions (default is 50).
 *
 * @returns The previous chat interactions from the API.
 */
export const getUserInteractions = async (
	user_id: string,
	booking_type: string,
	booking_id?: string
) => {
	try {
		const response = await apiInstance.get(`/api/rag/interactions/user/${user_id}`, {
			params: {
				booking_type,
				booking_id,
			},
			headers: {
				Accept: "application/json",
			},
		});
		console.log(response.data);
		return response.data; // Return the chat interactions from the API
	} catch (error) {
		console.error("Error fetching user interactions:", error);
		throw error;
	}
};
