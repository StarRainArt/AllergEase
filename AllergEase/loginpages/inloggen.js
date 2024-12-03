import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email && user.password === password) {
            navigation.navigate('Main');
        } else {
          Alert.alert('Invalid credentials');
        }
      } else {
        Alert.alert('No registered user found');
      }
    };
  
    return (
      <View>
        <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
        <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    );
  }