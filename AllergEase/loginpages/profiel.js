import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import styles from "../style";

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
      <Text style={styles.title}>My Profile</Text>
      {user && (
        <>
          <View style={[styles.sectionGreen, {marginBottom: 30}]}>
            <View style={[profiel.inARow, {paddingBottom: 5}]}>
              <Text style={styles.kopje}>Personal</Text>
              <Pressable style={[styles.buttonRed, {width: "25%"}]} onPress={() => navigation.navigate('EditUserInfo')}><Text style={[styles.redButtonText, {fontSize: 20}]}>Edit</Text></Pressable>
            </View>
            <View>
              <Text style={[profiel.centerText, {fontWeight: "bold"}]}>Username:</Text>
              <Text style={profiel.centerText}>{user.username}</Text>
            </View>
            <View>
              <Text style={[profiel.centerText, {fontWeight: "bold"}]}>Email:</Text>
              <Text style={profiel.centerText}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.sectionYellow}>
            <View style={profiel.inARow}>
              <Text style={styles.kopje}>Allergens</Text>
              <Pressable style={[styles.buttonRed, {width: "25%"}]} onPress={() => navigation.navigate('EditAllergies')}><Text style={[styles.redButtonText, {fontSize: 20}]}>Edit</Text></Pressable>
            </View>
            {user.allergies && user.allergies.length > 0 ? (
              <View style={profiel.allergiesGrid}>
                {user.allergies.map((allergy, index) => (
                  <Text key={index} style={profiel.allergyItem}>• {allergy}</Text>
                ))}
              </View>
            ) : (
              <Text style={profiel.allergyItem}>None</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const profiel = StyleSheet.create({
  inARow: {
    flexDirection: "row", 
    alignItems: 'center', 
    justifyContent: "space-between", 
    width: "100%"
  },
  centerText: {
    fontFamily: "BalooPaaji2",
    fontSize: 25,
    textAlign: "center",
    color: "#472D30",
  },
  allergiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  allergyItem: {
    fontFamily: 'BalooPaaji2',
    fontSize: 25,
    color: '#472D30',
    width: '50%',
  },
});