import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { MariottShades } from "@/constants/Colors";
import Carousel from "react-native-snap-carousel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const bookingData = [
	{
		id: 1,
		title: "Current",
		description: "View your current bookings",
		count: 2,
		color: MariottShades.medium,
	},
	{
		id: 2,
		title: "Past",
		description: "Check your past stays",
		count: 5,
		color: MariottShades.dark,
	},
	{
		id: 3,
		title: "Upcoming",
		description: "See your future reservations",
		count: 1,
		color: MariottShades.light,
	},
];

const HomePage = () => {
	const renderCarouselItem = ({ item }) => (
		<View style={[styles.carouselItem, { backgroundColor: item.color }]}>
			<View style={styles.bookingCount}>
				<ThemedText style={styles.countText}>{item.count}</ThemedText>
			</View>
			<ThemedText type="title" style={styles.carouselTitle}>
				{item.title}
			</ThemedText>
			<ThemedText style={styles.carouselDescription}>{item.description}</ThemedText>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<ThemedText type="subtitle" style={styles.hotelTitle}>
					Marriott
				</ThemedText>
				<ThemedText type="title" style={styles.header}>
					Welcome, Mark
				</ThemedText>

				<View style={styles.carouselContainer}>
					<Carousel
						data={bookingData}
						renderItem={renderCarouselItem}
						sliderWidth={SLIDER_WIDTH}
						itemWidth={ITEM_WIDTH}
					/>
				</View>

				<View style={styles.infoSection}>
					<ThemedText style={styles.infoTitle}>About This App</ThemedText>
					<ThemedText style={styles.infoText}>
						Manage your Marriott bookings with ease. View current stays, check past
						visits, and plan future trips all in one place. Swipe through the carousel
						above to access different booking categories.
					</ThemedText>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: MariottShades.background,
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingVertical: 24,
	},
	hotelTitle: {
		textAlign: "center",
		fontWeight: "300",
		fontFamily: "Poppins",
		fontSize: 18,
		color: MariottShades.secondary,
		letterSpacing: 1,
	},
	header: {
		fontSize: 34,
		textAlign: "center",
		fontWeight: "bold",
		color: MariottShades.primary,
		marginBottom: 32,
		fontFamily: "Poppins-SemiBold",
	},
	carouselContainer: {
		marginBottom: 30,
	},
	carouselItem: {
		height: 200,
		borderRadius: 16,
		padding: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	bookingCount: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "rgba(255,255,255,0.3)",
		borderRadius: 15,
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	countText: {
		color: "white",
		fontWeight: "bold",
	},
	carouselTitle: {
		fontSize: 22,
		color: "white",
		fontFamily: "Poppins-Medium",
		textAlign: "center",
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	carouselDescription: {
		fontSize: 15,
		color: "white",
		fontFamily: "Poppins-Light",
		textAlign: "center",
		opacity: 0.85,
		letterSpacing: 0.3,
	},
	infoSection: {
		backgroundColor: "#f0f0f0",
		borderRadius: 16,
		padding: 20,
		marginBottom: 20,
	},
	infoTitle: {
		fontSize: 18,
		fontFamily: "Poppins-Medium",
		color: MariottShades.primary,
		marginBottom: 10,
	},
	infoText: {
		fontSize: 14,
		fontFamily: "Poppins-Regular",
		color: MariottShades.secondary,
		lineHeight: 20,
	},
});

export default HomePage;
