import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const EquipmentFormScreen = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const db = getFirestore();

  const handleAddEquipment = async () => {
    try {
      if (!name.trim() || !type.trim() || !description.trim()) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }
      await setDoc(doc(db, 'equipments', name), {
        name,
        type,
        description,
      });
      setName('');
      setType('');
      setDescription('');

      Alert.alert('Sucesso', 'Equipamento adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar equipamento:', error.message);
      Alert.alert('Erro', 'Erro ao adicionar equipamento: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Equipamento</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="Tipo"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
        multiline
      />
      <Button title="Adicionar Equipamento" onPress={handleAddEquipment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default EquipmentFormScreen;
