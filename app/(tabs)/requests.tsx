import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Dimensions,
	RefreshControl,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import SafeArea from "@/components/SafeArea";
import { useUser } from "@/providers/UserContext";
import { getAllUserRequests } from "@/server/requests";

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

const REFRESH_INTERVAL = 3000; // 30 seconds

const RequestsTab: React.FC = () => {
	const { user } = useUser();
	const [requests, setRequests] = useState<Request[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [expandedSection, setExpandedSection] = useState<string | null>(null);

	const fetchRequests = useCallback(async () => {
		try {
			const response = await getAllUserRequests(user.userId);
			setRequests(response);
		} catch (error) {
			console.error("Failed to fetch requests:", error);
		}
	}, [user.userId]);

	useEffect(() => {
		fetchRequests();
		const interval = setInterval(fetchRequests, REFRESH_INTERVAL);
		return () => clearInterval(interval);
	}, [fetchRequests]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchRequests();
		setRefreshing(false);
	}, [fetchRequests]);

	const requestCounts = {
		Pending: requests.filter((r) => r.status === "pending").length,
		"In Progress": requests.filter((r) => r.status === "in-progress").length,
		Completed: requests.filter((r) => r.status === "completed").length,
	};

	const chartData = Object.entries(requestCounts).map(([name, count]) => ({
		name,
		count,
		color: name === "Pending" ? "#FFA500" : name === "In Progress" ? "#4169E1" : "#32CD32",
	}));

	const toggleSection = (section: string) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	const renderRequestItem = ({ item }: { item: Request }) => (
		<View style={styles.requestItem}>
			<Text style={styles.requestTask}>{item.task}</Text>
			<Text style={styles.requestDetails}>Department: {item.department}</Text>
			<Text style={styles.requestDetails}>
				Issued: {format(new Date(item.time_issued), "MMM d, yyyy HH:mm")}
			</Text>
			{item.time_completed && (
				<Text style={styles.requestDetails}>
					Completed: {format(new Date(item.time_completed), "MMM d, yyyy HH:mm")}
				</Text>
			)}
		</View>
	);

	const renderSection = ({ item: [status, count] }: { item: [string, number] }) => (
		<View style={styles.section}>
			<TouchableOpacity onPress={() => toggleSection(status)} style={styles.sectionHeader}>
				<Text style={styles.sectionHeaderText}>
					{status} ({count})
				</Text>
				<Ionicons
					name={expandedSection === status ? "chevron-up" : "chevron-down"}
					size={24}
					color="#333"
				/>
			</TouchableOpacity>
			{expandedSection === status && (
				<FlatList
					data={requests.filter((r) => r.status.toLowerCase() === status.toLowerCase())}
					renderItem={renderRequestItem}
					keyExtractor={(item) => item.request_id}
					contentContainerStyle={styles.sectionContent}
				/>
			)}
		</View>
	);

	return (
		<SafeArea>
			<FlatList
				ListHeaderComponent={
					<>
						<View style={styles.headerContainer}>
							<Text style={styles.headerText}>Request Overview</Text>
						</View>
						<View style={styles.chartContainer}>
							<PieChart
								data={chartData}
								width={Dimensions.get("window").width - 32}
								height={220}
								chartConfig={{
									color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
									labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
				contentContainerStyle={styles.container}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</SafeArea>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#f5f5f5",
		paddingBottom: 20,
		fontFamily: "EffraFamily",
	},
	headerContainer: {
		padding: 16,
		// backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	headerText: {
		fontSize: 22,
		fontWeight: "600",
		color: "#333",
		fontFamily: "EffraFamily",
	},
	chartContainer: {
		alignItems: "center",
		marginVertical: 20,
		// backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	section: {
		marginHorizontal: 16,
		marginBottom: 16,
		backgroundColor: "#fff",
		borderRadius: 8,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "#f0f0f0",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	sectionHeaderText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#444",
	},
	sectionContent: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "#f9f9f9",
	},
	requestItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		backgroundColor: "#fff",
		borderRadius: 8,
		marginVertical: 4,
		paddingHorizontal: 12,
		elevation: 1,
	},
	requestTask: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 4,
		fontFamily: "EffraFamily",
	},
	requestDetails: {
		fontSize: 14,
		color: "#666",
		marginBottom: 2,
		fontFamily: "EffraFamily",
	},
});

export default RequestsTab;
