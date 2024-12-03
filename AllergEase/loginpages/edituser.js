import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditUserInfoPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      if (user) {
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
      }
    };
    fetchUser();
  }, []);

  const handleSaveUserInfo = async () => {
    if (!username || !email) {
      Alert.alert('Error', 'Username and email cannot be empty.');
      return;
    }
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    user.username = username;
    user.email = email;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    Alert.alert('Success', 'User information updated.');
  };

  const handleSavePassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill out both password fields.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    user.password = newPassword;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    Alert.alert('Success', 'Password updated.');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <View style={styles.container}>
      {/* Section for Editing Username and Email */}
      <Text style={styles.sectionTitle}>Edit User Info</Text>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Button title="Save User Info" onPress={handleSaveUserInfo} />

      {/* Section for Editing Password */}
      <Text style={styles.sectionTitle}>Change Password</Text>
      <Text>New Password:</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter new password"
        secureTextEntry
      />
      <Text>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholder="Confirm new password"
        secureTextEntry
      />
      <Button title="Save Password" onPress={handleSavePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});