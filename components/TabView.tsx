import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ImageSliderType } from "@/data/CarouselData";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
	getCurrnetUserBooking,
	getHotel,
	getHotelEvents,
	getUpcomingUserBooking,
	submitRequest,
	getLocationForHotel,
} from "@/server/requests";
import axiosInstance from "@/server/axiosInstance";
import apiInstance from "@/server/axiosInstance";
import { useUser } from "@/providers/UserContext"; // Import the useUser hook

import { format } from "date-fns";
import {
	getCurrentBookings,
	getHotelById,
	getUpcomingBookings,
	getPastBookings,
	Recommendation,
	fetchRecommendations,
	TravelSummary,
	RecommendationResponse,
} from "@/server/server";

type Props = {
	activeItem: ImageSliderType;
	userEmail: string;
};

const formatDisplayDate = (dateString: string) => {
	return format(new Date(dateString), "MMM d, yyyy");
};

const amenityOptions = {
	breakfast: { name: "Breakfast available", icon: "restaurant-outline" },
	bar: { name: "Bar", icon: "wine-outline" },
	room_service: { name: "Room service", icon: "cart-outline" },
	pet_friendly: { name: "Pet friendly", icon: "paw-outline" },
	front_desk_24_7: { name: "24/7 front desk", icon: "time-outline" },
	parking: { name: "Parking available", icon: "car-outline" },
};

