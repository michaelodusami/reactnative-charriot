import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert } from "react-native";

const ConfigurationSection = () => {
	const [temperature, setTemperature] = useState(24);
	const [coffeeMachine, setCoffeeMachine] = useState(true);
	const [extraBlanket, setExtraBlanket] = useState(true);
	const [quietRoom, setQuietRoom] = useState(true);

	const handleSave = () => {
		// Here you would typically save the configuration to your backend or local storage
		Alert.alert("Success", "Your preferences have been saved successfully!");
	};

	return (
		<ScrollView style={configStyles.scrollView}>
			{/* Bed Type Preference */}
			<ConfigItem
				icon="bed-empty"
				title="Bed Type"
				description="Choose your preferred bed type"
			>
				<View style={configStyles.optionRow}>
					{["King", "Queen", "Double"].map((type) => (
						<TouchableOpacity key={type} style={configStyles.choiceButton}>
							<Text style={configStyles.choiceText}>{type}</Text>
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
						<TouchableOpacity key={number} style={configStyles.choiceButton}>
							<Text style={configStyles.choiceText}>{number}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ConfigItem>

			{/* Room Temperature Preference */}
			{/* <ConfigItem
				icon="thermometer"
				title="Preferred Room Temperature"
				description={`Current setting: ${temperature}°C`}
			>
				<Slider
					style={configStyles.slider}
					minimumValue={18}
					maximumValue={30}
					step={1}
					value={temperature}
					onValueChange={setTemperature}
					minimumTrackTintColor="#FA5A5A"
					maximumTrackTintColor="#000000"
					thumbTintColor="#FA5A5A"
				/>
			</ConfigItem> */}

			{/* Coffee Machine in Room */}
			<ConfigItem
				icon="coffee-maker"
				title="Coffee Machine in Room"
				description="Would you like a coffee machine in your room?"
			>
				<Switch
					style={configStyles.slider}
					value={coffeeMachine}
					onValueChange={setCoffeeMachine}
					trackColor={{ false: "#767577", true: "#FA5A5A" }}
					thumbColor={coffeeMachine ? "#f4f3f4" : "#f4f3f4"}
				/>
			</ConfigItem>

			{/* Extra Blanket */}
			<ConfigItem
				icon="more"
				title="Extra Blanket"
				description="Would you like an extra blanket in your room?"
			>
				<Switch
					style={configStyles.slider}
					value={extraBlanket}
					onValueChange={setExtraBlanket}
					trackColor={{ false: "#767577", true: "#FA5A5A" }}
					thumbColor={extraBlanket ? "#f4f3f4" : "#f4f3f4"}
				/>
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

			{/* Room View Preference */}
			<ConfigItem
				icon="image"
				title="Room View"
				description="Select your preferred room view"
			>
				<View style={configStyles.optionRow}>
					{["City", "Garden", "Pool"].map((view) => (
						<TouchableOpacity key={view} style={configStyles.choiceButton}>
							<Text style={configStyles.choiceText}>{view}</Text>
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
					{["None", "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher"].map(
						(diet) => (
							<TouchableOpacity key={diet} style={configStyles.choiceButton}>
								<Text style={configStyles.choiceText}>{diet}</Text>
							</TouchableOpacity>
						)
					)}
				</View>
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
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	configItem: {
		marginBottom: 20,
		borderRadius: 12,
		padding: 15,
		// backgroundColor: "#fff",
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
		fontSize: 14,
		color: "#777",
	},
	configContent: {
		marginTop: 10,
	},
	optionRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center", // Centering the options
		marginTop: 10,
	},
	choiceButton: {
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: "#EAEAEA",
		marginRight: 12,
		marginBottom: 12, // Adding space between rows
	},
	choiceText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#333",
		textAlign: "center",
	},
	slider: {
		alignSelf: "center",
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
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default ConfigurationSection;
