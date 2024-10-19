import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
const HomePage = () => {
	return (
		<SafeAreaView>
			<ThemedView>
				<Text className="bg-red-500 text-white">Welcome, Mike</Text>
			</ThemedView>
		</SafeAreaView>
	);
};

export default HomePage;
