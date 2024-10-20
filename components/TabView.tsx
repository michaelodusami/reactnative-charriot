import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ImageSliderType } from '@/data/CarouselData';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { submitRequest } from '@/server/requests';
import axiosInstance from "@/server/axiosInstance";
import apiInstance from '@/server/axiosInstance';
import { useUser } from '@/providers/UserContext'; // Import the useUser hook

type Props = {
    activeItem: ImageSliderType;
    userEmail: string;
};

const TabView: React.FC<Props> = ({ activeItem }) => {
    const [activeTab, setActiveTab] = useState('Details');
    const OngoingTrip = () => {
        const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

        const DetailsTab = () => (
            <View style={styles.detailsContainer}>
                <View style={styles.dateContainer}>
                    <View style={styles.dateItem}>
                        <ThemedText style={styles.dateLabel}>Check-In</ThemedText>
                        <View style={styles.dateCalendarStyle}>
                            <Ionicons name="calendar-outline" size={24} color="black" />
                            <ThemedText style={styles.dateText}>July 15, 2024</ThemedText>
                        </View>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.dateItem}>
                        <ThemedText style={styles.dateLabel}>Check-Out</ThemedText>
                        <View style={styles.dateCalendarStyle}>
                            <Ionicons name="calendar-outline" size={24} color="black" />
                            <ThemedText style={styles.dateText}>July 15, 2024</ThemedText>
                        </View>
                    </View>
                </View>
                <View style={styles.roomInfoContainer}>
                    <ThemedText style={styles.sectionTitle}>Room Information</ThemedText>
                    <View style={styles.roomDetails}>
                        <View style={styles.roomDetailItem}>
                            <Ionicons name="bed-outline" size={24} color="black" />
                            <ThemedText style={styles.roomDetailText}>2 Beds</ThemedText>
                        </View>
                        <View style={styles.roomDetailItem}>
                            <Ionicons name="water-outline" size={24} color="black" />
                            <ThemedText style={styles.roomDetailText}>1 Bathroom</ThemedText>
                        </View>
                        <View style={styles.roomDetailItem}>
                            <Ionicons name="resize-outline" size={24} color="black" />
                            <ThemedText style={styles.roomDetailText}>King Size Room</ThemedText>
                        </View>
                    </View>
                </View>
                <View style={styles.amenitiesContainer}>
                    <ThemedText style={styles.sectionTitle}>Amenities</ThemedText>
                    <View style={styles.amenitiesGrid}>
                        {[
                            { name: 'Breakfast available', icon: 'restaurant-outline' },
                            { name: 'Bar', icon: 'wine-outline' },
                            { name: 'Room service', icon: 'cart-outline' },
                            { name: 'Pet friendly', icon: 'paw-outline' },
                            { name: '24/7 front desk', icon: 'time-outline' },
                            { name: 'Parking available', icon: 'car-outline' },
                        ].map((amenity, index) => (
                            <View key={index} style={styles.amenityItem}>
                                <Ionicons name={amenity.icon as any} size={24} color="black" />
                                <ThemedText style={styles.amenityText}>{amenity.name}</ThemedText>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );

        const RequestsTab: React.FC<Props> = ({ activeItem, userEmail }) => {
            const { user } = useUser();

            const services = [
                {
                    category: 'Maintenance', items: [
                        { id: '1', name: 'Repair Request', icon: 'construct-outline' },
                        { id: '2', name: 'Plumbing Issue', icon: 'water-outline' },
                        { id: '3', name: 'Electric', icon: 'flash-outline' }
                    ]
                },
                {
                    category: 'Housekeeping', items: [
                        { id: '4', name: 'Room Cleaning', icon: 'brush-outline' },
                        { id: '5', name: 'Linen Change', icon: 'bed-outline' },
                        { id: '6', name: 'Toiletries', icon: 'cafe-outline' }
                    ]
                },
                {
                    category: 'Concierge', items: [
                        { id: '7', name: 'Restaurant', icon: 'restaurant-outline' },
                        { id: '8', name: 'Taxi Booking', icon: 'car-outline' },
                        { id: '9', name: 'Tour Info', icon: 'map-outline' }
                    ]
                }
            ];


            const handleRequestClick = async (category: string, requestName: string) => {
                try {
                    const requestData = {
                        user_id: user.userId,
                        hotel_id: "courtyard", // Replace with the actual hotel ID
                        department: category, // Update this with the relevant department
                        task: requestName, // The task name from the clicked item
                    };

                    console.log("Request data = ", requestData);

                    const response = await apiInstance.post(
                        "https://p5vfoq23g5ps45rtvky2xydcxe0sbwph.lambda-url.us-east-1.on.aws/api/requests/requests",
                        requestData,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "accept": "application/json",
                            },
                        }
                    );

                    console.log("Response = ", response.data);

                    if (response.status === 200 || response.status === 201) {
                        Alert.alert("Success", `Your ${requestName} request has been submitted.`);
                    } else {
                        throw new Error("Failed to submit request");
                    }
                } catch (error) {
                    console.error(error);
                    Alert.alert("Error", "Failed to submit request. Please try again.");
                }
            };


            return (
                <ScrollView style={styles.requestsContainer}>
                    {services.map((category) => (
                        <View key={category.category} style={styles.categoryContainer}>
                            <ThemedText style={styles.categoryTitle}>{category.category}</ThemedText>
                            <View style={styles.requestsGrid}>
                                {category.items.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.requestItem}
                                        onPress={() => handleRequestClick((category.category).toLowerCase(), item.name)}
                                    >
                                        <View style={styles.requestIcon}>
                                            <Ionicons name={item.icon as any} size={24} color="black" />
                                        </View>
                                        <ThemedText style={styles.requestText}>{item.name}</ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            );
        };

        const CommunityEventsTab = () => {
            const events = [
                {
                    id: 1,
                    title: "Summer Music Festival",
                    image: require('@/assets/images/community.jpeg'),
                    description: "Join us for a weekend of live music performances featuring local and international artists. Food trucks and craft vendors will be present. Date: August 15-16, 2024, at Central Park."
                },
                {
                    id: 2,
                    title: "Annual Charity Run",
                    image: require('@/assets/images/community.jpeg'),
                    description: "Participate in our 5K run to raise funds for local children's hospitals. All fitness levels welcome. Date: September 5, 2024, starting at City Hall Plaza."
                },
                {
                    id: 3,
                    title: "Art in the Park",
                    image: require('@/assets/images/community.jpeg'),
                    description: "Explore works from local artists at our open-air art exhibition. Live demonstrations and workshops available. Date: July 22-23, 2024, at Riverside Park."
                },
                {
                    id: 4,
                    title: "Food and Wine Festival",
                    image: require('@/assets/images/community.jpeg'),
                    description: "Savor cuisines from around the world and taste wines from local vineyards. Cooking demonstrations by celebrity chefs included. Date: October 8-10, 2024, at the Convention Center."
                }
            ];

            return (
                <ScrollView style={styles.eventsContainer}>
                    {events.map((event) => (
                        <TouchableOpacity
                            key={event.id}
                            style={styles.eventItem}
                            onPress={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                        >
                            <View style={styles.eventHeader}>
                                <Ionicons
                                    name={expandedEvent === event.id ? 'chevron-down-outline' : 'chevron-forward-outline'}
                                    size={24}
                                    color="black"
                                    style={styles.eventIcon}
                                />
                                <Image source={event.image} style={styles.eventPhoto} />
                                <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                            </View>
                            {expandedEvent === event.id && (
                                <ThemedText style={styles.eventDescription}>
                                    {event.description}
                                </ThemedText>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            );
        };

        const renderTabContent = () => {
            switch (activeTab) {
                case 'Details':
                    return <DetailsTab />;
                case 'Requests':
                    return <RequestsTab activeItem={{
                        title: '',
                        image: 0,
                        description: ''
                    }} userEmail={''} />;
                case 'Community Events':
                    return <CommunityEventsTab />;
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
    }

    const UpcomingTrip = () => {
        const [activeTab, setActiveTab] = useState('Details');
        const [showRecommendations, setShowRecommendations] = useState(false);

        const DetailsTab = () => (
            <ScrollView style={styles.scrollView}>
                <ThemedText style={styles.sectionTitle}>Upcoming Bookings</ThemedText>
                {[
                    {
                        hotel: "Grand Hotel",
                        city: "New York City",
                        rooms: "2 Deluxe Suites",
                        checkIn: "Fri, Sep 22",
                        checkOut: "Sun, Sep 24"
                    },
                    {
                        hotel: "Seaside Resort",
                        city: "Miami",
                        rooms: "1 Ocean View Room",
                        checkIn: "Mon, Oct 15",
                        checkOut: "Fri, Oct 19"
                    }
                ].map((booking, index) => (
                    <View key={index} style={styles.bookingItem}>
                        <ThemedText style={styles.bookingNumber}>{index + 1}.</ThemedText>
                        <View style={styles.bookingDetails}>
                            <View style={styles.row}>
                                <Ionicons name="business-outline" size={20} color="#666" />
                                <ThemedText style={styles.hotelName}>{`${booking.hotel}, ${booking.city}`}</ThemedText>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="bed-outline" size={20} color="#666" />
                                <ThemedText style={styles.roomInfo}>{booking.rooms}</ThemedText>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="calendar-outline" size={20} color="#666" />
                                <ThemedText style={styles.dateInfo}>{`${booking.checkIn} to ${booking.checkOut}`}</ThemedText>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );

        const GetRecommendationsTab = () => (
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                    style={styles.recommendationButton}
                    onPress={() => setShowRecommendations(true)}
                >
                    <LinearGradient
                        colors={['#56CCF2', '#2F80ED', '#1B74E4']}
                        style={styles.gradient}
                    >
                        <Ionicons name="sparkles-outline" size={24} color="white" />
                        <ThemedText style={styles.buttonText}>Get Ideas</ThemedText>
                    </LinearGradient>
                </TouchableOpacity>
                {showRecommendations && (
                    <View style={styles.recommendationsList}>
                        <ThemedText style={styles.recommendationsTitle}>Suggestions for your trip:</ThemedText>
                        {[
                            "Visit the iconic Empire State Building",
                            "Take a stroll in Central Park",
                            "Explore the Metropolitan Museum of Art",
                            "Enjoy a Broadway show",
                            "Try New York-style pizza",
                            "Take a boat tour around Manhattan"
                        ].map((item, index) => (
                            <View key={index} style={styles.recommendationItem}>
                                <Ionicons name="checkmark-circle-outline" size={20} color="#4c669f" />
                                <ThemedText style={styles.recommendationText}>{item}</ThemedText>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        );

        const renderTabContent = () => {
            switch (activeTab) {
                case 'Details':
                    return <DetailsTab />;
                case 'Get Recommendations':
                    return <GetRecommendationsTab />;
                default:
                    return null;
            }
        };

        return (
            <>
                <View style={styles.tabContainer}>
                    {['Details', 'Get Recommendations'].map((tab) => (
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
            </>
        );
    };

    const PastTrip = () => {
        const [activeTab, setActiveTab] = useState('Details');

        const DetailsTab = () => (
            <ScrollView style={styles.scrollView}>
                <ThemedText style={styles.sectionTitle}>Past Bookings</ThemedText>
                {[
                    {
                        hotel: "Mountain Lodge",
                        city: "Aspen",
                        rooms: "1 Chalet Suite",
                        checkIn: "Tue, Dec 5",
                        checkOut: "Sun, Dec 10"
                    },
                    {
                        hotel: "Beach Resort",
                        city: "Cancun",
                        rooms: "2 Ocean View Rooms",
                        checkIn: "Fri, Mar 15",
                        checkOut: "Wed, Mar 20"
                    },
                    {
                        hotel: "City Center Hotel",
                        city: "London",
                        rooms: "1 Executive Suite",
                        checkIn: "Mon, Jun 7",
                        checkOut: "Sat, Jun 12"
                    },
                    {
                        hotel: "Historic Inn",
                        city: "Boston",
                        rooms: "1 Classic Room",
                        checkIn: "Thu, Aug 18",
                        checkOut: "Sun, Aug 21"
                    }
                ].map((booking, index) => (
                    <View key={index} style={styles.bookingItem}>
                        <ThemedText style={styles.bookingNumber}>{index + 1}.</ThemedText>
                        <View style={styles.bookingDetails}>
                            <View style={styles.row}>
                                <Ionicons name="business-outline" size={20} color="#666" />
                                <ThemedText style={styles.hotelName}>{`${booking.hotel}, ${booking.city}`}</ThemedText>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="bed-outline" size={20} color="#666" />
                                <ThemedText style={styles.roomInfo}>{booking.rooms}</ThemedText>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="calendar-outline" size={20} color="#666" />
                                <ThemedText style={styles.dateInfo}>{`${booking.checkIn} to ${booking.checkOut}`}</ThemedText>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );

        const ContactHotelTab = () => (
            <View style={styles.contactContainer}>
                <ThemedText style={styles.contactTitle}>Have general inquiries about your past stay?</ThemedText>
                <View style={styles.contactMethod}>
                    <Ionicons name="call-outline" size={24} color="#4c669f" />
                    <ThemedText style={styles.contactInfo}>+1 (555) 123-4567</ThemedText>
                </View>
                <View style={styles.contactMethod}>
                    <Ionicons name="mail-outline" size={24} color="#4c669f" />
                    <ThemedText style={styles.contactInfo}>support@hotel.com</ThemedText>
                </View>
                <TouchableOpacity style={styles.chatbotButton}>
                    <Ionicons name="chatbubbles-outline" size={24} color="white" />
                    <ThemedText style={styles.chatbotButtonText}>Chat with our AI Assistant</ThemedText>
                </TouchableOpacity>
            </View>
        );

        const renderTabContent = () => {
            switch (activeTab) {
                case 'Details':
                    return <DetailsTab />;
                case 'Contact Hotel':
                    return <ContactHotelTab />;
                default:
                    return null;
            }
        };

        return (
            <>
                <View style={styles.tabContainer}>
                    {['Details', 'Contact Hotel'].map((tab) => (
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
            </>
        );
    };

    const renderContent = () => {
        switch (activeItem.title) {
            case 'Ongoing Trips':
                return <OngoingTrip />;
            case 'Upcoming Trips':
                return <UpcomingTrip />;
            case 'Past Trips':
                return <PastTrip />;
            default:
                return null;
        }
    };

    return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tab: {
        padding: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#007AFF',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    detailsContainer: {
        flex: 1,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dateItem: {
        alignItems: 'center',
    },
    dateCalendarStyle: {
        flexDirection: 'row',
        gap: 10
    },
    dateLabel: {
        fontFamily: 'EffraFamily',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 8
    },
    dateText: {
        fontSize: 16,
        color: '#666',
    },
    verticalDivider: {
        width: 2,
        backgroundColor: '#e0e0e0',
    },
    sectionTitle: {
        fontFamily: 'EffraFamily',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    roomInfoContainer: {
        marginTop: 14,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    roomDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    roomDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomDetailText: {
        marginLeft: 5,
        fontFamily: 'EffraFamily',
        fontSize: 16,
    },
    amenitiesContainer: {
        marginBottom: 10,
        marginHorizontal: 10
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 8,
    },
    amenityText: {
        marginLeft: 5,
        fontFamily: 'EffraFamily',
        fontSize: 16,
        marginBottom: 6
    },
    requestsContainer: {
        flex: 1,
    },
    categoryContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    categoryTitle: {
        fontFamily: 'EffraFamily',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    requestsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    requestItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 15,
    },
    requestIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    requestText: {
        fontFamily: 'EffraFamily',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    eventsContainer: {
        flex: 1,
        padding: 20,
    },
    eventItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 15,
    },
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventIcon: {
        marginRight: 10,
    },
    eventPhoto: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    eventTitle: {
        fontFamily: 'EffraFamily',
        fontSize: 22,
        fontWeight: 'bold',
        flex: 1,
    },
    eventDescription: {
        fontFamily: 'EffraFamily',
        fontSize: 18,
        marginTop: 10,
        paddingLeft: 34, // Aligns with the title, accounting for the icon width
    },
    scrollView: {
        flex: 1,
    },
    bookingItem: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 10,
    },
    bookingNumber: {
        fontFamily: "EffaFamily",
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    bookingDetails: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    hotelName: {
        fontFamily: "EffaFamily",
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    roomInfo: {
        fontFamily: "EffaFamily",
        fontSize: 16,
        marginLeft: 10,
    },
    dateInfo: {
        fontFamily: "EffaFamily",
        fontSize: 16,
        marginLeft: 10,
    },
    recommendationButton: {
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 20,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontFamily: "EffaFamily",
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    recommendationsList: {
        marginTop: 20,
    },
    recommendationsTitle: {
        fontFamily: "EffaFamily",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    recommendationText: {
        fontFamily: "EffaFamily",
        fontSize: 18,
        marginLeft: 10,
    },
    contactContainer: {
        padding: 20,
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contactMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    contactInfo: {
        fontSize: 18,
        marginLeft: 15,
    },
    chatbotButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B74E4',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    chatbotButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    }
});

export default TabView;