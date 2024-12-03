import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditUserInfoPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.username);
        setEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!username || !email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    const updatedUser = { username, email, password, allergies: [] };
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      updatedUser.allergies = user.allergies; // Preserve allergies
    }
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    Alert.alert('User information updated');
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="New Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
