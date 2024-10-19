import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
    title: string;
    image: ImageSourcePropType;
    description: string;
};

export const ImageSlider = [
    {
        title: 'Ongoing Trips',
        image: require('@/assets/images/current_trip.webp'),
        description: 'Your ongoing trip at Fairfield Inn, Blacksburg, VA'
    }, 
    {
        title: 'Upcoming Trips',
        image: require('@/assets/images/upcoming_trips.webp'),
        description: 'Explore your upcoming trips'
    }, 
    {
        title: 'Past Trips',
        image: require('@/assets/images/past_trips.webp'),
        description: 'View past trips and adventures'
    }, 
];