import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Redirect } from "expo-router";

const LoginScreen: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [validLogin, setValidLogin] = useState<boolean>(false);

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	useEffect(() => {
		setIsEmailValid(validateEmail(email));
	}, [email]);

	const handleLogin = () => {
		console.log("Login pressed");
		// endpoint --
		// after auth has verified the user
		setValidLogin(!validLogin);
	};

	if (validLogin) {
		return <Redirect href={"/(tabs)"} />;
	}

	return (
		<ImageBackground
			source={require("../../assets/images/background.webp")}
			style={styles.backgroundImage}
		>
			<SafeAreaView style={styles.container}>
				<View style={styles.innerContainer}>
					<View style={styles.headingStylesContainer}>
						<ThemedText style={styles.title}>Login here</ThemedText>
						<ThemedText style={styles.subtitle}>
							Welcome back we're glad to have you!
						</ThemedText>
					</View>

					<View style={styles.emailAndPasswordContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Email"
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</View>
						{email !== "" && !isEmailValid && (
							<Text style={styles.errorText}>Please enter a valid email address</Text>
						)}

						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Password"
								value={password}
								onChangeText={setPassword}
								secureTextEntry
							/>
						</View>
					</View>

					<View style={styles.checkboxContainer}>
						<Checkbox
							value={isChecked}
							onValueChange={setIsChecked}
							color={isChecked ? "#3366FF" : undefined}
						/>
						<ThemedText style={styles.checkboxLabel}>
							I agree to the{" "}
							<ThemedText style={styles.termsText}>Terms and Conditions</ThemedText>
						</ThemedText>
					</View>

					<Pressable
						style={[styles.signInButton, !isChecked && styles.disabledButton]}
						onPress={handleLogin}
						disabled={!isChecked}
					>
						<ThemedText style={styles.signInButtonText}>Sign in</ThemedText>
					</Pressable>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: "center",
		justifyContent: "center",
	},
	headingStylesContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	innerContainer: {
		flex: 1,
		padding: 20,
		paddingTop: "10%", // Start content from 10% of screen height
		justifyContent: "flex-start", // Align content to the top
	},
	title: {
		lineHeight: 60,
		fontFamily: "EffraFamily",
		marginTop: 80,
		fontSize: 36,
		fontWeight: "bold",
		color: "#1F41BB",
		marginBottom: 26,
	},
	subtitle: {
		fontFamily: "EffraFamily",
		width: 225,
		height: 60,
		fontSize: 20,
		fontWeight: "semibold",
		textAlign: "center",
		color: "#000000",
		marginBottom: "10%", // Increased spacing after subtitle
	},
	emailAndPasswordContainer: {
		marginTop: 10,
		marginBottom: 20,
		marginHorizontal: "4%",
	},
	inputContainer: {
		backgroundColor: "#FFF",
		borderRadius: 10,
		marginBottom: "5%", // Increased spacing between inputs
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	input: {
		fontFamily: "EffraFamily",
		fontSize: 19,
		height: 64,
		paddingHorizontal: 20,
	},
	checkboxContainer: {
		marginHorizontal: "4%",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "10%",
	},
	checkboxLabel: {
		marginLeft: 12,
		fontSize: 16,
		color: "#333",
	},
	signInButton: {
		fontFamily: "EffraFamily",
		fontSize: 19,
		marginHorizontal: "4%",
		backgroundColor: "#3366FF",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: "7%", // Increased spacing after button
	},
	signInButtonText: {
		color: "white",
		fontSize: 19,
		fontWeight: "bold",
	},
	createAccount: {
		textAlign: "center",
		color: "#333",
		marginBottom: "10%", // Increased spacing after create account text
	},
	orContinueWith: {
		textAlign: "center",
		color: "#666",
		marginBottom: "5%", // Adjusted spacing
	},
	socialButtonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	socialButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#EEE",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 10,
	},
	errorText: {
		color: "red",
		marginBottom: 10,
	},
	termsText: {
		color: "#3366FF",
		textDecorationLine: "underline",
	},
	disabledButton: {
		backgroundColor: "#B0B0B0",
	},
});
export default LoginScreen;
