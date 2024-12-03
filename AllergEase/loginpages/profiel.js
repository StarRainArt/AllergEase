import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";

export default function ProfilePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
    "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
    "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
    "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
  });

  const [user, setUser] = useState(null);
    
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        const userData = await AsyncStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
      };
      fetchUser();
    }, [])
  );
  
    return (
      <View style={styles.background}>
        <Text style={styles.title}>profiel </Text>
        {user && (
          <>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Allergies: {user.allergies && user.allergies.length > 0 ? user.allergies.join(', ') : 'None'}</Text>
            <Button title="Edit Allergies" onPress={() => navigation.navigate('EditAllergies')} />
            <Button title="Edit User Info" onPress={() => navigation.navigate('EditUserInfo')} />
          </>
        )}
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
      color: "#472D30"
    }
});