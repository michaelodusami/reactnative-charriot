import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

// Define the structure of a request
interface Request {
    id: number;
    title: string;
    status: 'Pending' | 'In-progress' | 'Completed';
}

// Mock data for demonstration
const mockRequests: Request[] = [
    { id: 1, title: 'Room service', status: 'Pending' },
    { id: 2, title: 'Extra towels', status: 'In-progress' },
    { id: 3, title: 'Late check-out', status: 'Completed' },
    // Add more mock data as needed
];

const RequestsTab: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    useEffect(() => {
        // In a real app, you would fetch the requests from an API here
        setRequests(mockRequests);
    }, []);

    const requestCounts = {
        Pending: requests.filter(r => r.status === 'Pending').length,
        'In-progress': requests.filter(r => r.status === 'In-progress').length,
        Completed: requests.filter(r => r.status === 'Completed').length,
    };

    const chartData = [
        { name: 'Pending', population: requestCounts.Pending, color: '#FFA500', legendFontColor: '#7F7F7F', legendFontSize: 12 },
        { name: 'In-progress', population: requestCounts['In-progress'], color: '#4169E1', legendFontColor: '#7F7F7F', legendFontSize: 12 },
        { name: 'Completed', population: requestCounts.Completed, color: '#32CD32', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    ];

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const renderRequests = (status: 'Pending' | 'In-progress' | 'Completed') => {
        const filteredRequests = requests.filter(r => r.status === status);
        return filteredRequests.map((request, index) => (
            <Text key={request.id} style={styles.requestItem}>
                {index + 1}. {request.title}
            </Text>
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.chartContainer}>
                <PieChart
                    data={chartData}
                    width={300}
                    height={200}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
            </View>

            {['Pending', 'In-progress', 'Completed'].map((status) => (
                <View key={status} style={styles.section}>
                    <TouchableOpacity onPress={() => toggleSection(status)} style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{status}</Text>
                        <Ionicons
                            name={expandedSection === status ? 'chevron-up' : 'chevron-down'}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    {expandedSection === status && (
                        <View style={styles.sectionContent}>
                            {renderRequests(status as 'Pending' | 'In-progress' | 'Completed')}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        padding: 16,
    },
    requestItem: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default RequestsTab;