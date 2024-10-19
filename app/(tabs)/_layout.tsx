import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BookingTypeProvider } from "@/components/BookingTypeContext";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<BookingTypeProvider>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
						),
						tabBarShowLabel: false,
					}}
				/>
				<Tabs.Screen
					name="chatbot"
					options={{
						title: "chatbot",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "chatbox-ellipses-outline" : "chatbox"}
								color={color}
							/>
						),
						tabBarShowLabel: false,
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "profile",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "person-circle-outline" : "person"}
								color={color}
							/>
						),
						tabBarShowLabel: false,
					}}
				/>
			</Tabs>
		</BookingTypeProvider>
	);
}
