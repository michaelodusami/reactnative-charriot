import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Switch,
	TouchableOpacity,
	Alert,
	ScrollView,
	Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteAccount } from "@/server/requests";
import { useUser } from "@/providers/UserContext";
import { Redirect } from "expo-router";
import { useDyslexia } from "@/providers/FontContext";
import { useRouter } from "expo-router";

const SettingsSection = () => {
	const { user, clearUser } = useUser();
	const [textSize, setTextSize] = useState(16);
	const { dyslexiaMode, toggleDyslexiaMode } = useDyslexia();
	const [highContrastMode, setHighContrastMode] = useState(false);
	const [voiceGuidance, setVoiceGuidance] = useState(false);

	// Inside the component:
	const router = useRouter();

	const handleDeleteAccount = () => {
		Alert.alert(
			"Delete Account",
			"Are you sure you want to delete your account? This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: async () => {
						const response = await deleteAccount(user.userId);
						if (response) {
							clearUser();
						}
					},
					style: "destructive",
				},
			]
		);
	};

	const handleSignOutAccount = () => {
		Alert.alert("Sign Out", "Are you sure you want to sign out?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Sign out",
				onPress: () => {
					clearUser();
				},
				style: "destructive",
			},
		]);
	};

	return (
		<ScrollView style={styles.scrollView}>
			{/* Accessibility Section */}
			<ThemedText style={styles.sectionTitle}>Accessibility</ThemedText>

			{/* <SettingItem
				icon="format-size"
				title="Text Size"
				description={`Current size: ${textSize}px`}
			>
				<Slider
					style={styles.slider}
					minimumValue={12}
					maximumValue={24}
					step={1}
					value={textSize}
					onValueChange={setTextSize}
					minimumTrackTintColor="#FA5A5A"
					maximumTrackTintColor="#000000"
					thumbTintColor="#FA5A5A"
				/>
			</SettingItem> */}

			<SettingItem
				icon="format-font"
				title="Dyslexia Mode"
				description="Toggle for a more readable font designed for dyslexic users"
			>
				<Switch
					value={dyslexiaMode}
					onValueChange={toggleDyslexiaMode}
					trackColor={{ false: "#767577", true: "#FA5A5A" }}
					thumbColor={dyslexiaMode ? "#f4f3f4" : "#f4f3f4"}
				/>
			</SettingItem>

			{/* <SettingItem
				icon="contrast-box"
				title="High Contrast Mode"
				description="Enhance visibility for users with visual impairments"
			>
				<Switch
					value={highContrastMode}
					onValueChange={setHighContrastMode}
					trackColor={{ false: "#767577", true: "#FA5A5A" }}
					thumbColor={highContrastMode ? "#f4f3f4" : "#f4f3f4"}
				/>
			</SettingItem> */}
			{/* 
			<SettingItem
				icon="volume-high"
				title="Voice Guidance"
				description="Enable spoken feedback for key actions in the app"
			>
				<Switch
					value={voiceGuidance}
					onValueChange={setVoiceGuidance}
					trackColor={{ false: "#767577", true: "#FA5A5A" }}
					thumbColor={voiceGuidance ? "#f4f3f4" : "#f4f3f4"}
				/>
			</SettingItem> */}

			{/* Privacy Controls Section */}
			<ThemedText style={styles.subSectionTitle}>Privacy Controls</ThemedText>

			<ThemedView style={styles.settingItem}>
				<View style={styles.settingHeader}>
					<Icon name={"account-signout"} size={24} color="#FA5A5A" style={styles.icon} />
					<Pressable onPress={handleSignOutAccount}>
						<View style={styles.settingTitleContainer}>
							<ThemedText style={styles.settingTitle}>{"Sign out"}</ThemedText>
							<ThemedText style={styles.settingDescription}>
								{"Sign out of your account!"}
							</ThemedText>
						</View>
					</Pressable>
				</View>
			</ThemedView>

			<ThemedView style={styles.settingItem}>
				<View style={styles.settingHeader}>
					<Icon name={"account-remove"} size={24} color="#FA5A5A" style={styles.icon} />
					<Pressable onPress={handleDeleteAccount}>
						<View style={styles.settingTitleContainer}>
							<ThemedText style={styles.settingTitle}>{"Delete Account"}</ThemedText>
							<ThemedText style={styles.settingDescription}>
								{"Permanently remove your data \n from the app system"}
							</ThemedText>
						</View>
					</Pressable>
				</View>
			</ThemedView>
		</ScrollView>
	);
};

const SettingItem = ({ icon, title, description, children }) => (
	<ThemedView style={styles.settingItem}>
		<View style={styles.settingHeader}>
			<Icon name={icon} size={24} color="#FA5A5A" style={styles.icon} />
			<View style={styles.settingTitleContainer}>
				<ThemedText style={styles.settingTitle}>{title}</ThemedText>
				<ThemedText style={styles.settingDescription}>{description}</ThemedText>
			</View>
		</View>
		{children && <View style={styles.settingContent}>{children}</View>}
	</ThemedView>
);

const styles = StyleSheet.create({
	scrollView: {
		padding: 15,
	},
	sectionTitle: {
		// fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	subSectionTitle: {
		// fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	settingItem: {
		marginBottom: 20,
		borderRadius: 12,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	settingHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	icon: {
		marginRight: 15,
	},
	settingTitleContainer: {
		flex: 1,
	},
	settingTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	settingDescription: {
		fontSize: 14,
		color: "#777",
	},
	settingContent: {
		marginTop: 10,
	},
	slider: {
		width: "100%",
		height: 40,
	},
	deleteButton: {
		backgroundColor: "#FF3B30",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignSelf: "flex-start",
	},
	deleteButtonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
});

export default SettingsSection;
