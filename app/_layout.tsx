import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useContext, useEffect } from "react";
import "react-native-reanimated";
import { DyslexiaProvider, FontProvider } from "@/providers/FontContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "@/providers/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
		EffraFamily: require("../assets/fonts/Effra_Std_Rg.ttf"),
		DyslexiaFont: require("../assets/fonts/OpenDyslexic/OpenDyslexic3-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<FontProvider>
			<UserProvider>
				{/* Wrap the app with DyslexiaProvider */}
				<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</ThemeProvider>
			</UserProvider>
		</FontProvider>
	);
}
