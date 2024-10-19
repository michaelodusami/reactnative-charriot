import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../../components/Slider"
import { ImageSlider } from "@/data/CarouselData";
import SafeArea from "@/components/SafeArea";

const HomePage = () => {
	return (
		<SafeArea style={styles.container}>
			<View>
			<ThemedText style={styles.subheading}>Make new memories</ThemedText>
			</View>
			<SafeAreaView style={styles.carouselContainer}>
				<Slider itemList={ImageSlider} />
			</SafeAreaView>
		</SafeArea>
	)
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 24
	},
	carouselContainer: {
		flex: 0.6,
		alignItems: "center"
	}, 
	subheading: {
		width: '100%', 
		paddingHorizontal: 60,
		paddingRight: 20,
		paddingVertical: 10,
		marginBottom: -60,
		marginTop: 20,
		fontFamily: "Poppins",
		fontSize: 32
	}
})