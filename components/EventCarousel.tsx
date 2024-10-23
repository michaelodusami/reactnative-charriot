import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type Event = {
	id: string;
	title: string;
	date: string;
};

type EventCarouselProps = {
	title: string;
};

const EventCarousel = ({ title }: EventCarouselProps) => {
	// In a real app, you'd fetch this data from an API
	const events: Event[] = [
		{ id: "1", title: "Local Music Festival", date: "June 15" },
		{ id: "2", title: "Food Truck Rally", date: "June 18" },
		{ id: "3", title: "Outdoor Movie Night", date: "June 20" },
	];

	const renderEvent = ({ item }: { item: Event }) => (
		<View style={styles.eventItem}>
			<ThemedText style={styles.eventTitle}>{item.title}</ThemedText>
			<ThemedText style={styles.eventDate}>{item.date}</ThemedText>
		</View>
	);

	return (
		<View style={styles.container}>
			<ThemedText style={styles.title}>{title}</ThemedText>
			<FlatList
				data={events}
				renderItem={renderEvent}
				keyExtractor={(item) => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
	title: {
		// fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginLeft: 20,
	},
	eventItem: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginHorizontal: 10,
		width: 200,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	eventTitle: {
		// fontSize: 16,
		fontWeight: "bold",
	},
	eventDate: {
		// fontSize: 14,
		color: "#666",
		marginTop: 5,
	},
});

export default EventCarousel;
