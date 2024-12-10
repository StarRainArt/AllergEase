import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Pressable, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";

export default function RegisterPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
    "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
    "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
    "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const user = { username, email, password, allergies: [] };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    Alert.alert('Registration successful');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.background}>
      <Text style={styles.logo}>Allerg<Text style={{ color: "#E26D5C" }}>Ease</Text></Text>
      <View style={styles.inARow}>
        <Pressable onPress={() => navigation.navigate('Login')}><Text style={styles.title}>{'<'}</Text></Pressable>
        <Text style={styles.title}>Sign Up</Text>
        <View></View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Pressable style={[styles.buttonGreen, {width: "60%"}]} onPress={handleRegister}>
        <Text style={[styles.greenButtonText, {fontSize: 25}]}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inARow: {
    flexDirection: "row", 
    alignItems: 'center', 
    justifyContent: "space-between", 
    width: "100%"
  },
  background: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFF5E1",
  },
  logo: {
    textAlign: "center",
    fontSize: 45,
    fontFamily: "Chewy",
    color: "#472D30",
    marginBottom: 0,
    includeFontPadding: false
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "DynaPuffMedium",
    color: "#472D30",
    paddingVertical: 20
  },
  sectionGreen: {
    backgroundColor: "#C9CBA3",
    color: "#472D30",
    borderRadius: 15,
    padding: 5
  },
  sectionYellow: {
    backgroundColor: "#FFE1A8",
    color: "#472D30",
    borderRadius: 15,
    padding: 5
  },
  buttonRed: {
    backgroundColor: "#E26D5C",
    borderRadius: 10,
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
  }
});