import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="welcome" options={{ headerShown: false }} />
			<Stack.Screen name="signin" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
};

export default Layout;
