import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <ScrollView>
        {fridgeItems.length > 0 ? (
          fridgeItems.map((item, index) => (
            <View key={index} style={styles.fridgeItemContainer}>
              <Text style={styles.fridgeItem}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeItem(index)}>
                <Text style={styles.removeButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No ingredients in your fridge.</Text>
        )}
      </ScrollView>

      <View style={styles.buttonItems}>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Recipes')}
        >
          <Text>Recipes</Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Shopping List')}
        >
          <Text>Shopping List</Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('AddToFridge', { addToFridge: setFridgeItems })}
        >
          <Text>Add Ingredient</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
  },
  fridgeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fridgeItem: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10
  },
  buttonItems: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
});

export default FridgePage;

