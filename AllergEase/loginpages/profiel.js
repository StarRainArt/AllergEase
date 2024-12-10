import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Text, StyleSheet, Pressable } from 'react-native';
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
          <View style={[styles.sectionGreen, {marginBottom: 30}]}>
            <View style={[styles.inARow, {paddingBottom: 5}]}>
              <Text style={styles.kopje}>Persoonlijk</Text>
              <Pressable style={[styles.buttonRed, {width: "25%"}]} onPress={() => navigation.navigate('EditUserInfo')}><Text style={[styles.redButtonText, {fontSize: 20}]}>Edit</Text></Pressable>
            </View>
            <View>
              <Text style={[styles.centerText, {fontWeight: "bold"}]}>Username:</Text>
              <Text style={styles.centerText}>{user.username}</Text>
            </View>
            <View>
              <Text style={[styles.centerText, {fontWeight: "bold"}]}>Email:</Text>
              <Text style={styles.centerText}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.sectionYellow}>
            <View style={styles.inARow}>
              <Text style={styles.kopje}>Allergieën</Text>
              <Pressable style={[styles.buttonRed, {width: "25%"}]} onPress={() => navigation.navigate('EditAllergies')}><Text style={[styles.redButtonText, {fontSize: 20}]}>Edit</Text></Pressable>
            </View>
            {user.allergies && user.allergies.length > 0 ? (
              <View style={styles.allergiesGrid}>
                {user.allergies.map((allergy, index) => (
                  <Text key={index} style={styles.allergyItem}>• {allergy}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.allergyItem}>None</Text>
            )}
          </View>
        </>
      )}
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