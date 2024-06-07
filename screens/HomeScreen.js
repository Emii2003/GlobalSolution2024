import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
  const { user } = route.params;
  const [chamados, setChamados] = useState([]);
  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [equipmentId, setEquipmentId] = useState('');

  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const fetchChamados = async () => {
    if (user.userType === 'pescador') {
      const q = query(collection(db, 'chamados'), where('pescadorId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedChamados = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setChamados(fetchedChamados);
    } else if (user.userType === 'empresa') {
      const querySnapshot = await getDocs(collection(db, 'chamados'), where('empresaId', '==', user.uid));
      const fetchedChamados = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setChamados(fetchedChamados);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, [user]);

  const handleAddCall = async () => {
    try {
      console.log('Equipment ID:', equipmentId); // Adicione esta linha
      if (title.trim() !== '' && latitude.trim() !== '' && longitude.trim() !== '' && description.trim() !== '' && equipmentId.trim() !== '') {
        await addDoc(collection(db, 'chamados'), {
          title,
          latitude,
          longitude,
          date: serverTimestamp(),
          description,
          equipmentId,
          pescadorId: user.uid
        });
        Alert.alert('Sucesso', 'Chamado adicionado com sucesso!');
        setTitle('');
        setLatitude('');
        setLongitude('');
        setDescription('');
        setEquipmentId('');
        fetchChamados();
      } else {
        Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      }
    } catch (error) {
      console.error('Erro ao adicionar chamado:', error.message);
      Alert.alert('Erro', 'Erro ao adicionar chamado: ' + error.message);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('AuthScreen');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user.name || user.email}!</Text>
      {user.userType === 'pescador' && (
        <View>
          <Text>Adicionar Chamado</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Título"
          />
          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={setLatitude}
            placeholder="Latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={setLongitude}
            placeholder="Longitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
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
      )}
      <FlatList
        data={chamados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.chamadoItem}>
            <Text style={styles.chamadoTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Data: {item.date ? new Date(item.date.seconds * 1000).toLocaleDateString() : 'Data indisponível'}</Text>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>
            <Text>Equipamento: {item.equipmentId}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#fff',
  },
  chamadoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chamadoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
