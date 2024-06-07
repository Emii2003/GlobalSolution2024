// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
// import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
// import { FontAwesome } from '@expo/vector-icons';

// const MapsScreen = () => {
//   const [markerLocation, setMarkerLocation] = useState(null);
//   const [geoError, setGeoError] = useState(null);
//   const [inputAddress, setInputAddress] = useState('');
//   const [mapRegion, setMapRegion] = useState({
//     latitude: -23.55052,
//     longitude: -46.633308,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });

//   const handleGeocodeAddress = async () => {
//     if (!inputAddress.trim()) {
//       setGeoError('Por favor, digite um endereço.');
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputAddress)}&key=AIzaSyDfT8L0NCFL01uMG47yx9kBWsBgWxuWU5E`
//       );
//       const data = await response.json();

//       if (data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry.location;
//         setMarkerLocation({ latitude: lat, longitude: lng });
//         setGeoError(null);
//         setMapRegion({
//           latitude: lat,
//           longitude: lng,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });
//       } else {
//         setGeoError('Endereço não encontrado.');
//       }
//     } catch (error) {
//       console.error('Erro ao geocodificar endereço:', error);
//       setGeoError('Erro ao geocodificar endereço. Tente novamente.');
//     }
//   };

//   const handleReportLocation = async () => {
//     if (!markerLocation) {
//       Alert.alert('Erro', 'Localização não disponível.');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.15.133:5000/reportar_localizacao', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           latitude: markerLocation.latitude,
//           longitude: markerLocation.longitude,
//           address: inputAddress,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Erro ao enviar localização para o servidor.');
//       }

//       const data = await response.json();
//       console.log(data);
//       Alert.alert('Sucesso', 'Localização reportada com sucesso!');
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Erro', 'Não foi possível reportar a localização. Tente novamente.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mapa</Text>
//       <MapView
//         provider={PROVIDER_DEFAULT}
//         style={styles.map}
//         initialRegion={mapRegion}
//         region={mapRegion}
//       >
//         {markerLocation && <Marker coordinate={markerLocation} />}
//       </MapView>
//       <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
//         <TextInput
//           style={styles.input}
//           placeholder="Digite o endereço"
//           value={inputAddress}
//           onChangeText={setInputAddress}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleGeocodeAddress}>
//           <FontAwesome name="search" size={20} color="white" />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         style={[styles.button, markerLocation ? null : styles.disabledButton]}
//         onPress={handleReportLocation}
//         disabled={!markerLocation}
//       >
//         <Text style={styles.buttonText}>Reportar Localização</Text>
//       </TouchableOpacity>
//       {geoError && <Text style={styles.errorText}>{geoError}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   map: {
//     flex: 1,
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   searchButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   disabledButton: {
//     backgroundColor: 'gray',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//   },
// });

// export default MapsScreen;
