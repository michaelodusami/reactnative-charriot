import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { MariottShades } from "@/constants/Colors";

const HomePage = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ThemedText type="subtitle" style={styles.hotelTitle}>
				Hotel
			</ThemedText>
			<ThemedText type="title" style={styles.header}>
				Hello, User
			</ThemedText>

			<View style={styles.cardContainer}>
				<ImageBackground
					source={{
						uri: "https://www.pngall.com/wp-content/uploads/2/Design-PNG-Picture.png",
					}}
					style={[styles.card, styles.present]}
					imageStyle={styles.cardImage}
				>
					<ThemedText type="title" style={styles.cardTitle}>
						Present
					</ThemedText>
					<ThemedText style={styles.cardDescription}>
						View all present bookings here!.
					</ThemedText>
				</ImageBackground>

				<ImageBackground
					source={{
						uri: "https://www.pngall.com/wp-content/uploads/2/Design-PNG-Picture.png",
					}}
					style={[styles.card, styles.past]}
					imageStyle={styles.cardImage}
				>
					<ThemedText type="title" style={styles.cardTitle}>
						Past
					</ThemedText>
					<ThemedText style={styles.cardDescription}>
						View all past bookings here!.
					</ThemedText>
				</ImageBackground>

				<ImageBackground
					source={{
						uri: "https://www.pngall.com/wp-content/uploads/2/Design-PNG-Picture.png",
					}}
					style={[styles.card, styles.upcoming]}
					imageStyle={styles.cardImage}
				>
					<ThemedText type="title" style={styles.cardTitle}>
						Upcoming
					</ThemedText>
					<ThemedText style={styles.cardDescription}>
						View all upcoming bookings here!.
					</ThemedText>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		fontFamily: "Poppins",
	},
	hotelTitle: {
		textAlign: "center",
		fontWeight: 600,
	},
	header: {
		fontSize: 32,
		marginVertical: 20,
	},
	cardContainer: {
		flex: 1,
		justifyContent: "space-evenly",
	},
	card: {
		height: 150,
		borderRadius: 20,
		padding: 20,
		justifyContent: "center",
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
	cardImage: {
		borderRadius: 20,
		opacity: 0.6,
	},
	cardTitle: {
		fontSize: 24,
		color: "white",
		marginBottom: 10,
	},
	cardDescription: {
		fontSize: 16,
		color: "white",
	},
});

export default HomePage;