const TabView: React.FC<Props> = ({ activeItem }) => {
	const { user } = useUser();
	const [activeTab, setActiveTab] = useState("Details");

	const OngoingTrip = () => {
		const [currentBooking, setCurrentBooking] = useState(null);
		const [currentHotel, setCurrentHotel] = useState(null);
		const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

		const fetchCurrentBooking = async () => {
			try {
				//const booking = await getCurrnetUserBooking(user.userId);
				const booking = await getCurrentBookings(user.userId);
				setCurrentBooking(booking[0]); // Assuming the booking API returns an array
			} catch (error) {
				console.error("Failed to fetch current booking:", error);
			}
		};

		const fetchCurrentHotel = async () => {
			try {
				// Ensure currentBooking is not null and has a valid hotel_id
				if (!currentBooking || !currentBooking["hotel_id"]) {
					console.error("No valid current booking or hotel_id found");
					return;
				}

				const hotel = await getHotelById(currentBooking["hotel_id"]);
				setCurrentHotel(hotel);
			} catch (error) {
				console.error("Failed to fetch current hotel:", error);
			}
		};

		// Adjusting the useEffect for better handling
		useEffect(() => {
			if (user.userId) {
				fetchCurrentBooking();
			}
		}, [user.userId]);

		useEffect(() => {
			if (currentBooking != null) {
				fetchCurrentHotel();
			}
		}, [currentBooking]);

		// Helper function to format the date

		if (!currentBooking || !currentHotel) {
			return null; // Render nothing if either of the data is not available
		}

		const DetailsTab = () => (
			<View style={styles.detailsContainer}>
				<View style={styles.dateContainer}>
					<View style={styles.dateItem}>
						<ThemedText style={styles.dateLabel}>Check-In</ThemedText>
						<View style={styles.dateCalendarStyle}>
							<Ionicons name="calendar-outline" size={18} color="black" />
							<ThemedText style={styles.dateText}>
								{formatDisplayDate(currentBooking.start_date)}
							</ThemedText>
						</View>
					</View>
					<View style={styles.verticalDivider} />
					<View style={styles.dateItem}>
						<ThemedText style={styles.dateLabel}>Check-Out</ThemedText>
						<View style={styles.dateCalendarStyle}>
							<Ionicons name="calendar-outline" size={18} color="black" />
							<ThemedText style={styles.dateText}>
								{formatDisplayDate(currentBooking.end_date)}
							</ThemedText>
						</View>
					</View>
				</View>
				<View style={styles.roomInfoContainer}>
					<ThemedText style={styles.sectionTitle}>Room Information</ThemedText>
					<View style={styles.roomDetails}>
						<View style={styles.roomDetailItem}>
							<Ionicons name="bed-outline" size={24} color="black" />
							<ThemedText style={styles.roomDetailText}>
								{currentBooking.room_info.beds} Beds
							</ThemedText>
						</View>
						<View style={styles.roomDetailItem}>
							<Ionicons name="water-outline" size={24} color="black" />
							<ThemedText style={styles.roomDetailText}>
								{currentBooking.room_info.bathrooms} Bathrooms
							</ThemedText>
						</View>
						<View style={styles.roomDetailItem}>
							<Ionicons name="resize-outline" size={24} color="black" />
							<ThemedText style={styles.roomDetailText}>
								{currentBooking.room_info.size} Size Room
							</ThemedText>
						</View>
					</View>
				</View>
				<View style={styles.amenitiesContainer}>
					<ThemedText style={styles.sectionTitle}>Amenities</ThemedText>
					<View style={styles.amenitiesGrid}>
						{Object.keys(currentHotel.amenities)
							.filter((key) => currentHotel.amenities[key]) // Only include amenities that are true
							.map((key, index) => {
								const amenity = amenityOptions[key];
								if (!amenity) return null; // Skip if no matching display option is found

								return (
									<View key={index} style={styles.amenityItem}>
										<Ionicons name={amenity.icon} size={24} color="black" />
										<ThemedText style={styles.amenityText}>
											{amenity.name}
										</ThemedText>
									</View>
								);
							})}
					</View>
				</View>
			</View>
		);

		const RequestsTab: React.FC<Props> = ({ activeItem, userEmail }) => {
			const services = [
				{
					category: "Maintenance",
					items: [
						{ id: "1", name: "Repair Request", icon: "construct-outline" },
						{ id: "2", name: "Plumbing Issue", icon: "water-outline" },
						{ id: "3", name: "Electric", icon: "flash-outline" },
					],
				},
				{
					category: "Housekeeping",
					items: [
						{ id: "4", name: "Room Cleaning", icon: "brush-outline" },
						{ id: "5", name: "Linen Change", icon: "bed-outline" },
						{ id: "6", name: "Toiletries", icon: "cafe-outline" },
					],
				},
				{
					category: "Reception",
					items: [
						{ id: "7", name: "Restaurant", icon: "restaurant-outline" },
						{ id: "8", name: "Taxi Booking", icon: "car-outline" },
						{ id: "9", name: "Tour Info", icon: "map-outline" },
					],
				},
			];

			const handleRequestClick = async (category: string, requestName: string) => {
				try {
					const requestData = {
						user_id: user.userId,
						hotel_id: currentBooking["hotel_id"], // Replace with the actual hotel ID
						department: category, // Update this with the relevant department
						task: requestName, // The task name from the clicked item
					};

					const response = await apiInstance.post(
						"https://p5vfoq23g5ps45rtvky2xydcxe0sbwph.lambda-url.us-east-1.on.aws/api/requests/requests",
						requestData,
						{
							headers: {
								"Content-Type": "application/json",
								accept: "application/json",
							},
						}
					);

					if (response.status === 200 || response.status === 201) {
						Alert.alert("Success", `Your ${requestName} request has been submitted.`);
					} else {
						throw new Error("Failed to submit request");
					}
				} catch (error) {
					console.error(error);
					Alert.alert("Error", "Failed to submit request. Please try again.");
				}
			};

			return (
				<ScrollView style={styles.requestsContainer}>
					{services.map((category) => (
						<View key={category.category} style={styles.categoryContainer}>
							<ThemedText style={styles.categoryTitle}>
								{category.category}
							</ThemedText>
							<View style={styles.requestsGrid}>
								{category.items.map((item) => (
									<TouchableOpacity
										key={item.id}
										style={styles.requestItem}
										onPress={() =>
											handleRequestClick(
												category.category.toLowerCase(),
												item.name
											)
										}
									>
										<View style={styles.requestIcon}>
											<Ionicons
												name={item.icon as any}
												size={24}
												color="black"
											/>
										</View>
										<ThemedText style={styles.requestText}>
											{item.name}
										</ThemedText>
									</TouchableOpacity>
								))}
							</View>
						</View>
					))}
				</ScrollView>
			);
		};

		const CommunityEventsTab = () => {
			return (
				<ScrollView style={styles.eventsContainer}>
					{currentHotel.local_community_projects.map((project, index) => (
						<TouchableOpacity
							key={index}
							style={styles.eventItem}
							onPress={() => setExpandedEvent(expandedEvent === index ? null : index)}
						>
							<View style={styles.eventHeader}>
								<Ionicons
									name={
										expandedEvent === index
											? "chevron-down-outline"
											: "chevron-forward-outline"
									}
									size={24}
									color="black"
									style={styles.eventIcon}
								/>
								<Image
									source={{ uri: project.image_url }}
									style={styles.eventPhoto}
								/>
								<ThemedText style={styles.eventTitle}>{project.title}</ThemedText>
							</View>
							{expandedEvent === index && (
								<ThemedText style={styles.eventDescription}>
									{project.description}
								</ThemedText>
							)}
						</TouchableOpacity>
					))}
				</ScrollView>
			);
		};

		const renderTabContent = () => {
			switch (activeTab) {
				case "Details":
					return <DetailsTab />;
				case "Requests":
					return <RequestsTab />;
				case "Community Events":
					return <CommunityEventsTab />;
				default:
					return null;
			}
		};

		return (
			<View style={styles.container}>
				<View style={styles.tabContainer}>
					{["Details", "Requests", "Community Events"].map((tab) => (
						<TouchableOpacity
							key={tab}
							style={[styles.tab, activeTab === tab && styles.activeTab]}
							onPress={() => setActiveTab(tab)}
						>
							<ThemedText
								style={[styles.tabText, activeTab === tab && styles.activeTabText]}
							>
								{tab}
							</ThemedText>
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.contentContainer}>{renderTabContent()}</View>
			</View>
		);
	};

	const UpcomingTrip = () => {
		const { user } = useUser();
		const [activeTab, setActiveTab] = useState("Details");
		const [showRecommendations, setShowRecommendations] = useState(false);
		const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
		const [travelSummary, setTravelSummary] = useState<TravelSummary | null>(null);
		const [upcomingBookings, setUpcomingBookings] = useState([]);
		const [upcomingHotels, setUpcomingHotels] = useState({});

		const fetchUpcomingBookings = async () => {
			try {
				const booking = await getUpcomingBookings(user.userId);
				console.log("Upcoming booking data = ", booking);
				setUpcomingBookings(booking);
			} catch (error) {
				console.error("Failed to fetch upcoming bookings:", error);
			}
		};

		const fetchUpcomingHotels = async () => {
			try {
				if (!upcomingBookings || !Array.isArray(upcomingBookings)) {
					console.error("No valid upcoming bookings found");
					return;
				}

				const hotelsMap = {};

				await Promise.all(
					upcomingBookings.map(async (booking) => {
						if (!booking["hotel_id"]) {
							console.warn(`Booking missing hotel_id:`, booking);
							return;
						}

						try {
							const hotel = await getHotelById(booking["hotel_id"]);
							hotelsMap[booking["hotel_id"]] = hotel;
						} catch (error) {
							console.error(
								`Failed to fetch hotel for ID ${booking["hotel_id"]}:`,
								error
							);
						}
					})
				);

				setUpcomingHotels(hotelsMap);
			} catch (error) {
				console.error("Failed to fetch hotels:", error);
			}
		};

		const handleFetchRecommendations = async () => {
			try {
				const recommendationResponse: RecommendationResponse = await fetchRecommendations(
					user.userId
				);
				setRecommendations(recommendationResponse.recommendations);
				setTravelSummary(recommendationResponse.travel_summary);
				setShowRecommendations(true);
			} catch (error) {
				console.error("Failed to fetch recommendations:", error);
			}
		};

		useEffect(() => {
			if (user?.userId) {
				fetchUpcomingBookings();
			}
		}, [user?.userId]);

		useEffect(() => {
			if (upcomingBookings.length > 0) {
				fetchUpcomingHotels();
			}
		}, [upcomingBookings]);

		const formatDisplayDate = (dateString) => {
			return format(new Date(dateString), "EEE, MMM d");
		};

		const DetailsTab = () => (
			<ScrollView style={styles.scrollView}>
				<ThemedText style={styles.sectionTitle}>Upcoming Bookings</ThemedText>
				{upcomingBookings.map((booking, index) => {
					const hotel = upcomingHotels[booking.hotel_id];
					return (
						<View key={booking.id || index} style={styles.bookingItem}>
							<ThemedText style={styles.bookingNumber}>{index + 1}.</ThemedText>
							<View style={styles.bookingDetails}>
								<View style={styles.row}>
									<Ionicons name="business-outline" size={20} color="#666" />
									<ThemedText style={styles.hotelName}>
										{hotel
											? `${hotel.name}${
													hotel.location?.city
														? `, ${hotel.location.city}`
														: ""
											  }`
											: "Loading..."}
									</ThemedText>
								</View>
								<View style={styles.row}>
									<Ionicons name="bed-outline" size={20} color="#666" />
									<ThemedText style={styles.roomInfo}>
										{booking.room_info
											? `${booking.room_info.beds} Beds, ${booking.room_info.bathrooms} Bathrooms, ${booking.room_info.size} Size Room`
											: "Room information not available"}
									</ThemedText>
								</View>
								<View style={styles.row}>
									<Ionicons name="calendar-outline" size={20} color="#666" />
									<ThemedText style={styles.dateInfo}>
										{booking.start_date && booking.end_date
											? `${formatDisplayDate(
													booking.start_date
											  )} to ${formatDisplayDate(booking.end_date)}`
											: "Dates not available"}
									</ThemedText>
								</View>
								{booking && (
									<View style={styles.row}>
										<Ionicons name="key-outline" size={20} color="#666" />
										<ThemedText style={styles.locationInfo}>
											Room{" "}
											{booking.room_number || "Room number not available"}
										</ThemedText>
									</View>
								)}
							</View>
						</View>
					);
				})}
			</ScrollView>
		);

		const GetRecommendationsTab = () => {
			const renderActivityIcon = (type) => {
				switch (type?.toLowerCase()) {
					case "activity":
						return "walk-outline";
					case "dining":
						return "restaurant-outline";
					case "attraction":
						return "camera-outline";
					case "entertainment":
						return "ticket-outline";
					default:
						return "star-outline";
				}
			};

			const renderPriorityBadge = (priority) => {
				const priorityColors = {
					high: "#EF4444",
					medium: "#F59E0B",
					low: "#10B981",
				};

				return (
					<View
						style={[
							styles.priorityBadge,
							{ backgroundColor: priorityColors[priority?.toLowerCase()] },
						]}
					>
						<ThemedText style={styles.priorityText}>
							{priority?.toUpperCase()}
						</ThemedText>
					</View>
				);
			};

			return (
				<ScrollView style={styles.scrollView}>
					{!showRecommendations ? (
						<View style={styles.initialView}>
							<View style={styles.summaryCard}>
								<ThemedText style={styles.summaryTitle}>
									Your Travel Profile
								</ThemedText>
								<View style={styles.summaryContent}>
									<View style={styles.summaryItem}>
										<Ionicons
											name="location-outline"
											size={24}
											color="#4F46E5"
										/>
										<View>
											<ThemedText style={styles.summaryLabel}>
												Current Location
											</ThemedText>
											<ThemedText style={styles.summaryValue}>
												{travelSummary?.current_location || "Not available"}
											</ThemedText>
										</View>
									</View>
									<View style={styles.summaryItem}>
										<Ionicons name="time-outline" size={24} color="#4F46E5" />
										<View>
											<ThemedText style={styles.summaryLabel}>
												Average Stay
											</ThemedText>
											<ThemedText style={styles.summaryValue}>
												{travelSummary?.travel_patterns
													?.average_stay_duration || 0}{" "}
												days
											</ThemedText>
										</View>
									</View>
								</View>
							</View>

							<TouchableOpacity
								style={styles.recommendationButton}
								onPress={handleFetchRecommendations}
							>
								<LinearGradient
									colors={["#4F46E5", "#4338CA", "#3730A3"]}
									style={styles.gradient}
								>
									<Ionicons name="compass-outline" size={24} color="white" />
									<ThemedText style={styles.buttonText}>
										Get Personalized Recommendations
									</ThemedText>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.recommendationsContainer}>
							<ThemedText style={styles.recommendationsHeader}>
								Personalized Recommendations
							</ThemedText>

							{recommendations.map((recommendation) => (
								<View
									key={recommendation.recommendation_id}
									style={styles.recommendationCard}
								>
									<View style={styles.recommendationHeader}>
										<View style={styles.iconContainer}>
											<Ionicons
												name={renderActivityIcon(recommendation.type)}
												size={24}
												color="#4F46E5"
											/>
										</View>
										{recommendation.priority &&
											renderPriorityBadge(recommendation.priority)}
									</View>

									<ThemedText style={styles.recommendationTitle}>
										{recommendation.title}
									</ThemedText>

									<ThemedText style={styles.recommendationDescription}>
										{recommendation.description}
									</ThemedText>

									<View style={styles.recommendationDetails}>
										{recommendation.estimated_cost && (
											<View style={styles.detailItem}>
												<Ionicons
													name="cash-outline"
													size={16}
													color="#6B7280"
												/>
												<ThemedText style={styles.detailText}>
													{recommendation.estimated_cost}
												</ThemedText>
											</View>
										)}

										{recommendation.type && (
											<View style={styles.detailItem}>
												<Ionicons
													name="pricetag-outline"
													size={16}
													color="#6B7280"
												/>
												<ThemedText style={styles.detailText}>
													{recommendation.type.charAt(0).toUpperCase() +
														recommendation.type.slice(1)}
												</ThemedText>
											</View>
										)}
									</View>

									<View style={styles.reasonContainer}>
										<ThemedText style={styles.reasonText}>
											{recommendation.reason}
										</ThemedText>
									</View>
								</View>
							))}
						</View>
					)}
				</ScrollView>
			);
		};

		const renderTabContent = () => {
			switch (activeTab) {
				case "Details":
					return <DetailsTab />;
				case "Get Recommendations":
					return <GetRecommendationsTab />;
				default:
					return null;
			}
		};

		return (
			<>
				<View style={styles.tabContainer}>
					{["Details", "Get Recommendations"].map((tab) => (
						<TouchableOpacity
							key={tab}
							style={[styles.tab, activeTab === tab && styles.activeTab]}
							onPress={() => setActiveTab(tab)}
						>
							<ThemedText
								style={[styles.tabText, activeTab === tab && styles.activeTabText]}
							>
								{tab}
							</ThemedText>
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.contentContainer}>{renderTabContent()}</View>
			</>
		);
	};

	const PastTrip = () => {
		const { user } = useUser();
		const [activeTab, setActiveTab] = useState("Details");
		const [showRecommendations, setShowRecommendations] = useState(false);
		const [pastBookings, setPastBookings] = useState([]);
		const [pastHotels, setPastHotels] = useState({});

		const fetchPastBookings = async () => {
			try {
				const booking = await getPastBookings(user.userId);
				console.log("Past booking data = ", booking);
				setPastBookings(booking);
			} catch (error) {
				console.error("Failed to fetch past bookings:", error);
			}
		};

		const fetchPastHotels = async () => {
			try {
				if (!pastBookings || !Array.isArray(pastBookings)) {
					console.error("No valid past bookings found");
					return;
				}

				const hotelsMap = {};

				await Promise.all(
					pastBookings.map(async (booking) => {
						if (!booking["hotel_id"]) {
							console.warn(`Booking missing hotel_id:`, booking);
							return;
						}

						try {
							const hotel = await getHotelById(booking["hotel_id"]);
							hotelsMap[booking["hotel_id"]] = hotel;
						} catch (error) {
							console.error(
								`Failed to fetch hotel for ID ${booking["hotel_id"]}:`,
								error
							);
						}
					})
				);

				setPastHotels(hotelsMap);
			} catch (error) {
				console.error("Failed to fetch hotels:", error);
			}
		};

		useEffect(() => {
			if (user?.userId) {
				fetchPastBookings();
			}
		}, [user?.userId]);

		useEffect(() => {
			if (pastBookings.length > 0) {
				fetchPastHotels();
			}
		}, [pastBookings]);

		// Helper function to format the date
		const formatDisplayDate = (dateString) => {
			return format(new Date(dateString), "EEE, MMM d");
		};

		const DetailsTab = () => (
			<ScrollView style={styles.scrollView}>
				<ThemedText style={styles.sectionTitle}>Past Bookings</ThemedText>
				{pastBookings.map((booking, index) => {
					const hotel = pastHotels[booking.hotel_id];
					console.log("Hotel = ", hotel);
					return (
						<View key={booking.id || index} style={styles.bookingItem}>
							<ThemedText style={styles.bookingNumber}>{index + 1}.</ThemedText>
							<View style={styles.bookingDetails}>
								<View style={styles.row}>
									<Ionicons name="business-outline" size={20} color="#666" />
									<ThemedText style={styles.hotelName}>
										{hotel
											? `${hotel.name}${
													hotel.location?.city
														? `, ${hotel.location.city}`
														: ""
											  }`
											: "Loading..."}
									</ThemedText>
								</View>
								<View style={styles.row}>
									<Ionicons name="bed-outline" size={20} color="#666" />
									<ThemedText style={styles.roomInfo}>
										{booking.room_info
											? `${booking.room_info.beds} Beds, ${booking.room_info.bathrooms} Bathrooms, ${booking.room_info.size} Size Room`
											: "Room information not available"}
									</ThemedText>
								</View>
								<View style={styles.row}>
									<Ionicons name="calendar-outline" size={20} color="#666" />
									<ThemedText style={styles.dateInfo}>
										{booking.start_date && booking.end_date
											? `${formatDisplayDate(
													booking.start_date
											  )} to ${formatDisplayDate(booking.end_date)}`
											: "Dates not available"}
									</ThemedText>
								</View>
								{booking && (
									<View style={styles.row}>
										<Ionicons name="key-outline" size={20} color="#666" />
										<ThemedText style={styles.locationInfo}>
											Room{" "}
											{booking.room_number || "Room number not available"}
										</ThemedText>
									</View>
								)}
							</View>
						</View>
					);
				})}
			</ScrollView>
		);

		const ContactHotelTab = () => (
			<View style={styles.contactContainer}>
				<ThemedText style={styles.contactTitle}>
					Have general inquiries about your past stay?
				</ThemedText>
				<View style={styles.contactMethod}>
					<Ionicons name="call-outline" size={24} color="#4c669f" />
					<ThemedText style={styles.contactInfo}>+1 (555) 123-4567</ThemedText>
				</View>
				<View style={styles.contactMethod}>
					<Ionicons name="mail-outline" size={24} color="#4c669f" />
					<ThemedText style={styles.contactInfo}>support@hotel.com</ThemedText>
				</View>
				<TouchableOpacity style={styles.chatbotButton}>
					<Ionicons name="chatbubbles-outline" size={24} color="white" />
					<ThemedText style={styles.chatbotButtonText}>
						Chat with our AI Assistant
					</ThemedText>
				</TouchableOpacity>
			</View>
		);

		const renderTabContent = () => {
			switch (activeTab) {
				case "Details":
					return <DetailsTab />;
				case "Contact Hotel":
					return <ContactHotelTab />;
				default:
					return null;
			}
		};

		return (
			<>
				<View style={styles.tabContainer}>
					{["Details", "Contact Hotel"].map((tab) => (
						<TouchableOpacity
							key={tab}
							style={[styles.tab, activeTab === tab && styles.activeTab]}
							onPress={() => setActiveTab(tab)}
						>
							<ThemedText
								style={[styles.tabText, activeTab === tab && styles.activeTabText]}
							>
								{tab}
							</ThemedText>
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.contentContainer}>{renderTabContent()}</View>
			</>
		);
	};

	const renderContent = () => {
		switch (activeItem.title) {
			case "Ongoing Trips":
				return <OngoingTrip />;
			case "Upcoming Trips":
				return <UpcomingTrip />;
			case "Past Trips":
				return <PastTrip />;
			default:
				return null;
		}
	};

	return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	tab: {
		padding: 10,
	},
	activeTab: {
		borderBottomWidth: 2,
		borderBottomColor: "#007AFF",
	},
	tabText: {
		fontSize: 16,
	},
	activeTabText: {
		fontWeight: "bold",
		color: "#007AFF",
	},
	contentContainer: {
		flex: 1,
		padding: 20,
	},
	detailsContainer: {
		flex: 1,
	},
	dateContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	dateItem: {
		alignItems: "center",
	},
	dateCalendarStyle: {
		flexDirection: "row",
		gap: 10,
	},
	dateLabel: {
		// fontFamily: "EffraFamily",
		// fontSize: 26,
		fontWeight: "bold",
		marginTop: 0,
		marginBottom: 8,
	},
	dateText: {
		// fontSize: 16,
		color: "#666",
	},
	verticalDivider: {
		width: 2,
		backgroundColor: "#e0e0e0",
	},
	sectionTitle: {
		// fontFamily: "EffraFamily",
		// fontSize: 22,
		fontWeight: "bold",
		marginBottom: 16,
	},
	roomInfoContainer: {
		marginTop: 14,
		marginHorizontal: 10,
		marginBottom: 20,
	},
	roomDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	roomDetailItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	roomDetailText: {
		marginLeft: 5,
		// fontFamily: "EffraFamily",
		// fontSize: 16,
	},
	amenitiesContainer: {
		marginBottom: 10,
		marginHorizontal: 10,
	},
	amenitiesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	amenityItem: {
		flexDirection: "row",
		alignItems: "center",
		width: "48%",
		marginBottom: 8,
	},
	amenityText: {
		marginLeft: 5,
		// fontFamily: "EffraFamily",
		// fontSize: 16,
		marginBottom: 6,
	},
	requestsContainer: {
		flex: 1,
	},
	categoryContainer: {
		marginBottom: 20,
		paddingHorizontal: 20,
	},
	categoryTitle: {
		// fontFamily: "EffraFamily",
		// fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	requestsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	requestItem: {
		width: "30%",
		alignItems: "center",
		marginBottom: 15,
	},
	requestIcon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
	},
	requestText: {
		// fontFamily: "EffraFamily",
		fontSize: 16,
		textAlign: "center",
		marginTop: 5,
	},
	eventsContainer: {
		flex: 1,
		padding: 20,
	},
	eventItem: {
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		paddingBottom: 15,
	},
	eventHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	eventIcon: {
		marginRight: 10,
	},
	eventPhoto: {
		width: 60,
		height: 60,
		borderRadius: 5,
		marginRight: 10,
	},
	eventTitle: {
		// fontFamily: "EffraFamily",
		// fontSize: 22,
		fontWeight: "bold",
		flex: 1,
	},
	eventDescription: {
		// fontFamily: "EffraFamily",
		// fontSize: 18,
		marginTop: 10,
		paddingLeft: 34, // Aligns with the title, accounting for the icon width
	},
	scrollView: {
		flex: 1,
	},
	bookingItem: {
		flexDirection: "row",
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		paddingBottom: 10,
	},
	bookingNumber: {
		// fontFamily: "EffaFamily",
		// fontSize: 18,
		fontWeight: "bold",
		marginRight: 10,
	},
	bookingDetails: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	hotelName: {
		// fontFamily: "EffaFamily",
		// fontSize: 18,
		fontWeight: "600",
		marginLeft: 10,
	},
	roomInfo: {
		// fontFamily: "EffaFamily",
		// fontSize: 16,
		marginLeft: 10,
	},
	locationInfo: {
		marginHorizontal: 10,
	},
	dateInfo: {
		// fontFamily: "EffaFamily",
		// fontSize: 16,
		marginLeft: 10,
	},
	recommendationButton: {
		borderRadius: 25,
		overflow: "hidden",
		marginBottom: 20,
	},
	gradient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 20,
	},
	buttonText: {
		// fontFamily: "EffaFamily",
		color: "white",
		// fontSize: 18,
		fontWeight: "bold",
		marginLeft: 10,
	},
	recommendationsList: {
		gap: 16,
	},
	recommendationsTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 8,
	},
	recommendationItem: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		padding: 16,
		gap: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	recommendationText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111827",
	},
	recommendationDescription: {
		fontSize: 14,
		color: "#4B5563",
		lineHeight: 20,
	},
	recommendationReason: {
		fontSize: 14,
		color: "#6B7280",
		fontStyle: "italic",
		marginTop: 4,
	},
	contactContainer: {
		padding: 20,
	},
	contactTitle: {
		// fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	contactMethod: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	contactInfo: {
		// fontSize: 18,
		marginLeft: 15,
	},
	chatbotButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#1B74E4",
		borderRadius: 25,
		paddingVertical: 12,
		paddingHorizontal: 20,
		marginTop: 20,
	},
	chatbotButtonText: {
		color: "white",
		// fontSize: 18,
		fontWeight: "bold",
		marginLeft: 10,
	},
	initialView: {
		padding: 16,
		gap: 24,
	},
	summaryCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	summaryTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 16,
	},
	summaryContent: {
		gap: 16,
	},
	summaryItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	summaryLabel: {
		fontSize: 14,
		color: "#6B7280",
	},
	summaryValue: {
		fontSize: 16,
		fontWeight: "500",
		color: "#111827",
	},
	recommendationButton: {
		borderRadius: 12,
		overflow: "hidden",
	},
	gradient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		gap: 8,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
	recommendationsContainer: {
		padding: 16,
		gap: 16,
	},
	recommendationsHeader: {
		fontSize: 24,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 8,
	},
	recommendationCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	recommendationHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	iconContainer: {
		backgroundColor: "#EEF2FF",
		padding: 8,
		borderRadius: 8,
	},
	priorityBadge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	priorityText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "600",
	},
	recommendationTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 8,
	},
	recommendationDescription: {
		fontSize: 16,
		color: "#4B5563",
		lineHeight: 24,
		marginBottom: 16,
	},
	recommendationDetails: {
		flexDirection: "row",
		gap: 16,
		marginBottom: 16,
	},
	detailItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	detailText: {
		fontSize: 14,
		color: "#6B7280",
	},
	reasonContainer: {
		backgroundColor: "#F3F4F6",
		borderRadius: 8,
		padding: 12,
	},
	reasonText: {
		fontSize: 14,
		color: "#4B5563",
		fontStyle: "italic",
	},
});

export default TabView;
