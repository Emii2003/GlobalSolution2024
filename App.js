import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CallFormScreen from './screens/CallFormScreen';

const firebaseConfig = {
  apiKey: "AIzaSyCPbhvapzjchTxyjN_w6YuuO7YF8qT8CA8",
  authDomain: "teste-401122.firebaseapp.com",
  projectId: "teste-401122",
  storageBucket: "teste-401122.appspot.com",
  messagingSenderId: "162636804169",
  appId: "1:162636804169:web:1c1e01219f47910de98f98",
  measurementId: "G-Z33JQ7PETK"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      ) : (
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
          initialParams={{ user }}
        />
      )}
      <Stack.Screen name="CallForm" component={CallFormScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
