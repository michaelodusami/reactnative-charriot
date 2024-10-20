import React, { useRef } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, StyleSheet, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { PeregrineColors } from "@/constants/Colors";

const Onboarding = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("@/assets/images/PeregrineAppLogo.png")}
				style={styles.background}
				resizeMode="contain"
			>
				<View style={styles.content}>
					<Text style={styles.header}>Charriot</Text>
					<Text style={styles.subheader}>Explore the world</Text>
				</View>
				<TouchableOpacity
					style={styles.exploreButton}
					onPress={() => {
						router.replace("/(auth)/hotelChains");
					}}
				>
					<Text style={styles.exploreText}>Next</Text>
				</TouchableOpacity>
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
		fontFamily: "EffraFamily",
		fontSize: 48,
		color: "black",
		marginBottom: 10,
		//textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	subheader: {
		fontFamily: "EffraFamily",
		fontSize: 24,
		color: "black",
		marginBottom: 20,
		//textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
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
		fontFamily: "EffraFamily",
		fontSize: 18,
		color: "white",
		textTransform: "uppercase",
	},
});

export default Onboarding;
