import { ThemedText } from "@/components/ThemedText";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
};

export default Onboarding;
