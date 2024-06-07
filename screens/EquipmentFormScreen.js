// EquipmentFormScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const EquipmentFormScreen = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const db = getFirestore();

  const handleAddEquipment = async () => {
    try {
      // Verifica se todos os campos foram preenchidos
      if (!name || !type || !description) {
        alert('Please fill in all fields.');
        return;
      }

      // Cria um novo documento no Firestore com os dados do equipamento
      await setDoc(doc(db, 'equipments', name), {
        name,
        type,
        description,
      });

      // Limpa os campos após o cadastro
      setName('');
      setType('');
      setDescription('');

      alert('Equipment added successfully!');
    } catch (error) {
      console.error('Error adding equipment:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Equipment</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="Type"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <Button title="Add Equipment" onPress={handleAddEquipment} />
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EquipmentFormScreen;
