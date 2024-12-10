import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import styles from "../style";

export default function LoginPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
    "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
    "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
    "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
  });

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
    <View style={styles.background}>
      <Text style={login.logo}>Allerg<Text style={{color: "#E26D5C"}}>Ease</Text></Text>
      <Text style={login.quote}>Manage your Allergies with <Text style={{color: "#E26D5C"}}>Ease</Text></Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.input}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={styles.input}/>
      <Pressable onPress={handleLogin} style={[styles.buttonGreen, {width: "60%"}]}>
        <Text style={[styles.greenButtonText, {fontSize: 25}]}>Log In</Text>
      </Pressable>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 30}}>
        <View style={{flex: 0.8, height: 4, backgroundColor: '#472D30'}} />
          <View>
            <Text style={{width: 40, textAlign: 'center', color: "#472D30", fontsize: 30, fontFamily: "DynaPuffMedium"}}>OR</Text>
          </View>
          <View style={{flex: 0.8, height: 4, backgroundColor: '#472D30'}} />
      </View>
      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <Text style={login.registerText}>Create a </Text>
        <Pressable onPress={() => navigation.navigate('Register')}><Text style={login.registerLink}>New Account</Text></Pressable>
      </View>
    </View>
  );
}

const login = StyleSheet.create({
  registerText: {
    fontFamily: "DynaPuff",
    color: "#472D30",
    fontSize: 25
  },
  registerLink: {
    fontFamily: "DynaPuff",
    color: "#E26D5C",
    textDecorationLine: "underline",
    fontSize: 25
  },
  logo: {
    textAlign: "center",
    fontSize: 75,
    fontFamily: "Chewy",
    color: "#472D30",
    marginBottom: 0,
    includeFontPadding: false
  },
  quote: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "DynaPuff",
    color: "#472D30",
    marginBottom: 30,
  },
});