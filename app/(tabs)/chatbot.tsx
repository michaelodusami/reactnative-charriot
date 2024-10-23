import React, { useCallback, useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeArea from "@/components/SafeArea";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/providers/UserContext";
import { useTheme } from "@react-navigation/native";
import {
	getCurrentBookings,
	getUpcomingBookings,
	getPastBookings,
	sendChatMessage,
	getUserInteractions,
} from "@/server/server";
import { capitalizeAndGetUsername } from "@/functions/userFunctions";

const quickActionsMap: any = {
	current: [
		{
			id: "1",
			title: "Check-In",
			description: "Prepare for your check-in process",
			icon: "door-open",
		},
		{
			id: "2",
			title: "Room Service",
			description: "Request items or services for your room",
			icon: "room-service-outline",
		},
		{
			id: "3",
			title: "Local Attractions",
			description: "Explore nearby attractions",
			icon: "map-marker-radius",
		},
	],
	past: [
		{
			id: "1",
			title: "Leave a Review",
			description: "Share your experience about your stay",
			icon: "star-outline",
		},
		{
			id: "2",
			title: "Download Invoice",
			description: "Get a copy of your payment invoice",
			icon: "file-document-outline",
		},
	],
	upcoming: [
		{
			id: "1",
			title: "Pre-Check-In",
			description: "Complete your check-in before arrival",
			icon: "check-circle-outline",
		},
		{
			id: "2",
			title: "Room Preferences",
			description: "Customize your room before arrival",
			icon: "tune",
		},
		{
			id: "3",
			title: "Contact Hotel",
			description: "Reach out to the hotel for assistance",
			icon: "phone-outline",
		},
	],
};

const ChatBotScreen = () => {
	const { user } = useUser();
	const [bookingType, setBookingType] = useState<string>("current");
	const [inputText, setInputText] = useState<string>("");
	const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: string }>>(
		[]
	);
	const [showOptions, setShowOptions] = useState<boolean>(true); // Controls visibility of quick actions
	const { colors } = useTheme();
	const flatListRef = useRef<FlatList>(null); // Reference to the FlatList for scrolling

	// Scroll to the bottom of the list whenever new messages are added
	const scrollToBottom = () => {
		if (flatListRef.current) {
			flatListRef.current.scrollToEnd({ animated: true });
		}
	};

	// Fetch previous chat when screen is opened or revisited
	useEffect(() => {
		const loadPreviousChats = async () => {
			try {
				const previousChats = await getUserInteractions(user.userId, bookingType);
				const formattedMessages = previousChats.reduce((acc, chat) => {
					if (chat.user_query) {
						acc.push({
							id: `${chat.interaction_id}-user`,
							text: chat.user_query,
							sender: "user",
						});
					}
					if (chat.response_content) {
						acc.push({
							id: `${chat.interaction_id}-bot`,
							text: chat.response_content,
							sender: "bot",
						});
					}
					return acc;
				}, []);

				setMessages(formattedMessages);

				// Hide quick actions if there are previous chats
				if (formattedMessages.length > 0) {
					setShowOptions(false);
				}

				// Scroll to bottom after loading previous chats
				scrollToBottom();
			} catch (error) {
				console.error("Error fetching previous chats:", error);
			}
		};

		loadPreviousChats();
	}, [bookingType, user.userId]);

	// Handle booking type change
	const handleTypeChange = (type: string) => {
		setBookingType(type);
		setMessages([]); // Clear previous messages when booking type is changed
		setShowOptions(true); // Show quick actions after booking type change
	};

	// Back to default chat page (reset to quick actions)
	const handleBackToDefault = () => {
		setMessages([]); // Clear messages
		setShowOptions(true); // Show quick actions
		setInputText(""); // Clear input text
	};

	// Get booking ID based on the booking type
	const fetchBookingId = async () => {
		let bookingData;
		try {
			if (bookingType === "current") {
				bookingData = await getCurrentBookings(user.userId);
			} else if (bookingType === "upcoming") {
				bookingData = await getUpcomingBookings(user.userId);
			} else if (bookingType === "past") {
				bookingData = await getPastBookings(user.userId);
			}
			return bookingData?.[0]?.booking_id || null; // Return the first booking's ID
		} catch (error) {
			console.error("Error fetching booking:", error);
			return null;
		}
	};

	// Send a new message
	const handleSendMessage = async (message: string) => {
		if (message.trim() === "") return;

		const userMessage = { id: (messages.length + 1).toString(), text: message, sender: "user" };
		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setInputText("");
		setShowOptions(false);

		try {
			const bookingId = await fetchBookingId();
			if (bookingId) {
				const response = await sendChatMessage({
					user_id: user.userId,
					booking_id: bookingId,
					question: message,
					booking_type: bookingType,
				});

				if (response && response.response_content) {
					const botMessage = {
						id: (messages.length + 2).toString(),
						text: response.response_content || "Sorry, I couldn't process that.",
						sender: "bot",
					};
					setMessages((prevMessages) => [...prevMessages, botMessage]);
				} else {
					setMessages((prevMessages) => [
						...prevMessages,
						{
							id: (messages.length + 2).toString(),
							text: "Unexpected response structure.",
							sender: "bot",
						},
					]);
				}
			} else {
				setMessages((prevMessages) => [
					...prevMessages,
					{
						id: (messages.length + 2).toString(),
						text: "No booking data found.",
						sender: "bot",
					},
				]);
			}
		} catch (error) {
			console.error("Error sending chat message:", error);
			setMessages((prevMessages) => [
				...prevMessages,
				{
					id: (messages.length + 2).toString(),
					text: "Error processing your request.",
					sender: "bot",
				},
			]);
		}

		// Scroll to the bottom after sending a message
		scrollToBottom();
	};

	const renderQuickAction = ({ item }: any) => (
		<TouchableOpacity onPress={() => handleSendMessage(item.title)} style={styles.actionCard}>
			<View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
				<Icon name={item.icon} size={24} color="white" />
			</View>
			<View style={styles.actionTextContainer}>
				<ThemedText style={styles.actionTitle}>{item.title}</ThemedText>
				<ThemedText style={styles.actionDescription}>{item.description}</ThemedText>
			</View>
		</TouchableOpacity>
	);

	const renderMessage = ({ item }: any) => {
		const isUser = item.sender === "user";
		return (
			<View
				style={[
					styles.messageContainer,
					{
						alignSelf: isUser ? "flex-end" : "flex-start",
						backgroundColor: isUser ? colors.primary : colors.card,
					},
				]}
			>
				<ThemedText style={{ color: isUser ? colors.background : colors.text }}>
					{item.text}
				</ThemedText>
			</View>
		);
	};

	return (
		<SafeArea style={styles.container}>
			<TouchableOpacity onPress={handleBackToDefault}>
				<Icon name="arrow-left" size={24} color={colors.primary} />
			</TouchableOpacity>
			<View style={styles.header}>
				<ThemedText style={styles.greetingText}>
					Hey, {capitalizeAndGetUsername(user.userId)}
				</ThemedText>
				<ThemedText style={styles.subHeadingText}>How can I help you today?</ThemedText>
			</View>

			<FlatList
				ref={flatListRef}
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.messageList}
				onContentSizeChange={scrollToBottom} // Automatically scroll to bottom when content changes
			/>

			{showOptions && (
				<>
					<View style={styles.bookingTypeContainer}>
						<ThemedText style={styles.sectionTitle}>Booking Type:</ThemedText>
						<View style={styles.bookingTypeRow}>
							{["current", "past", "upcoming"].map((type) => (
								<TouchableOpacity
									key={type}
									onPress={() => handleTypeChange(type)}
									style={[
										styles.bookingTypeButton,
										{
											backgroundColor:
												bookingType === type
													? colors.primary
													: colors.background,
										},
									]}
								>
									<ThemedText
										style={[
											styles.bookingTypeText,
											{
												color:
													bookingType === type
														? colors.background
														: colors.text,
											},
										]}
									>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</ThemedText>
								</TouchableOpacity>
							))}
						</View>
					</View>

					<FlatList
						data={quickActionsMap[bookingType] || []}
						renderItem={renderQuickAction}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.actionList}
					/>
				</>
			)}

			<View style={styles.inputContainer}>
				<TextInput
					style={[
						styles.input,
						{ backgroundColor: colors.background, color: colors.text },
					]}
					value={inputText}
					onChangeText={(text) => setInputText(text)}
					placeholder="Tell us about your request..."
					placeholderTextColor={colors.placeholder}
				/>
				<TouchableOpacity
					onPress={() => handleSendMessage(inputText)}
					style={styles.iconButton}
				>
					<Icon name="send" size={24} color={colors.primary} />
				</TouchableOpacity>
			</View>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	header: {
		// flexDirection: "row",
		alignItems: "center",
		// marginBottom: 24,
	},
	greetingText: {
		// fontSize: 23,
		fontWeight: "bold",
		lineHeight: 30,
		marginLeft: 10,
	},
	subHeadingText: {
		// fontSize: 22,
		marginTop: 8,
	},
	messageList: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	messageContainer: {
		padding: 12,
		borderRadius: 8,
		marginVertical: 4,
		maxWidth: "70%",
	},
	bookingTypeContainer: {
		marginBottom: 16,
	},
	bookingTypeRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	bookingTypeButton: {
		flex: 1,
		paddingVertical: 8,
		alignItems: "center",
		borderRadius: 8,
		marginHorizontal: 4,
	},
	bookingTypeText: {
		// fontSize: 16,
		fontWeight: "600",
	},
	actionList: {
		paddingBottom: 16,
	},
	actionCard: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	actionTextContainer: {
		flex: 1,
	},
	actionTitle: {
		// fontSize: 16,
		fontWeight: "600",
	},
	actionDescription: {
		// fontSize: 14,
		marginTop: 4,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 12,
		margin: 16,
	},
	input: {
		flex: 1,
		// fontSize: 16,
		// fontFamily: "Poppins",
	},
	iconButton: {
		marginLeft: 8,
	},
});

export default ChatBotScreen;
