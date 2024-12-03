import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAllergiesPage({ navigation }) {
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
      <Text style={styles.text}>{item}</Text>
      <TouchableOpacity onPress={() => handleToggle(item)} style={styles.checkbox}>
        {selectedAllergies.includes(item) ? (
          <View style={styles.checkedBox} />
        ) : (
          <View style={styles.uncheckedBox} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allergiesList}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
        padding: 30,
    },
    container: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 100, // Space for the Save button
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uncheckedBox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'transparent',
    },
    checkedBox: {
        width: 18,
        height: 18,
        backgroundColor: '#000',
    },
    buttonContainer: {
        padding: 10,
        backgroundColor: '#fff',
    },
});