import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ImageSliderType } from '@/data/CarouselData';

type Props = {
    activeItem: ImageSliderType;
};

const TabView: React.FC<Props> = ({ activeItem }) => {
    const [activeTab, setActiveTab] = useState('Details');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Details':
                return <ThemedText>Details for {activeItem.title}</ThemedText>;
            case 'Requests':
                return <ThemedText>Requests for {activeItem.title}</ThemedText>;
            case 'Community Events':
                return <ThemedText>Community Events for {activeItem.title}</ThemedText>;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {['Details', 'Requests', 'Community Events'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <ThemedText style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.contentContainer}>{renderTabContent()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
    },
    tabText: {
        fontSize: 16,
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
});

export default TabView;