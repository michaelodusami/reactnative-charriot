import React, { useEffect, useRef } from "react";
import { router } from "expo-router";
import {
	Text,
	TouchableOpacity,
	StyleSheet,
	View,
	ImageBackground,
	Animated,
	Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PeregrineColors } from "@/constants/Colors";
import { getCurrentFontName } from "@/functions/fontFunctions";
import { useDyslexia } from "@/providers/FontContext";

const Onboarding = () => {
	// Animation values
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(50)).current;
	const scaleAnim = useRef(new Animated.Value(0.3)).current;
	const buttonOpacity = useRef(new Animated.Value(0)).current;
	const byPeregrineAnim = useRef(new Animated.Value(0)).current;

	const isFontToggled = true;

	useEffect(() => {
		// Sequence of animations
		Animated.sequence([
			// First animate the main logo
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 1000,
					easing: Easing.bounce,
					useNativeDriver: true,
				}),
			]),
			// Then animate the subheader
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				easing: Easing.out(Easing.back(1.7)),
				useNativeDriver: true,
			}),
			// Finally animate the "by peregrine" text and button
			Animated.parallel([
				Animated.timing(buttonOpacity, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(byPeregrineAnim, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
			]),
		]).start();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("@/assets/images/charriot.png")}
				style={styles.background}
				resizeMode="contain"
			>
				<View style={styles.content}>
					<Animated.Text
						style={[
							styles.header,
							{
								opacity: fadeAnim,
								transform: [{ scale: scaleAnim }],
							},
						]}
					>
						Charriot
					</Animated.Text>

					<Animated.Text
						style={[
							styles.subheader,
							{
								transform: [{ translateY: slideAnim }],
								opacity: fadeAnim,
							},
						]}
					>
						Explore the world
					</Animated.Text>

					<Animated.Text
						style={[
							styles.byPeregrine,
							{
								opacity: byPeregrineAnim,
								transform: [
									{
										translateY: byPeregrineAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [20, 0],
										}),
									},
								],
							},
						]}
					>
						by peregrine
					</Animated.Text>
				</View>

				<Animated.View
					style={{
						opacity: buttonOpacity,
						transform: [
							{
								translateY: buttonOpacity.interpolate({
									inputRange: [0, 1],
									outputRange: [20, 0],
								}),
							},
						],
						width: "100%",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={styles.exploreButton}
						onPress={() => {
							router.replace("/(auth)/hotelChains");
						}}
					>
						<Text style={styles.exploreText}>Next</Text>
					</TouchableOpacity>
				</Animated.View>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: "white",
	},
	toggledFont: {
		fontFamily: "DyslexiaFont",
	},
	defaultFont: {
		fontFamily: "SpaceMono",
	},
	background: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 40,
	},

	content: {
		alignItems: "center",
	},
	header: {
		fontSize: 48,

		color: "black",
		marginBottom: 10,
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	subheader: {
		// fontFamily: "EffraFamily",
		fontSize: 24,
		color: "black",
		marginBottom: 10,
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	byPeregrine: {
		// fontFamily: "EffraFamily",
		fontSize: 16,
		color: PeregrineColors.blue,
		marginTop: 5,
		opacity: 0.8,
	},
	exploreButton: {
		backgroundColor: PeregrineColors.blue,
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 30,
		width: "80%",
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
	exploreText: {
		// fontFamily: "EffraFamily",
		fontSize: 18,
		color: "white",
		textTransform: "uppercase",
	},
});

export default Onboarding;
