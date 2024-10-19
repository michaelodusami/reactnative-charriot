import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

const WeatherWidget = () => {
    // In a real app, you'd fetch this data from a weather API
    const weatherData = {
        temperature: 72,
        condition: 'Sunny',
        city: 'New York'
    };

    return (
        <View style={styles.container}>
            <View style={styles.weatherInfo}>
                <Ionicons name="sunny" size={40} color="#FFD700" />
                <ThemedText style={styles.temperature}>{weatherData.temperature}°F</ThemedText>
            </View>
            <ThemedText style={styles.condition}>{weatherData.condition}</ThemedText>
            <ThemedText style={styles.city}>{weatherData.city}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    weatherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 36,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    condition: {
        fontSize: 18,
        marginTop: 5,
    },
    city: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
});

export default WeatherWidget;