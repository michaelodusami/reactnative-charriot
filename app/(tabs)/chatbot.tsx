import SafeArea from "@/components/SafeArea";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BookingTypeContext } from "@/components/BookingTypeContext";

const quickActions = [
	{
		id: "1",
		title: "Emergency care",
		description: "Immediate organization of the necessary help",
		icon: "medical-bag",
	},
	{
		id: "2",
		title: "Symptom identification",
		description: "Gathering information, planning further actions",
		icon: "clipboard-pulse",
	},
	{
		id: "3",
		title: "Providing instructions",
		description: "Help with preparing for specific or general tests",
		icon: "file-document-outline",
	},
];

const ChatBotScreen = () => {
	const { bookingType } = useContext(BookingTypeContext);

	const { colors } = useTheme(); // Access theme colors
	const renderQuickAction = ({ item }) => (
		<TouchableOpacity style={styles.actionCard}>
			<View style={styles.iconContainer}>
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
			<ThemedText style={styles.bookingTypeStyle}>Booking Type: {bookingType}</ThemedText>
			<ThemedText style={styles.sectionTitle}>[ Quick actions ]</ThemedText>

			<FlatList
				data={quickActions}
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
				/>
			</View>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	header: {
		marginTop: 16,
		marginBottom: 24,
	},
	greetingText: {
		fontSize: 28,
		fontWeight: "bold",
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
	bookingTypeStyle: {
		marginBottom: 16,
		fontSize: 16,
		fontWeight: "900",
		fontFamily: "Poppins",
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
		marginTop: 16,
		marginBottom: 16,
	},
	input: {
		padding: 16,
		borderRadius: 12,
		fontSize: 16,
		fontFamily: "Poppins",
	},
});

export default ChatBotScreen;
