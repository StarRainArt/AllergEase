import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterPage({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
      const user = { username, email, password, allergies: [] };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Registration successful');
      navigation.navigate('Login');
    };
  
    return (
      <View>
        <TextInput placeholder="Username" onChangeText={setUsername} value={username} />
        <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
        <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
        <Button title="Register" onPress={handleRegister} />
      </View>
    );
  }