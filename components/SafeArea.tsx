import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";

interface SafeAreaProps {
	children: React.ReactNode;
	style?: ViewStyle | ViewStyle[];
}

const SafeArea: React.FC<SafeAreaProps> = ({ children, style }) => {
	return (
		<SafeAreaView style={[styles.container, style]}>
			<ThemedText type="subtitle" style={styles.hotelTitle}>
				Peregrine
			</ThemedText>
			{children}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	hotelTitle: {
		textAlign: "center",
		fontWeight: "300",
		fontFamily: "Poppins",
		fontSize: 18,
		//color: MariottShades.secondary,
		letterSpacing: 1,
	},
});

export default SafeArea;
