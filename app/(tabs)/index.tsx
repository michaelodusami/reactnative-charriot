import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "../../components/Slider";
import { ImageSlider, ImageSliderType } from "@/data/CarouselData";
import SafeArea from "@/components/SafeArea";
import TabView from "@/components/TabView";

const HomePage = () => {
	const [activeItem, setActiveItem] = React.useState<ImageSliderType>(ImageSlider[0]);

	const handleActiveItemChange = (item: ImageSliderType) => {
		setActiveItem(item);
	};
	return (
		<SafeArea style={styles.container}>
			<View>
				<ThemedText style={styles.subheading}>Make new memories</ThemedText>
			</View>
			<SafeAreaView style={styles.carouselContainer}>
				<Slider itemList={ImageSlider} onActiveItemChange={handleActiveItemChange} />
			</SafeAreaView>
			<TabView activeItem={activeItem} userEmail="" />
		</SafeArea>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		paddingTop: 12,
	},
	carouselContainer: {
		flex: 0.6,
		alignItems: "center",
	},
	subheading: {
		width: "100%",
		paddingHorizontal: 60,
		// paddingRight: 20,
		paddingVertical: 10,
		marginBottom: -60,
		marginTop: 20,
		textAlign: "center",
		// fontFamily: "Poppins",
		// fontSize: 32,
	},
});
