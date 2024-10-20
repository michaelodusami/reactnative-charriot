import React, { useRef } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, StyleSheet, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { PeregrineColors } from "@/constants/Colors";

const HotelChains = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("@/assets/images/PeregrineAppLogo.png")}
				style={styles.background}
				resizeMode="contain"
			>
				<View style={styles.content}>
					<Text style={styles.header}>Peregrine</Text>
					<Text style={styles.subheader}>Explore the world</Text>
				</View>
				<TouchableOpacity
					style={styles.exploreButton}
					onPress={() => {
						router.push("../links/hotelChains");
					}}
				>
					<Text style={styles.exploreText}>Next</Text>
				</TouchableOpacity>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: "white",
	},
	background: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 40,
	},
	content: {
		alignItems: "center",
	},
	header: {
		fontFamily: "EffraFamily",
		fontSize: 48,
		color: "black",
		marginBottom: 10,
		//textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	subheader: {
		fontFamily: "EffraFamily",
		fontSize: 24,
		color: "black",
		marginBottom: 20,
		//textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	exploreButton: {
		backgroundColor: PeregrineColors.blue,
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 30,
		width: "80%",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	exploreText: {
		fontFamily: "EffraFamily",
		fontSize: 18,
		color: "white",
		textTransform: "uppercase",
	},
});

export default HotelChains;

// import React from 'react';
// import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
// import { router } from 'expo-router';

// interface HotelChain {
//   id: string;
//   name: string;
// }

// const hotelChains: HotelChain[] = [
//   { id: '1', name: 'Peregrine' },
// ];

// const HotelChainsScreen: React.FC = () => {
//   const renderItem = ({ item }: { item: HotelChain }) => (
//     <Pressable
//       style={({ pressed }) => [
//         styles.item,
//         pressed && styles.itemPressed,
//       ]}
//       onPress={() => router.push('/links/login')}
//     >
//       <Text style={styles.itemText}>{item.name}</Text>
//     </Pressable>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select a Hotel Chain</Text>
//       <FlatList
//         data={hotelChains}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     backgroundColor: 'rgb(217, 217, 214)',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   item: {
//     backgroundColor: '#ffffff', // White background for item
//     padding: 16,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 2, // Shadow for Android
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   itemPressed: {
//     backgroundColor: '#e0e0e0', // Slightly darker background when pressed
//   },
//   itemText: {
//     fontSize: 18,
//     color: '#444444',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

// export default HotelChainsScreen;
