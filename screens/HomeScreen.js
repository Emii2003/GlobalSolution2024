// HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ user, handleLogout, navigation }) => {
  // Verifica se o usuário existe e se é um pescador antes de tentar acessar suas propriedades
  const userName = user ? user.name : '';
  const isPescador = user?.userType === 'Pescador';

  const handleAddCall = () => {
    navigation.navigate('CallFormScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userName || user.email}!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={() => {
            navigation.replace('AuthScreen');
          }}
        />
        <Button title="Add Equipment" onPress={() => navigation.navigate('EquipmentForm')} />
        {isPescador && (
        <Button title="Add Call" onPress={(handleAddCall)} />
      )}
      </View>
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
});

export default HomeScreen;
