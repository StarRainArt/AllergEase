import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";

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
      <Text style={styles.logo}>Allerg<Text style={{color: "#E26D5C"}}>Ease</Text></Text>
      <Text style={styles.quote}>Manage your Allergies with <Text style={{color: "#E26D5C"}}>Ease</Text></Text>
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
        <Text style={styles.registerText}>Create a </Text>
        <Pressable onPress={() => navigation.navigate('Register')}><Text style={styles.registerLink}>New Account</Text></Pressable>
      </View>
      {/* <Button title="Register" onPress={() => navigation.navigate('Register')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  background: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFF5E1",
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
  title: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "DynaPuffMedium",
    color: "#472D30"
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
    marginBottom: 15,
    fontSize: 25,
    fontFamily: "BalooPaaji2",
    // includeFontPadding: false,
    textAlignVertical: "bottom"
  }
});