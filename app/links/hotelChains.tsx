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
