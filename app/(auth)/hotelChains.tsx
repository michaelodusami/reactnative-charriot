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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { PeregrineColors } from "@/constants/Colors";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Asyncstorage: ..."]);
LogBox.ignoreAllLogs();

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const HotelChains = () => {
	const [selectedHotel, setSelectedHotel] = useState(null);
	const carouselRef = useRef(null);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(50)).current;
	const descriptionAnim = useRef(new Animated.Value(0)).current;

	const hotelData = [
		{
			id: 1,
			name: "Martt",
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
			name: "Hatt",
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

	const renderItem = ({ item, index }) => {
		const isSelected = selectedHotel && selectedHotel.id === item.id;
		const scale = new Animated.Value(1);

		const handlePress = () => {
			Animated.sequence([
				Animated.timing(scale, {
					toValue: 0.95,
					duration: 100,
					useNativeDriver: true,
				}),
				Animated.timing(scale, {
					toValue: 1,
					duration: 100,
					useNativeDriver: true,
				}),
			]).start();
			setSelectedHotel(item);
		};

		return (
			<Animated.View
				style={{
					transform: [{ scale }],
				}}
			>
				<TouchableOpacity
					style={[styles.carouselItem, isSelected && styles.selectedItem]}
					onPress={handlePress}
				>
					<Image source={item.image} style={styles.carouselImage} resizeMode="contain" />
					<Text style={styles.carouselText}>{item.name}</Text>
					{isSelected && <Text style={styles.descriptionText}>{item.description}</Text>}
				</TouchableOpacity>
			</Animated.View>
		);
	};

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
				<Text style={styles.header}>Welcome to Charriot</Text>
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

			<Animated.View
				style={{
					width: "100%",
					alignItems: "center",
					opacity: fadeAnim,
				}}
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
	carouselContainer: {
		flex: 1,
		justifyContent: "center",
	},
	carousel: {
		flexGrow: 0,
	},
	carouselItem: {
		backgroundColor: "white",
		borderRadius: 15,
		padding: 15,
		alignItems: "center",
		justifyContent: "center",
		height: 280,
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
		// transform: [{ scale: 1.0 }],
	},
	carouselImage: {
		width: ITEM_WIDTH - 30,
		height: 160,
		borderRadius: 8,
	},
	carouselText: {
		fontFamily: "EffraFamily",
		fontSize: 20,
		marginTop: 15,
		color: "black",
		fontWeight: "500",
	},
	descriptionText: {
		fontFamily: "EffraFamily",
		fontSize: 14,
		color: "#666",
		marginTop: 8,
		textAlign: "center",
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
