import React, { useRef, useState, useEffect } from "react";
import { router } from "expo-router";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
	Image,
	Dimensions,
	Animated,
	Easing,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PeregrineColors } from "@/constants/Colors";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Asyncstorage: ..."]);
LogBox.ignoreAllLogs();

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_PADDING = 15;
const IMAGE_WIDTH = 100;

const HotelChains = () => {
	const [selectedHotel, setSelectedHotel] = useState(null);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(50)).current;
	const descriptionAnim = useRef(new Animated.Value(0)).current;

	const hotelData = [
		{
			id: 1,
			name: "Elysian Heights",
			image: require("@/assets/logos/marriot.webp"),
			description: "Luxury hotel chain with worldwide presence",
		},
		{
			id: 2,
			name: "Peregrine",
			image: require("@/assets/logos/peregrinebrand.png"),
			description: "Your trusted hotel services partner",
		},
		{
			id: 3,
			name: "Sable Ridge",
			image: require("@/assets/logos/hyatt.avif"),
			description: "Premium hospitality and memorable stays",
		},
	];

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				easing: Easing.out(Easing.back(1.7)),
				useNativeDriver: true,
			}),
			Animated.timing(descriptionAnim, {
				toValue: 1,
				duration: 1200,
				delay: 500,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const handleSignIn = () => {
		if (selectedHotel) {
			router.push({
				pathname: "/signin",
				params: { hotelId: selectedHotel.id, hotelName: selectedHotel.name },
			});
		} else {
			alert("Please select a hotel before signing in");
		}
	};

	const renderHotelItem = (hotel) => {
		const isSelected = selectedHotel && selectedHotel.id === hotel.id;

		return (
			<TouchableOpacity
				key={hotel.id}
				style={[styles.hotelItem, isSelected && styles.selectedItem]}
				onPress={() => setSelectedHotel(hotel)}
			>
				<View style={styles.hotelContent}>
					<Image source={hotel.image} style={styles.hotelImage} resizeMode="contain" />
					<View style={styles.hotelInfo}>
						<Text style={styles.hotelName}>{hotel.name}</Text>
						<Text style={styles.hotelDescription}>{hotel.description}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Animated.View
				style={[
					styles.content,
					{
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }],
					},
				]}
			>
				<Text style={styles.header}>Welcome to Chariott</Text>
				<Text style={styles.subheader}>Select Your Hotel Partner</Text>
			</Animated.View>

			<Animated.View
				style={[
					styles.descriptionContainer,
					{
						opacity: descriptionAnim,
					},
				]}
			>
				<Text style={styles.serviceSummary}>
					Connecting you to premium hotel services and resources worldwide
				</Text>
			</Animated.View>

			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{hotelData.map((hotel) => renderHotelItem(hotel))}
			</ScrollView>

			<Animated.View
				style={[
					styles.buttonContainer,
					{
						opacity: fadeAnim,
					},
				]}
			>
				<TouchableOpacity
					style={[styles.signInButton, !selectedHotel && styles.disabledButton]}
					onPress={handleSignIn}
					disabled={!selectedHotel}
				>
					<Text style={styles.signInText}>
						{selectedHotel
							? `Connect with ${selectedHotel.name}`
							: "Select a Hotel Partner"}
					</Text>
				</TouchableOpacity>
			</Animated.View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
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
		marginBottom: 10,
	},
	descriptionContainer: {
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	serviceSummary: {
		fontFamily: "EffraFamily",
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		lineHeight: 22,
	},
	scrollContainer: {
		flex: 1,
	},
	scrollContent: {
		padding: 16,
	},
	hotelItem: {
		backgroundColor: "white",
		borderRadius: 15,
		padding: ITEM_PADDING,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#ddd",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	selectedItem: {
		borderColor: PeregrineColors.blue,
		borderWidth: 2,
	},
	hotelContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	hotelImage: {
		width: IMAGE_WIDTH,
		height: IMAGE_WIDTH,
		borderRadius: 8,
	},
	hotelInfo: {
		flex: 1,
		marginLeft: 15,
	},
	hotelName: {
		fontFamily: "EffraFamily",
		fontSize: 20,
		color: "black",
		fontWeight: "500",
		marginBottom: 8,
	},
	hotelDescription: {
		fontFamily: "EffraFamily",
		fontSize: 14,
		color: "#666",
		lineHeight: 20,
	},
	buttonContainer: {
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	signInButton: {
		backgroundColor: PeregrineColors.blue,
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 30,
		width: "100%",
		alignItems: "center",
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
