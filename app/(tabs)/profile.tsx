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

	return (
		<SafeArea style={styles.container}>
			{/* Profile Header */}
			<View style={styles.headerContainer}>
				{/* <TouchableOpacity onPress={() => alert("Edit Profile Pressed")}>
					<ThemedText style={styles.editText}>EDIT PROFILE</ThemedText>
				</TouchableOpacity> */}
				<Image
					source={require("../../assets/images/Chariott.png")}
					style={styles.profileImage}
				/>
				<ThemedText style={styles.userName}>Kelly Peter</ThemedText>
				<ThemedText style={styles.email}>kely@magix.com</ThemedText>
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
		fontFamily: 'EffraFamily',
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	email: {
		color: "#666",
		fontFamily: 'EffraFamily',
		fontSize: 16,
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
		// backgroundColor: "#fff",
	},
	tabButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	activeTabButton: {
		borderBottomWidth: 3,
		borderBottomColor: "#FA5A5A",
	},
	tabText: {
		fontSize: 16,
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
		fontFamily: 'EffraFamily',
		fontSize: 22,
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
		fontFamily: 'EffraFamily',
		fontSize: 16,
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
		fontFamily: 'EffraFamily',
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
	},
});

export default Profile;
