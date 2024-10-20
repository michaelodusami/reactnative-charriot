import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { FlatList, ViewToken } from "react-native";
import { ImageSlider, ImageSliderType } from "@/data/CarouselData";
import Carousel from "react-native-snap-carousel";
import CarouselItem from "./CarouselItem";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

type Props = {
    itemList: ImageSliderType[];
    onActiveItemChange: (item: ImageSliderType) => void;
}

const Slider = ({itemList, onActiveItemChange}: Props) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const scrollX = useSharedValue(0);

    const onViewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index ?? 0;
            setActiveIndex(newIndex);
            onActiveItemChange(itemList[newIndex]);
        }
    }, [itemList, onActiveItemChange]);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
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
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
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