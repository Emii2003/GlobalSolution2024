import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { getFirestore, addDoc, collection, FieldValue, serverTimestamp  } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CallFormScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [equipmentId, setEquipmentId] = useState('');

  const db = getFirestore();

  const handleAddCall = async () => {
    try {
      if (title.trim() !== '' && latitude.trim() !== '' && longitude.trim() !== '' && description.trim() !== '' && equipmentId.trim() !== '') {
        await addDoc(collection(db, 'chamados'), {
          title,
          latitude,
          longitude,
          date: serverTimestamp(),
          description,
          equipmentId
        });
        Alert.alert('Sucesso', 'Chamado adicionado com sucesso!');
        setTitle('');
        setLatitude('');
        setLongitude('');
        setDescription('');
        setEquipmentId('');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      }
    } catch (error) {
      console.error('Erro ao adicionar chamado:', error.message);
      Alert.alert('Erro', 'Erro ao adicionar chamado: ' + error.message);
    }
  };


  return (
    <View>
      <Text>Adicionar Chamado</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
      />
      <TextInput
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <TextInput
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Longitude"
        keyboardType="numeric"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
      />
      <Picker
        selectedValue={equipmentId}
        onValueChange={(itemValue) => setEquipmentId(itemValue)}
      >
        <Picker.Item label="Selecione um equipamento" value="" />
        <Picker.Item label="Rede de Pesca" value="rede_de_pesca" />
        <Picker.Item label="Cana de Pescar" value="cana_de_pescar" />
        <Picker.Item label="Anzol" value="anzol" />
        <Picker.Item label="Isca Artificial" value="isca_artificial" />
      </Picker>
      <Button title="Adicionar Chamado" onPress={handleAddCall} />
    </View>
  );
};

export default CallFormScreen;