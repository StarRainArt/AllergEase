import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";

export default function EditUserInfoPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
    "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
    "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
    "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
  });

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
    <View style={styles.background}>
      {/* Section for Editing Username and Email */}
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Pressable onPress={handleSaveUserInfo} style={[styles.buttonRed, {width: "35%", marginBottom: 40}]}><Text style={[styles.redButtonText, {fontSize: 25}]}>SAVE</Text></Pressable>

      {/* Section for Editing Password */}
      <Text style={[styles.kopje, {marginBottom: 10}]}>Change Password</Text>

      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter new password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholder="Confirm new password"
        secureTextEntry
      />
      <Pressable onPress={handleSavePassword} style={[styles.buttonRed, {width: "35%"}]}><Text style={[styles.redButtonText, {fontSize: 25}]}>SAVE</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFF5E1",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "DynaPuffMedium",
    color: "#472D30",
    paddingVertical: 20
  },
  kopje: {
    fontSize: 25,
    fontFamily: "DynaPuff",
    color: "#472D30",
  },
  sectionGreen: {
    backgroundColor: "#C9CBA3",
    color: "#472D30",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  sectionYellow: {
    backgroundColor: "#FFE1A8",
    color: "#472D30",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  buttonRed: {
    backgroundColor: "#E26D5C",
    borderRadius: 15,
    paddingVertical: 5
  },
  buttonGreen: {
    backgroundColor: "#C9CBA3",
    borderRadius: 15,
    paddingVertical: 5
  },
  greenButtonText: {
    color: "#472D30",
    fontFamily: "DynaPuff",
    textAlign: "center",
  },
  redButtonText: {
    color: "#FFF5E1",
    fontFamily: "DynaPuff",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFE1A8",
    color: "#472D30",
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 0,
    width: "95%",
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 25,
    fontFamily: "BalooPaaji2",
    textAlignVertical: "bottom"
  },
  centerText: {
    fontFamily: "BalooPaaji2",
    fontSize: 20,
    textAlign: "center",
    color: "#472D30",
  },
});