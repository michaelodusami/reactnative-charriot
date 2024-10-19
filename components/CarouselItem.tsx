import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ImageSliderType } from "@/data/CarouselData";
import SafeArea from "./SafeArea";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from "@expo/vector-icons";
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import internal from "stream";
type Props = {
    item: ImageSliderType;
    index: number;
    scrollX: SharedValue<number>;
}

const { width } = Dimensions.get('screen');

const CarouselItem = ({ item, index, scrollX }: Props) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.25, 0, width * 0.25],
                        Extrapolation.CLAMP
                    )
                }, 
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9], 
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
    })
    return (
        <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
            <Image source={item.image} style={{ width: 320, height: 320, borderRadius: 20 }} />
            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.8']} style={styles.background}>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name="airplane" size={24} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View>
                    <ThemedText style={styles.title}>{item.title}</ThemedText>
                    <ThemedText style={styles.description}>{item.description}</ThemedText>
                </View>
            </LinearGradient>
        </Animated.View>
    )
}

export default CarouselItem;

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width
    },
    background: {
        position: 'absolute',
        height: 350,
        width: 320,
        padding: 20,
        borderRadius: 20,
    },
    title: {
        marginTop: -45,
        width: '80%',
        fontFamily: 'EffraFamily',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        lineHeight: 45,
    },
    description: {
        width: '84%',
        fontFamily: 'EffraFamily',
        color: 'rgb(84, 88, 90)',
        fontWeight: 'bold',
        fontSize: 19
    },
    icon: {
        marginTop: 30,
        height: 40,
        width: 30
    }
})