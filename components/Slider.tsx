import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { FlatList } from "react-native";
import { ImageSlider, ImageSliderType } from "@/data/CarouselData";
import Carousel from "react-native-snap-carousel";
import CarouselItem from "./CarouselItem";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

type Props = {
    itemList: ImageSliderType[]
}

const Slider = ({itemList}: Props) => {
    const scrollX = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });
    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={itemList}
                renderItem={({ item, index }) => (
                    <CarouselItem item={item} index={index} scrollX={scrollX}/>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
            />
        </View>
    )
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    }
})