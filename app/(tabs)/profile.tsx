import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import SafeArea from "@/components/SafeArea";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ConfigurationSection from "@/components/ConfigurationScreen";
import SettingsSection from "@/components/SettingsScreen";
import { useUser } from "@/providers/UserContext";
import { capitalizeAndGetUsername } from "@/functions/userFunctions";
import { Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// Section Components

// const PersonalInfoSection = () => (
// 	<View style={styles.contentView}>
// 		<Text>Personal Information Content</Text>
// 		{/* Replace with actual personal info form */}
// 	</View>
// );

// const AnalyticsSection = () => (
// 	<View style={styles.contentView}>
// 		<Text>Analytics Content</Text>
// 		{/* Replace with actual analytics data */}
// 	</View>
// );

const Profile = () => {
	const { user } = useUser();
	const [selectedSection, setSelectedSection] = useState("Configuration");

	// Function to render selected section component
	const renderSection = () => {
		switch (selectedSection) {
			case "Configuration":
				return <ConfigurationSection />;
			case "Settings":
				return <SettingsSection />;
			// case "Analytics":
			// 	return <AnalyticsSection />;
			default:
				return <ConfigurationSection />;
		}
	};

	if (!user.userId) {
		return <Redirect href={"/(auth)/welcome"} />;
	}

	const getLoyaltyIconColor = (loyaltyProgram) => {
		switch (loyaltyProgram) {
			case "gold":
				return "#B7791F";
			case "silver":
				return "#4A5568";
			case "bronze":
				return "#9C4221";
			default:
				return "#4A5568";
		}
	};

	return (
		<SafeArea style={styles.container}>
			{/* Profile Header */}
			<View style={styles.headerContainer}>
				<Image
					source={require("../../assets/images/pereginebrand.webp")}
					style={styles.profileImage}
				/>
				<ThemedText style={styles.userName}>
					{capitalizeAndGetUsername(user.userId)}
				</ThemedText>
				<ThemedText style={styles.email}>{user.userId}</ThemedText>

				{/* Loyalty Badge */}
				<View
					style={[
						styles.loyaltyBadge,
						user.loyalty_program === "gold" && styles.goldBadge,
						user.loyalty_program === "silver" && styles.silverBadge,
						user.loyalty_program === "bronze" && styles.bronzeBadge,
					]}
				>
					<Ionicons
						name="diamond-outline"
						size={16}
						color={getLoyaltyIconColor(user.loyalty_program)}
						style={styles.loyaltyIcon}
					/>
					<ThemedText
						style={[
							styles.loyaltyText,
							user.loyalty_program === "gold" && styles.goldText,
							user.loyalty_program === "silver" && styles.silverText,
							user.loyalty_program === "bronze" && styles.bronzeText,
						]}
					>
						{user.loyalty_program?.toUpperCase()} MEMBER
					</ThemedText>
				</View>
			</View>

			{/* Top Tab Navigation */}
			<View style={styles.tabContainer}>
				{["Configuration", "Settings"].map((section) => (
					<TouchableOpacity
						key={section}
						style={[
							styles.tabButton,
							selectedSection === section && styles.activeTabButton,
						]}
						onPress={() => setSelectedSection(section)}
					>
						<ThemedText
							style={[
								styles.tabText,
								selectedSection === section && styles.activeTabText,
							]}
						>
							{section}
						</ThemedText>
					</TouchableOpacity>
				))}
			</View>

			{/* Render selected section content */}
			<View style={styles.sectionContentContainer}>{renderSection()}</View>
		</SafeArea>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	headerContainer: {
		alignItems: "center",
		paddingVertical: 40,
	},
	editText: {
		alignSelf: "flex-end",
		padding: 10,
		// color: "#555",
		fontWeight: "bold",
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	userName: {
		// fontFamily: "EffraFamily",
		// fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	email: {
		color: "#666",
		// fontFamily: "EffraFamily",
		// fontSize: 16,
	},
	loyaltyBadge: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	goldBadge: {
		backgroundColor: "#FEF3C7",
		borderColor: "#D97706",
		borderWidth: 1,
	},
	silverBadge: {
		backgroundColor: "#F1F5F9",
		borderColor: "#64748B",
		borderWidth: 1,
	},
	bronzeBadge: {
		backgroundColor: "#FDE7DD",
		borderColor: "#9C4221",
		borderWidth: 1,
	},
	loyaltyIcon: {
		marginRight: 8,
	},
	loyaltyText: {
		fontWeight: "600",
		fontSize: 14,
		letterSpacing: 0.5,
	},
	goldText: {
		color: "#92400E",
	},
	silverText: {
		color: "#1E293B",
	},
	bronzeText: {
		color: "#7C2D12",
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
		// backgroundColor: "#fff",
	},
	tabButton: {
		paddingVertical: -10,
		paddingHorizontal: 15,
	},
	activeTabButton: {
		borderBottomWidth: 3,
		borderBottomColor: "#FA5A5A",
	},
	tabText: {
		// fontSize: 16,
		fontWeight: "bold",
	},
	activeTabText: {
		//color: "black",
	},
	sectionContentContainer: {
		flex: 1,
	},
	scrollView: {
		padding: 15,
	},
	contentView: {
		padding: 15,
	},
	sectionTitle: {
		// fontFamily: "EffraFamily",
		// fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	preferenceItem: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "white",
	},
	saveButton: {
		backgroundColor: "white",
		paddingVertical: 15,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
	},
	saveButtonText: {
		color: "black",
		fontWeight: "bold",
		// fontFamily: "EffraFamily",
		// fontSize: 16,
	},
	optionRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	optionButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 15,
		backgroundColor: "#EAEAEA",
		marginRight: 10,
		marginBottom: 10,
		minWidth: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	toggleButton: {
		backgroundColor: "#FA5A5A",
	},
	optionText: {
		// fontFamily: "EffraFamily",
		// fontSize: 28,
		fontWeight: "bold",
		color: "#333",
	},
});

export default Profile;
