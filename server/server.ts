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
 * @param params - Object containing user_id, booking_id, question, booking_type, and target_language.
 * @returns The response from the API, containing the chatbot's reply.
 */
export const sendChatMessage = async (params: {
	user_id: string;
	booking_id: string;
	question: string;
	booking_type: string;
	target_language?: string; // Optional target language field
}) => {
	try {
		// Define the request payload, ensuring default to 'en' (English) if no target_language is provided
		const requestData = {
			...params,
			target_language: params.target_language || "en", // Default to 'en' if target_language is not provided
		};

		console.log(requestData);

		const response = await apiInstance.post(
			`/api/rag/interactions/chat?target_language=${requestData.target_language}`,
			requestData,
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);

		console.log(response);

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

/**
 * Fetch recommendations for a user based on their past and upcoming travel data.
 *
 * @param userId - The unique identifier of the user whose recommendations are being fetched.
 * @returns A promise that resolves to a recommendation object containing travel summary, recommendations, and generated date.
 *
 * Example response:
 * ```json
 * {
 *   "user_id": "example@example.com",
 *   "travel_summary": {
 *     "past_locations": ["Miami, Florida, US"],
 *     "current_location": "Miami, Florida, US",
 *     "upcoming_location": "Miami, Florida, US",
 *     "total_stays": 4,
 *     "favorite_locations": ["Miami, Florida, US"],
 *     "travel_patterns": {
 *       "seasonal_preference": {
 *         "fall": 3
 *       },
 *       "average_stay_duration": 0.3,
 *       "booking_frequency": "occasional",
 *       "location_types": []
 *     }
 *   },
 *   "recommendations": [
 *     {
 *       "title": "Explore Wynwood Walls in Miami",
 *       "description": "Visit the vibrant Wynwood Walls...",
 *       "type": "activity",
 *       "priority": "high",
 *       "reason": "Based on your past stays in Miami...",
 *       "target_location": "Miami, Florida",
 *       "estimated_cost": "Free to explore",
 *       "recommendation_id": "some-id",
 *       "user_id": "example@example.com",
 *       "status": "active"
 *     }
 *   ],
 *   "generated_at": "2024-10-22T19:46:33.179467-04:00"
 * }
 * ```
 */
export const fetchRecommendations = async (userId: string): Promise<RecommendationResponse> => {
	try {
		const response = await apiInstance.get(`/api/recommendation/recommendations/${userId}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching recommendations:", error);
		throw error;
	}
};

// Types
export interface TravelPatterns {
	seasonal_preference: Record<string, number>;
	average_stay_duration: number;
	booking_frequency: string;
	location_types: string[];
}

export interface TravelSummary {
	past_locations: string[];
	current_location: string;
	upcoming_location: string;
	total_stays: number;
	favorite_locations: string[];
	travel_patterns: TravelPatterns;
}

export interface Recommendation {
	title: string;
	description: string;
	type: string;
	priority: string;
	reason: string;
	source_locations: string[];
	target_location: string;
	estimated_cost: string;
	seasonal_relevance: string | null;
	tags: string[] | null;
	recommendation_id: string;
	user_id: string;
	upcoming_booking_id: string;
	created_at: string;
	updated_at: string;
	status: string;
	engagement_score: number | null;
}

export interface RecommendationResponse {
	user_id: string;
	travel_summary: TravelSummary;
	recommendations: Recommendation[];
	generated_at: string;
}
