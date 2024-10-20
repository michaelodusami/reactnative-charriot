import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
	return (
		<SafeAreaView>
			<ThemedText>Sign in</ThemedText>
		</SafeAreaView>
	);
};

export default Onboarding;
