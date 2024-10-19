import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
	return (
		<SafeAreaView>
			<ThemedView>
				<ThemedText>Welcome, Mike</ThemedText>
			</ThemedView>
		</SafeAreaView>
	);
};

export default HomePage;
