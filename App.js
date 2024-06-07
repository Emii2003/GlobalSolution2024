import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDnTuWRnG8t6pSOxzoV96SQkUFGdINnYDk",
  authDomain: "apppesca-82515.firebaseapp.com",
  projectId: "apppesca-82515",
  storageBucket: "apppesca-82515.appspot.com",
  messagingSenderId: "814514016032",
  appId: "1:814514016032:web:d8e87b2b935b1a731b5145",
  measurementId: "G-VF2C36NDBN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('');

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUser({ ...user, userType: userDoc.data().userType });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="HomeScreen" component={HomeScreen}>
            {props => <HomeScreen {...props} user={user} handleLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="AuthScreen">
            {props => <AuthScreen {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
