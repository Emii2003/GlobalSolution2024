// CallFormScreen.js

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const CallFormScreen = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [equipmentId, setEquipmentId] = useState('');

  const db = getFirestore();

  const handleAddCall = async () => {
    try {
      // Verifica se todos os campos foram preenchidos
      if (latitude.trim() !== '' && longitude.trim() !== '' && date.trim() !== '' && description.trim() !== '' && equipmentId.trim() !== '') {
        // Adiciona o chamado ao Firestore
        await addDoc(collection(db, 'calls'), {
          latitude,
          longitude,
          date,
          description,
          equipmentId
        });
        console.log('Call added successfully!');
        // Limpa os campos após adicionar o chamado
        setLatitude('');
        setLongitude('');
        setDate('');
        setDescription('');
        setEquipmentId('');
      } else {
        console.error('All fields are required!');
      }
    } catch (error) {
      console.error('Error adding call:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Call</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Latitude"
      />
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Longitude"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={equipmentId}
        onChangeText={setEquipmentId}
        placeholder="Equipment ID"
      />
      <Button title="Add Call" onPress={handleAddCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CallFormScreen;
