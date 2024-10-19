import SafeArea from "@/components/SafeArea";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BookingTypeContext } from "@/components/BookingTypeContext";

const quickActionsMap = {
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
	const { bookingType, setBookingType } = useContext(BookingTypeContext);
	const { colors } = useTheme(); // Access theme colors

	const handleTypeChange = (type: any) => {
		setBookingType(type);
	};

	const getQuickActions = () => {
		return quickActionsMap[bookingType] || [];
	};

	const renderQuickAction = ({ item }) => (
		<TouchableOpacity style={styles.actionCard}>
			<View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
				<Icon name={item.icon} size={24} color="white" />
			</View>
			<View style={styles.actionTextContainer}>
				<ThemedText style={styles.actionTitle}>{item.title}</ThemedText>
				<ThemedText style={styles.actionDescription}>{item.description}</ThemedText>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeArea style={styles.container}>
			<View style={styles.header}>
				<ThemedText style={styles.greetingText}>Hey, John</ThemedText>
				<ThemedText style={styles.subHeadingText}>How I can help you?</ThemedText>
			</View>

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
										bookingType === type ? colors.primary : colors.background,
								},
							]}
						>
							<ThemedText
								style={[
									styles.bookingTypeText,
									{
										color:
											bookingType === type ? colors.background : colors.text,
									},
								]}
							>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</ThemedText>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* <ThemedText style={styles.sectionTitle}>[ Quick actions ]</ThemedText> */}

			<FlatList
				data={getQuickActions()}
				renderItem={renderQuickAction}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.actionList}
			/>

			<View style={styles.inputContainer}>
				<TextInput
					style={[
						styles.input,
						{ backgroundColor: colors.background, color: colors.text },
					]}
					placeholder="Tell us about your request..."
					placeholderTextColor={colors.placeholder}
				/>
				<TouchableOpacity style={styles.iconButton}>
					<Icon name="microphone" size={24} color={colors.primary} />
				</TouchableOpacity>
			</View>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	container: {},
	header: {
		marginTop: 16,
		marginBottom: 24,
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
	sectionTitle: {
		marginBottom: 16,
		fontSize: 16,
		fontWeight: "500",
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
		borderColor: "#ddd",
		paddingHorizontal: 12,
		paddingVertical: 8,
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
