import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../style";

const FridgePage = ({ navigation }) => {
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    const fetchFridgeItems = async () => {
      const storedItems = await AsyncStorage.getItem('fridgeItems');
      if (storedItems) {
        setFridgeItems(JSON.parse(storedItems));
      }
    };

    fetchFridgeItems();
  }, []);

  // Save fridge items to AsyncStorage whenever the list changes
  useEffect(() => {
    const saveFridgeItems = async () => {
      await AsyncStorage.setItem('fridgeItems', JSON.stringify(fridgeItems));
    };

    if (fridgeItems.length > 0) {
      saveFridgeItems();
    }
  }, [fridgeItems]);

  // Remove an item from the fridge
  const removeItem = async (index) => {
    const updatedItems = fridgeItems.filter((_, i) => i !== index);
    setFridgeItems(updatedItems);

    // Save the updated list to AsyncStorage
    await AsyncStorage.setItem('fridgeItems', JSON.stringify(updatedItems));
  };

  return (
    <View style={styles.background}>
      <Text style={styles.title}>My Fridge</Text>
      <ScrollView style={fridge.itemsContainer}>
        {fridgeItems.length > 0 ? (
          fridgeItems.map((item, index) => (
            <View key={index} style={[fridge.fridgeItemContainer, styles.sectionGreen]}>
              <Text style={[fridge.fridgeItem]}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeItem(index)}>
                <Text style={fridge.removeButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={fridge.text}>You don't have any ingredients in your fridge yet!</Text>
        )}
      </ScrollView>
      <Pressable
          style={[styles.buttonRed, fridge.buttonStyles]}
          onPress={() => navigation.navigate('AddToFridge', { addToFridge: setFridgeItems })}
        >
        <Text style={[styles.redButtonText, {fontSize: 20}]}>Add Ingredient</Text>
      </Pressable>
    </View>
  );
};

const fridge = StyleSheet.create({
  fridgeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
  },
  fridgeItem: {
    fontSize: 20,
    fontFamily: "BalooPaaji2"
  },
  removeButton: {
    color: '#E26D5C',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 5
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "80%",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10
  },
  itemsContainer: {
    width: "90%"
  },
  text: {
    fontSize: 20,
    fontFamily: "BalooPaaji2",
    textAlign: "center"
  }
});

export default FridgePage;

