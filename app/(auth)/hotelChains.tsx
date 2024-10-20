import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, StyleSheet, View, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { PeregrineColors } from "@/constants/Colors";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Asyncstorage: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const HotelChains = () => {
	const [selectedHotel, setSelectedHotel] = useState(null);
	const carouselRef = useRef(null);

	const hotelData = [
		{ id: 1, name: "Martt", image: require("@/assets/logos/marriot.webp") },
		{ id: 2, name: "Peregrine", image: require("@/assets/logos/peregrinebrand.png") },
		{ id: 3, name: "Hatt", image: require("@/assets/logos/hyatt.avif") },
	];

	const renderItem = ({ item, index }) => {
		const isSelected = selectedHotel && selectedHotel.id === item.id;
		return (
			<TouchableOpacity
				style={[styles.carouselItem, isSelected && styles.selectedItem]}
				onPress={() => setSelectedHotel(item)}
			>
				<Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
				<Text style={styles.carouselText}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	const handleSignIn = () => {
		if (selectedHotel) {
			// You can pass the selected hotel to the signin page
			router.push({
				pathname: "/signin",
				params: { hotelId: selectedHotel.id, hotelName: selectedHotel.name },
			});
		} else {
			// Show an alert or some feedback that a hotel needs to be selected
			alert("Please select a hotel before signing in");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.header}>Hotel Chains</Text>
				<Text style={styles.subheader}>Select Your Hotel</Text>
			</View>

			<View style={styles.carouselContainer}>
				<Carousel
					ref={carouselRef}
					data={hotelData}
					renderItem={renderItem}
					sliderWidth={SLIDER_WIDTH}
					itemWidth={ITEM_WIDTH}
					onSnapToItem={(index) => setSelectedHotel(hotelData[index])}
					inactiveSlideScale={0.9}
					inactiveSlideOpacity={0.7}
					containerCustomStyle={styles.carousel}
				/>
			</View>

			<TouchableOpacity
				style={[styles.signInButton, !selectedHotel && styles.disabledButton]}
				onPress={handleSignIn}
				disabled={!selectedHotel}
			>
				<Text style={styles.signInText}>
					Sign in using {selectedHotel ? selectedHotel.name : "hotel"}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
	},
	content: {
		alignItems: "center",
		marginTop: 40,
	},
	header: {
		fontFamily: "EffraFamily",
		fontSize: 36,
		color: "black",
		marginBottom: 10,
	},
	subheader: {
		fontFamily: "EffraFamily",
		fontSize: 18,
		color: "black",
		marginBottom: 20,
	},
	carouselContainer: {
		flex: 1,
		justifyContent: "center",
	},
	carousel: {
		flexGrow: 0,
	},
	carouselItem: {
		backgroundColor: "white",
		borderRadius: 8,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		height: 250,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	selectedItem: {
		borderColor: PeregrineColors.blue,
		borderWidth: 2,
	},
	carouselImage: {
		width: ITEM_WIDTH - 20,
		height: 180,
		borderRadius: 8,
	},
	carouselText: {
		fontFamily: "EffraFamily",
		fontSize: 18,
		marginTop: 10,
		color: "black",
	},
	signInButton: {
		backgroundColor: PeregrineColors.blue,
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 30,
		width: "80%",
		alignItems: "center",
		marginTop: 30,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	disabledButton: {
		backgroundColor: "#ccc",
	},
	signInText: {
		fontFamily: "EffraFamily",
		fontSize: 18,
		color: "white",
		textTransform: "uppercase",
	},
});

export default HotelChains;
