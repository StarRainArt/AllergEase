import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

export default function EditAllergiesPage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
    "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
    "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
    "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
  });

  const allergiesList = [
    'Gluten', 'Lupine', 'Selderij', 'Ei', 'Vis',
    'Pinda', 'Soja', 'Lactose', 'Schaaldieren',
    'Mosterd', 'Sesamzaad', 'Sulfiet', 'Weekdieren', 'Noten',
  ];
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setSelectedAllergies(user.allergies || []);
    };
    fetchUser();
  }, []);

  const handleToggle = (allergy) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const handleSave = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    user.allergies = selectedAllergies;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.allergyText}>{item}</Text>
      <TouchableOpacity onPress={() => handleToggle(item)} style={styles.checkbox}>
        {selectedAllergies.includes(item) ? (
          <>
            <Icon name="check" size={30} color="#472D30" style={{ position: 'absolute', left: 0.7, top: 0.7 }} />
            <Icon name="check" size={30} color="#472D30" style={{ position: 'absolute', left: 0.7, top: -0.7 }} />
            <Icon name="check" size={30} color="#472D30" style={{ position: 'absolute', left: -0.7, top: 0.7 }} />
            <Icon name="check" size={30} color="#472D30" style={{ position: 'absolute', left: -0.7, top: -0.7 }} />
            <Icon name="check" size={30} color="#472D30" />
          </>
        ) : null}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your Allergies</Text>
      <FlatList
        data={allergiesList}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily: 'DynaPuffMedium',
    color: '#472D30',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C9CBA3',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '95%',
  },
  allergyText: {
    fontFamily: 'BalooPaaji2',
    fontSize: 25,
    color: '#472D30',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5E1',
  },
  saveButton: {
    backgroundColor: '#E26D5C',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  saveButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 25,
    color: '#FFF5E1',
    textAlign: 'center',
  },
});
