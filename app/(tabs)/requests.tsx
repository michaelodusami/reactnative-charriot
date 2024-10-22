import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Dimensions,
	RefreshControl,
	Animated,
	ViewStyle,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import SafeArea from "@/components/SafeArea";
import { useUser } from "@/providers/UserContext";
import { getAllUserRequests } from "@/server/requests";
import { PeregrineColors } from "@/constants/Colors";

interface Request {
	request_id: string;
	user_id: string;
	hotel_id: string;
	department: string;
	task: string;
	time_issued: string;
	time_completed: string;
	status: "pending" | "in-progress" | "completed";
}

interface StyleProps {
	status: string;
}

const REFRESH_INTERVAL = 3000;
const ANIMATION_DURATION = 300;

const RequestsTab: React.FC = () => {
	const { user } = useUser();
	const [requests, setRequests] = useState<Request[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	// Animation values
	const fadeAnim = useState(new Animated.Value(0))[0];
	const scaleAnim = useState(new Animated.Value(0.95))[0];
	const rotateAnims = useState({
		pending: new Animated.Value(0),
		"in-progress": new Animated.Value(0),
		completed: new Animated.Value(0),
	})[0];

	const fetchRequests = useCallback(async () => {
		try {
			setLoading(true);
			const response = await getAllUserRequests(user.userId);
			setRequests(response);

			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: ANIMATION_DURATION,
					useNativeDriver: true,
				}),
				Animated.spring(scaleAnim, {
					toValue: 1,
					friction: 8,
					tension: 40,
					useNativeDriver: true,
				}),
			]).start();
		} catch (error) {
			console.error("Failed to fetch requests:", error);
		} finally {
			setLoading(false);
		}
	}, [user.userId]);

	useEffect(() => {
		fetchRequests();
		const interval = setInterval(fetchRequests, REFRESH_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const requestCounts = {
		Pending: requests.filter((r) => r.status === "pending").length,
		"In Progress": requests.filter((r) => r.status === "in-progress").length,
		Completed: requests.filter((r) => r.status === "completed").length,
	};

	const chartData = Object.entries(requestCounts).map(([name, count]) => ({
		name,
		count,
		color:
			name === "Pending"
				? PeregrineColors.yellow
				: name === "In Progress"
				? PeregrineColors.blue
				: "green",
		legendFontColor: "#7F7F7F",
		legendFontSize: 12,
	}));

	const getStatusColor = (status: string): string => {
		switch (status.toLowerCase()) {
			case "pending":
				return PeregrineColors.yellow;
			case "completed":
				return "green";
			default:
				return PeregrineColors.blue;
		}
	};

	const RequestStatusIndicator: React.FC<StyleProps> = ({ status }) => (
		<View style={[styles.statusIndicator, { backgroundColor: getStatusColor(status) }]} />
	);

	const SectionHeader: React.FC<StyleProps> = ({ status }) => {
		const backgroundColor = getStatusColor(status);
		return <View style={[styles.sectionHeader, { backgroundColor }]} />;
	};

	const toggleSection = (section: string) => {
		const anim =
			rotateAnims[section.toLowerCase().replace(" ", "-") as keyof typeof rotateAnims];

		Animated.timing(anim, {
			toValue: expandedSection === section ? 0 : 1,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start();

		setExpandedSection(expandedSection === section ? null : section);
	};

	const RequestItem: React.FC<{ item: Request; index: number }> = ({ item, index }) => {
		const itemAnimation = useState(new Animated.Value(0))[0];

		useEffect(() => {
			Animated.timing(itemAnimation, {
				toValue: 1,
				duration: ANIMATION_DURATION,
				delay: index * 50,
				useNativeDriver: true,
			}).start();
		}, []);

		return (
			<Animated.View
				style={[
					styles.requestItem,
					{
						opacity: itemAnimation,
						transform: [
							{
								translateY: itemAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: [20, 0],
								}),
							},
						],
					},
				]}
			>
				<RequestStatusIndicator status={item.status} />
				<View style={styles.requestContent}>
					<Text style={styles.requestTask}>{item.task}</Text>
					<Text style={styles.requestDetails}>
						{item.department} • {format(new Date(item.time_issued), "MMM d, HH:mm")}
					</Text>
					{item.time_completed && (
						<Text style={styles.completedText}>
							✓ Completed {format(new Date(item.time_completed), "MMM d, HH:mm")}
						</Text>
					)}
				</View>
			</Animated.View>
		);
	};

	const renderSection = ({ item: [status, count] }: { item: [string, number] }) => {
		const rotateAnim =
			rotateAnims[status.toLowerCase().replace(" ", "-") as keyof typeof rotateAnims];
		const spin = rotateAnim.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "180deg"],
		});

		return (
			<View style={styles.section}>
				<TouchableOpacity
					onPress={() => toggleSection(status)}
					style={styles.sectionHeaderContainer}
				>
					<SectionHeader status={status} />
					<View style={styles.sectionHeaderContent}>
						<Text style={styles.sectionHeaderText}>{status}</Text>
						<View style={styles.countBadge}>
							<Text style={styles.countText}>{count}</Text>
						</View>
					</View>
					<Animated.View style={{ transform: [{ rotate: spin }] }}>
						<Ionicons name="chevron-down" size={24} color="#FFF" />
					</Animated.View>
				</TouchableOpacity>
				{expandedSection === status && (
					<FlatList
						data={requests.filter(
							(r) => r.status.toLowerCase() === status.toLowerCase()
						)}
						renderItem={({ item, index }) => <RequestItem item={item} index={index} />}
						keyExtractor={(item) => item.request_id}
						contentContainerStyle={styles.sectionContent}
					/>
				)}
			</View>
		);
	};

	// if (loading) {
	// 	return (
	// 		<View style={styles.loadingContainer}>
	// 			<Text>Loading...</Text>
	// 		</View>
	// 	);
	// }

	return (
		<SafeArea>
			<Animated.View
				style={[
					styles.container,
					{
						opacity: fadeAnim,
						transform: [{ scale: scaleAnim }],
					},
				]}
			>
				<FlatList
					ListHeaderComponent={
						<>
							<View style={styles.headerContainer}>
								<Text style={styles.headerText}>Request Dashboard</Text>
								<Text style={styles.subHeaderText}>
									{requests.length} Total Requests
								</Text>
							</View>
							<View style={styles.chartContainer}>
								<PieChart
									data={chartData}
									width={Dimensions.get("window").width - 32}
									height={220}
									chartConfig={{
										backgroundColor: "#FFF",
										backgroundGradientFrom: "#FFF",
										backgroundGradientTo: "#FFF",
										color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
										style: {
											borderRadius: 16,
										},
									}}
									accessor="count"
									backgroundColor="transparent"
									paddingLeft="15"
									center={[10, 10]}
									absolute
								/>
							</View>
						</>
					}
					data={Object.entries(requestCounts)}
					renderItem={renderSection}
					keyExtractor={(item) => item[0]}
					contentContainerStyle={styles.listContainer}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={async () => {
								setRefreshing(true);
								await fetchRequests();
								setRefreshing(false);
							}}
							tintColor="#4ECDC4"
						/>
					}
				/>
			</Animated.View>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F7F9FC",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F7F9FC",
	},
	headerContainer: {
		padding: 24,
		backgroundColor: "#FFF",
		borderBottomWidth: 1,
		borderBottomColor: "#E8ECF4",
	},
	headerText: {
		fontSize: 28,
		fontWeight: "700",
		color: "#1A1F36",
		fontFamily: "EffraFamily",
		marginBottom: 4,
	},
	subHeaderText: {
		fontSize: 16,
		color: "#6B7280",
		fontFamily: "EffraFamily",
	},
	chartContainer: {
		margin: 16,
		backgroundColor: "#FFF",
		borderRadius: 16,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	listContainer: {
		paddingBottom: 24,
	},
	section: {
		marginHorizontal: 16,
		marginBottom: 16,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#FFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	sectionHeaderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	sectionHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	sectionHeaderContent: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	sectionHeaderText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#FFF",
		marginRight: 8,
	},
	countBadge: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
	},
	countText: {
		color: "#FFF",
		fontSize: 14,
		fontWeight: "600",
	},
	sectionContent: {
		padding: 8,
	},
	requestItem: {
		flexDirection: "row",
		backgroundColor: "#FFF",
		borderRadius: 12,
		marginVertical: 4,
		marginHorizontal: 8,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	statusIndicator: {
		width: 4,
		borderRadius: 2,
		marginRight: 12,
	},
	requestContent: {
		flex: 1,
	},
	requestTask: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1A1F36",
		marginBottom: 4,
		fontFamily: "EffraFamily",
	},
	requestDetails: {
		fontSize: 14,
		color: "#6B7280",
		fontFamily: "EffraFamily",
	},
	completedText: {
		fontSize: 14,
		color: "#45B7D1",
		marginTop: 4,
		fontFamily: "EffraFamily",
	},
});

export default RequestsTab;
