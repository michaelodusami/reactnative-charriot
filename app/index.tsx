import { Redirect } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	return <Redirect href={"/(auth)/welcome"} />;
};

export default Home;

// import React from 'react';
// import { View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
// import { router } from 'expo-router';

// const HomePage: React.FC = () => {
//   return (
//     <ImageBackground
//           source={require('@/assets/images/background.webp')}
//           style={styles.backgroundImage}
//     >
//       <View style={styles.overlay}></View>
//       <View style={styles.container}>
//         <Text style={styles.title}>Where can we take you?</Text>
//         <Pressable
//           style={styles.button}
//           onPress={() => router.push('/links/hotelChains')}
//         >
//           <Text style={styles.buttonText}>Login with Hotel</Text>
//         </Pressable>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     fontFamily: 'EffraFamily',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     marginBottom: 100,
//   },
//   title: {
//     fontSize: 32,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#8300c4',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginTop: 0,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject, // Makes the overlay cover the entire screen
//     backgroundColor: 'rgba(0, 0, 0, 0.45)', // Black background with 50% opacity
//   },
// });

// export default HomePage;
