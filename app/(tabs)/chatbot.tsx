import SafeArea from "@/components/SafeArea";
import { ThemedText } from "@/components/ThemedText";
import { useTheme, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
	const [bookingType, setBookingType] = useState<string>("current");
	const [inputText, setInputText] = useState<string>("");
	const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: string }>>(
		[]
	);
	const [showOptions, setShowOptions] = useState<boolean>(true); // Controls visibility of quick actions & booking types
	const { colors } = useTheme(); // Access theme colors

	const handleTypeChange = (type: string) => {
		setBookingType(type);
	};

	const getQuickActions = () => {
		return quickActionsMap[bookingType] || [];
	};

	const handleSendMessage = (message: string) => {
		if (message.trim() === "") return;

		const userMessage = {
			id: (messages.length + 1).toString(),
			text: message,
			sender: "user",
		};

		const fakeResponse = generateFakeResponse(message);

		setMessages((prevMessages) => [...prevMessages, userMessage, fakeResponse]);
		setInputText("");
		setShowOptions(false);
	};

	const generateFakeResponse = (userText: string) => {
		// Simulate different responses based on the input message
		const responses = [
			"Sure, I can help you with that!",
			"Let me get that information for you.",
			"I'll notify the hotel staff immediately.",
			"Can you provide more details about your request?",
		];

		const responseText =
			responses[Math.floor(Math.random() * responses.length)] ||
			"I'm not sure, let me check.";

		return {
			id: (messages.length + 2).toString(),
			text: responseText,
			sender: "bot",
		};
	};

	useFocusEffect(
		useCallback(() => {
			// Reset all the states when the screen gains focus
			setInputText("");
			setShowOptions(true);
			setMessages([]);
			setBookingType("current");
		}, [])
	);

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
			<View style={styles.header}>
				<ThemedText style={styles.greetingText}>Hey, John</ThemedText>
				<ThemedText style={styles.subHeadingText}>How I can help you?</ThemedText>
			</View>

			{showOptions && (
				<>
					<View style={styles.bookingTypeContainer}>
						<ThemedText style={styles.sectionTitle}>Booking Type:</ThemedText>
						<View style={styles.bookingTypeRow}>
							{["current", "upcoming"].map((type) => (
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
						data={getQuickActions()}
						renderItem={renderQuickAction}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.actionList}
					/>
				</>
			)}

			<FlatList
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.messageList}
			/>

			<View style={styles.inputContainer}>
				<TextInput
					style={[
						styles.input,
						{ backgroundColor: colors.background, color: colors.text },
					]}
					value={inputText}
					onChangeText={(text) => {
						setInputText(text);
						if (text.trim() !== "") setShowOptions(false);
					}}
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
	container: { flex: 1 },
	header: {
		marginTop: 16,
		marginBottom: 24,
		paddingHorizontal: 16,
	},
	greetingText: {
		fontSize: 28,
		fontWeight: "bold",
		lineHeight: 30,
	},
	subHeadingText: {
		fontSize: 22,
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
		fontSize: 16,
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
	sectionTitle: {
		marginBottom: 16,
		fontSize: 16,
		fontWeight: "500",
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
		fontSize: 16,
		fontWeight: "600",
	},
	actionDescription: {
		fontSize: 14,
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
		fontSize: 16,
		fontFamily: "Poppins",
	},
	iconButton: {
		marginLeft: 8,
	},
});

export default ChatBotScreen;
