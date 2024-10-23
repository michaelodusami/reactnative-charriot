import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Switch,
	TextInput,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";
import Slider from "@react-native-community/slider";
import { getUserPreferences, updateUserPreferences } from "@/server/requests";
import { useUser } from "@/providers/UserContext";

const ConfigurationSection = () => {
	const { user } = useUser();
	const [roomView, setRoomView] = useState("any");
	const [temperature, setTemperature] = useState(75);
	const [quietRoom, setQuietRoom] = useState(false);
	const [economicRating, setEconomicRating] = useState(0); // Updated to match key "econ_rating"
	const [extraBedding, setExtraBedding] = useState("");
	const [selectedDietaryRestriction, setSelectedDietaryRestriction] = useState("other");
	const [otherDietary, setOtherDietary] = useState("");
	const [beddingPillows, setBeddingPillows] = useState(2);
	const [beddingMattressType, setBeddingMattressType] = useState("any");
	const [beddingPillowType, setBeddingPillowType] = useState("any");

	const [miscellaneousInput, setMiscellaneousInput] = useState("");

	const fetchUserData = async () => {
		const preferences = await getUserPreferences(user.userId);
		console.log(preferences);
		setTemperature(preferences.climate_control || "");
		setRoomView(preferences.room_view || "any"); // done
		setQuietRoom(preferences.quiet_room || false);
		setEconomicRating(preferences.econ_rating || 0);
		setSelectedDietaryRestriction(preferences.dietary_restrictions || "other"); // done
		setOtherDietary(preferences.dietary_restrictions_other || "");
		setBeddingPillows(preferences.bedding_pillows || 2); // num pillows, done
		setBeddingMattressType(preferences.bedding_mattress_type || "any"); // any
		setBeddingPillowType(preferences.bedding_pillow_type || "any"); // any
		setExtraBedding(preferences.bedding_other || ""); // done
		setMiscellaneousInput(preferences.misc || ""); // done
	};

	useEffect(() => {
		if (user.userId) {
			fetchUserData();
		}
	}, [user.userId]);

	const handleSave = async () => {
		console.log(selectedDietaryRestriction, otherDietary);
		// Create the preferences object using state values
		const preferences = {
			dietary_restrictions: selectedDietaryRestriction,
			dietary_restrictions_other: otherDietary,
			bedding_pillows: beddingPillows,
			bedding_mattress_type: beddingMattressType,
			bedding_pillow_type: beddingPillowType,
			bedding_other: extraBedding,
			climate_control: temperature,
			room_view: roomView,
			quiet_room: quietRoom,
			misc: miscellaneousInput,
			econ_rating: economicRating,
		};

		if (selectedDietaryRestriction === "other") {
			preferences.dietary_restrictions = "other";
			preferences.dietary_restrictions_other = otherDietary;
		} else {
			preferences.dietary_restrictions = selectedDietaryRestriction;
		}

		try {
			// Call the function to update preferences in the backend
			await updateUserPreferences(user.userId, preferences);
			Alert.alert("Success", "Your preferences have been saved successfully!");
		} catch (error) {
			console.error("Error updating preferences:", error);
			Alert.alert("Error", "Failed to save your preferences. Please try again.");
		}
	};

	return (
		<ScrollView style={configStyles.scrollView}>
			{/* Room View Preference */}
			<ConfigItem
				icon="image"
				title="Room View"
				description="Select your preferred room view"
			>
				<View style={configStyles.optionRow}>
					{["city", "garden", "pool", "any"].map((view) => (
						<TouchableOpacity
							key={view}
							style={[
								configStyles.choiceButton,
								roomView === view && configStyles.selectedOption,
							]}
							onPress={() => setRoomView(view)}
						>
							<Text
								style={[
									configStyles.choiceText,
									roomView === view && configStyles.selectedText,
								]}
							>
								{view}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</ConfigItem>

			{/* Mattress Type */}
			<ConfigItem
				icon="bed"
				title="Mattress Type"
				description="Choose your preferred mattress type"
			>
				<View style={configStyles.optionRow}>
					{["any", "soft", "medium", "firm"].map((type) => (
						<TouchableOpacity
							key={type}
							style={[
								configStyles.choiceButton,
								beddingMattressType === type && configStyles.selectedOption,
							]}
							onPress={() => setBeddingMattressType(type)}
						>
							<Text
								style={[
									configStyles.choiceText,
									beddingMattressType === type && configStyles.selectedText,
								]}
							>
								{type}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</ConfigItem>

			{/* Pillow Type */}
			<ConfigItem
				icon="bed"
				title="Pillow Type"
				description="Choose your preferred pillow type"
			>
				<View style={configStyles.optionRow}>
					{["any", "feather", "foam", "memory Foam"].map((type) => (
						<TouchableOpacity
							key={type}
							style={[
								configStyles.choiceButton,
								beddingPillowType === type && configStyles.selectedOption,
							]}
							onPress={() => setBeddingPillowType(type)}
						>
							<Text
								style={[
									configStyles.choiceText,
									beddingPillowType === type && configStyles.selectedText,
								]}
							>
								{type}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</ConfigItem>

			{/* Number of Pillows */}
			<ConfigItem
				icon="bed"
				title="Number of Pillows"
				description="Select the number of pillows you prefer"
			>
				<View style={configStyles.optionRow}>
					{[1, 2, 3, 4].map((number) => (
						<TouchableOpacity
							key={number}
							style={[
								configStyles.choiceButton,
								beddingPillows === number && configStyles.selectedOption,
							]}
							onPress={() => setBeddingPillows(number)}
						>
							<Text
								style={[
									configStyles.choiceText,
									beddingPillows === number && configStyles.selectedText,
								]}
							>
								{number}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</ConfigItem>

			{/* Dietary Restrictions */}
			<ConfigItem
				icon="food-apple"
				title="Dietary Restrictions"
				description="Let us know about any dietary restrictions"
			>
				<View style={configStyles.optionRow}>
					{["none", "vegetarian", "vegan", "gluten-free", "halal", "kosher", "other"].map(
						(diet) => (
							<TouchableOpacity
								key={diet}
								style={[
									configStyles.choiceButton,
									selectedDietaryRestriction === diet &&
										configStyles.selectedOption,
								]}
								onPress={() => setSelectedDietaryRestriction(diet)}
							>
								<Text
									style={[
										configStyles.choiceText,
										selectedDietaryRestriction === diet &&
											configStyles.selectedText,
									]}
								>
									{diet}
								</Text>
							</TouchableOpacity>
						)
					)}
				</View>
				{selectedDietaryRestriction === "other" && (
					<TextInput
						style={configStyles.textInput}
						value={otherDietary}
						onChangeText={setOtherDietary}
						placeholder="Enter other dietary restriction"
						placeholderTextColor="#999"
					/>
				)}
			</ConfigItem>
			{/* Climate Control */}
			<ConfigItem
				icon="thermometer"
				title="Climate Control"
				description="Enter your preferred room temperature setting"
			>
				<TextInput
					style={configStyles.textInput}
					value={temperature}
					onChangeText={(text) => setTemperature(text)}
					placeholder="Enter preferred temperature"
					placeholderTextColor="#999"
					keyboardType="default"
				/>
			</ConfigItem>

			{/* Economic Rating */}
			<ConfigItem
				icon="cash"
				title="Preferred Minimum Economic Rating"
				description="Select your preferred minimum economic rating"
			>
				<Slider
					style={configStyles.slider}
					minimumValue={0}
					maximumValue={10}
					step={1}
					value={economicRating}
					onValueChange={setEconomicRating}
					minimumTrackTintColor="#FA5A5A"
					maximumTrackTintColor="#000000"
					thumbTintColor="#FA5A5A"
				/>
				<ThemedText style={configStyles.sliderValue}>{economicRating}</ThemedText>
			</ConfigItem>

			{/* Quiet Room Preference */}
			<ConfigItem
				icon="volume-off"
				title="Request a Quiet Room"
				description="Would you prefer a quiet room away from elevators and ice machines?"
			>
				<Switch
					style={configStyles.slider}
					value={quietRoom}
					onValueChange={setQuietRoom}
					trackColor={{ false: "#767577", true: "#FA5A5A" }}
					thumbColor={quietRoom ? "#f4f3f4" : "#f4f3f4"}
				/>
			</ConfigItem>

			{/* Extra Bedding Needs */}
			<ConfigItem
				icon="bed-queen"
				title="Extra Bedding Needs"
				description="Any extra bedding needs?"
			>
				<TextInput
					style={configStyles.textInput}
					value={extraBedding}
					onChangeText={setExtraBedding}
					placeholder="Enter your extra bedding needs"
					placeholderTextColor="#999"
				/>
			</ConfigItem>

			{/* Miscellaneous Information */}
			<ConfigItem
				icon="information-outline"
				title="Miscellaneous"
				description="Any additional information or requests?"
			>
				<TextInput
					style={configStyles.textInput}
					value={miscellaneousInput}
					onChangeText={setMiscellaneousInput}
					placeholder="Enter any additional information"
					placeholderTextColor="#999"
				/>
			</ConfigItem>

			<TouchableOpacity style={configStyles.saveButton} onPress={handleSave}>
				<ThemedText style={configStyles.saveButtonText}>Save Preferences</ThemedText>
			</TouchableOpacity>
		</ScrollView>
	);
};
const ConfigItem = ({ icon, title, description, children }) => (
	<ThemedView style={configStyles.configItem}>
		<View style={configStyles.configHeader}>
			<Icon name={icon} size={24} color="#FA5A5A" style={configStyles.icon} />
			<View style={configStyles.configTitleContainer}>
				<ThemedText style={configStyles.configTitle}>{title}</ThemedText>
				<ThemedText style={configStyles.configDescription}>{description}</ThemedText>
			</View>
		</View>
		<View style={configStyles.configContent}>{children}</View>
	</ThemedView>
);

const configStyles = StyleSheet.create({
	scrollView: {
		padding: 15,
	},
	configItem: {
		marginBottom: 20,
		borderRadius: 12,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	configHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	icon: {
		marginRight: 15,
	},
	configTitleContainer: {
		flex: 1,
	},
	configTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	configDescription: {
		// fontSize: 14,
		color: "#777",
	},
	configContent: {
		marginTop: 10,
	},
	optionRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginTop: 10,
	},
	choiceButton: {
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: "#EAEAEA",
		marginRight: 12,
		marginBottom: 12,
	},
	choiceText: {
		// fontSize: 14,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
	},
	slider: {
		alignSelf: "center",
		width: "100%",
		height: 40,
	},
	saveButton: {
		backgroundColor: "#FA5A5A",
		paddingVertical: 15,
		alignItems: "center",
		borderRadius: 20,
		marginBottom: 20,
	},
	saveButtonText: {
		color: "#FFFFFF",
		// fontSize: 18,
		fontWeight: "bold",
	},
	selectedOption: {
		backgroundColor: "#FA5A5A",
	},
	selectedText: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	sliderValue: {
		textAlign: "center",
		marginTop: 10,
	},
	textInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		// fontSize: 16,
		width: "100%",
	},
});

export default ConfigurationSection;
