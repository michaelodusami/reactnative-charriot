import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatBotScreen = () => {
	return (
		<SafeAreaView>
			<View>
				<ThemedText>Hello</ThemedText>
			</View>
		</SafeAreaView>
	);
};

export default ChatBotScreen;
