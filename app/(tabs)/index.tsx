import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { MariottShades } from "@/constants/Colors";
import SafeArea from "@/components/SafeArea";

const HomePage = () => {
	return (
		<SafeArea style={styles.container}>
			<ThemedText type="title" style={styles.header}>
				Welcome, Mark
			</ThemedText>

			<View style={styles.cardContainer}>
				<Pressable style={styles.cardWrapper}>
					<View style={[styles.card, styles.present]}>
						<ThemedText type="title" style={styles.cardTitle}>
							Present
						</ThemedText>
						<ThemedText style={styles.cardDescription}>
							View all present bookings here!
						</ThemedText>
					</View>
				</Pressable>

				<Pressable style={styles.cardWrapper}>
					<View style={[styles.card, styles.past]}>
						<ThemedText type="title" style={styles.cardTitle}>
							Past
						</ThemedText>
						<ThemedText style={styles.cardDescription}>
							View all past bookings here!
						</ThemedText>
					</View>
				</Pressable>

				<Pressable style={styles.cardWrapper}>
					<View style={[styles.card, styles.upcoming]}>
						<ThemedText type="title" style={styles.cardTitle}>
							Upcoming
						</ThemedText>
						<ThemedText style={styles.cardDescription}>
							View all upcoming bookings here!
						</ThemedText>
					</View>
				</Pressable>
			</View>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	container: {
		//backgroundColor: MariottShades.background,
		paddingHorizontal: 16,
		paddingVertical: 24,
	},

	header: {
		fontSize: 34,
		textAlign: "center",
		fontWeight: "bold",
		//color: MariottShades.primary,
		marginBottom: 32,
		fontFamily: "Poppins-SemiBold",
	},
	cardContainer: {
		flex: 1,
		justifyContent: "space-evenly",
	},
	cardWrapper: {
		marginVertical: 10,
		borderRadius: 16,
		// Enhanced shadow for 3D effect
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 15,
		elevation: 10, // for Android
	},
	card: {
		height: 140,
		borderRadius: 16,
		padding: 24,
		justifyContent: "center",
		// 3D transform effect
		transform: [{ perspective: 1000 }, { rotateX: "0deg" }, { rotateY: "0deg" }],
	},
	present: {
		backgroundColor: MariottShades.medium,
	},
	past: {
		backgroundColor: MariottShades.dark,
	},
	upcoming: {
		backgroundColor: MariottShades.light,
	},
	cardTitle: {
		fontSize: 22,
		color: "white",
		fontFamily: "Poppins-Medium",
		textAlign: "center",
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	cardDescription: {
		fontSize: 15,
		color: "white",
		fontFamily: "Poppins-Light",
		textAlign: "center",
		opacity: 0.85,
		letterSpacing: 0.3,
	},
});

export default HomePage;
