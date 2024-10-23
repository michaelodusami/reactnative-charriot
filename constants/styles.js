import { StyleSheet } from "react-native";

export const fontStyles = StyleSheet.create({
	regularFont: {
		// Your regular font family
		fontFamily: "EffraFamily",
		// fontSize: 2
	},
	dyslexiaFont: {
		// You can use OpenDyslexic or any other dyslexia-friendly font
		// Make sure to link the font in your React Native project
		fontFamily: "DyslexiaFont",
		// fontSize: 16,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
	},
	subheading: {
		fontSize: 20,
		fontWeight: "bold",
	},
	bodyText: {
		fontSize: 16,
	},
});
