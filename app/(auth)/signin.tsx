import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	Animated,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Redirect } from "expo-router";
import { signIn } from "@/server/requests";
import { useUser } from "@/providers/UserContext";
import { PeregrineColors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC = () => {
	const { user, updateUser } = useUser();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [validLogin, setValidLogin] = useState<boolean>(false);

	// Animation values
	const fadeAnim = new Animated.Value(0);
	const slideAnim = new Animated.Value(50);

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleLogin = async () => {
		const response = await signIn(email, password);
		if (response) {
			updateUser(email, response);
			setValidLogin(true);
		}
	};

	if (validLogin) {
		return <Redirect href={"/(tabs)"} />;
	}

	return (
		<ImageBackground
			source={{
				uri: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&auto=format&fit=crop",
			}}
			style={styles.backgroundImage}
		>
			<View style={styles.overlay}>
				<SafeAreaView style={styles.container}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.keyboardAvoid}
					>
						<Animated.View
							style={[
								styles.innerContainer,
								{
									opacity: fadeAnim,
									transform: [{ translateY: slideAnim }],
								},
							]}
						>
							<View style={styles.headingStylesContainer}>
								<ThemedText style={styles.title}>Hello!</ThemedText>
								<ThemedText style={styles.subtitle}>
									Access Your Hotel Services
								</ThemedText>
								<Text style={styles.description}>
									Connect to premium amenities and personalized experiences
									through your hotel's service platform
								</Text>
							</View>

							<View style={styles.formContainer}>
								<View style={styles.inputContainer}>
									<Ionicons
										name="mail-outline"
										size={24}
										color={PeregrineColors.blue}
										style={styles.inputIcon}
									/>
									<TextInput
										style={styles.input}
										placeholder="Email"
										placeholderTextColor="#666"
										value={email}
										onChangeText={setEmail}
										keyboardType="email-address"
										autoCapitalize="none"
									/>
								</View>

								<View style={styles.inputContainer}>
									<Ionicons
										name="lock-closed-outline"
										size={24}
										color={PeregrineColors.blue}
										style={styles.inputIcon}
									/>
									<TextInput
										style={styles.input}
										placeholder="Password"
										placeholderTextColor="#666"
										value={password}
										onChangeText={setPassword}
										secureTextEntry
									/>
								</View>

								<View style={styles.checkboxContainer}>
									<Checkbox
										value={isChecked}
										onValueChange={setIsChecked}
										color={isChecked ? PeregrineColors.blue : undefined}
									/>
									<ThemedText style={styles.checkboxLabel}>
										I agree to the{" "}
										<ThemedText style={styles.termsText}>
											Terms and Conditions
										</ThemedText>
									</ThemedText>
								</View>
								{email !== "" && !validateEmail(email) && (
									<Text style={styles.errorText}>
										Please enter a valid email address
									</Text>
								)}
								<Pressable
									style={[
										styles.signInButton,
										(!isChecked || !validateEmail(email)) &&
											styles.disabledButton,
									]}
									onPress={handleLogin}
									disabled={!isChecked || !validateEmail(email)}
								>
									<ThemedText style={styles.signInButtonText}>Sign in</ThemedText>
								</Pressable>

								{/* <Text style={styles.forgotPassword}>Forgot your password?</Text> */}
							</View>
						</Animated.View>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	container: {
		flex: 1,
	},
	keyboardAvoid: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		padding: 20,
		paddingTop: "10%",
		justifyContent: "center",
	},
	headingStylesContainer: {
		width: "100%",
		alignItems: "center",
		marginBottom: 40,
	},
	title: {
		fontFamily: "EffraFamily",
		fontSize: 36,
		lineHeight: 38,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 10,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	subtitle: {
		fontFamily: "EffraFamily",
		fontSize: 24,
		color: "#FFFFFF",
		marginBottom: 15,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	description: {
		fontFamily: "EffraFamily",
		fontSize: 16,
		color: "#FFFFFF",
		textAlign: "center",
		paddingHorizontal: 20,
		lineHeight: 24,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	formContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		borderRadius: 20,
		padding: 20,
		marginHorizontal: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		marginBottom: 15,
		height: 60,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	inputIcon: {
		padding: 10,
		marginLeft: 10,
	},
	input: {
		flex: 1,
		fontFamily: "EffraFamily",
		fontSize: 16,
		color: "#333",
		paddingLeft: 10,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		marginTop: 10,
	},
	checkboxLabel: {
		marginLeft: 12,
		fontSize: 14,
		color: "#333",
		flex: 1,
	},
	signInButton: {
		backgroundColor: PeregrineColors.blue,
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 4,
	},
	signInButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
	errorText: {
		color: "#FF3B30",
		fontSize: 12,
		marginBottom: 10,
		marginLeft: 5,
	},
	termsText: {
		color: PeregrineColors.blue,
		textDecorationLine: "underline",
	},
	disabledButton: {
		backgroundColor: "rgba(51, 102, 255, 0.5)",
	},
	forgotPassword: {
		textAlign: "center",
		color: PeregrineColors.blue,
		fontSize: 14,
		fontFamily: "EffraFamily",
		textDecorationLine: "underline",
	},
});

export default LoginScreen;
