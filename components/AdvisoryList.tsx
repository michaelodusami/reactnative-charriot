import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

type Advisory = {
	id: string;
	text: string;
	type: "info" | "warning" | "alert";
};

type AdvisoryListProps = {
	title: string;
};

const AdvisoryList = ({ title }: AdvisoryListProps) => {
	// In a real app, you'd fetch this data from an API
	const advisories: Advisory[] = [
		{ id: "1", text: "Wear sunscreen and stay hydrated", type: "info" },
		{ id: "2", text: "Possible thunderstorms this evening", type: "warning" },
		{ id: "3", text: "High traffic expected downtown", type: "alert" },
	];

	const getIconName = (type: Advisory["type"]) => {
		switch (type) {
			case "info":
				return "information-circle";
			case "warning":
				return "warning";
			case "alert":
				return "alert-circle";
		}
	};

	const getIconColor = (type: Advisory["type"]) => {
		switch (type) {
			case "info":
				return "#3498db";
			case "warning":
				return "#f39c12";
			case "alert":
				return "#e74c3c";
		}
	};

	const renderAdvisory = ({ item }: { item: Advisory }) => (
		<View style={styles.advisoryItem}>
			<Ionicons name={getIconName(item.type)} size={24} color={getIconColor(item.type)} />
			<ThemedText style={styles.advisoryText}>{item.text}</ThemedText>
		</View>
	);

	return (
		<View style={styles.container}>
			<ThemedText style={styles.title}>{title}</ThemedText>
			<FlatList
				data={advisories}
				renderItem={renderAdvisory}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		marginHorizontal: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	advisoryItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginVertical: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	advisoryText: {
		// fontSize: 16,
		marginLeft: 10,
		flex: 1,
	},
});

export default AdvisoryList;
