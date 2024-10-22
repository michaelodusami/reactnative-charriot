/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const PeregrineColors = {
	blue: "rgb(45,57,87)",
	yellow: "rgb(209,177,116)",
	white: "#fff",
};

export const Colors2 = {
	// Red shades
	lightRed: "#FF6666",
	mediumRed: "#FF0000",
	darkRed: "#990000",

	// Blue shades
	lightBlue: "#66CCFF",
	mediumBlue: "#0066CC",
	darkBlue: "#003366",

	// Green shades
	lightGreen: "#99FF99",
	mediumGreen: "#33CC33",
	darkGreen: "#006600",
};

// You can also create separate objects for each color family if preferred
export const MariottShades = {
	light: Colors2.lightRed,
	medium: Colors2.mediumRed,
	dark: Colors2.darkRed,
};

export const BlueShades = {
	light: Colors2.lightBlue,
	medium: Colors2.mediumBlue,
	dark: Colors2.darkBlue,
};

export const GreenShades = {
	light: Colors2.lightGreen,
	medium: Colors2.mediumGreen,
	dark: Colors2.darkGreen,
};

export const Colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
};
