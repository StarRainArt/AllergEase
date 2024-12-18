import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../style";

const ShoppingListScreen = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Haal boodschappenlijst op bij het laden van de app
  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = await AsyncStorage.getItem('shoppingList');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };
    fetchItems();
  }, []);

  // Sla boodschappenlijst op bij elke wijziging
  useEffect(() => {
    const saveItems = async () => {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
    };
    saveItems();
  }, [items]);

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { id: Date.now().toString(), name: newItem, bought: false }]);
      setNewItem('');
    }
  };

  const toggleBought = async (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, bought: !item.bought } : item
    );
    setItems(updatedItems);
  
    // Check if the item is marked as bought
    const boughtItem = updatedItems.find((item) => item.id === id && item.bought);
    if (boughtItem) {
      try {
        // Add the bought item to the fridge in AsyncStorage
        const storedFridgeItems = await AsyncStorage.getItem('fridgeItems');
        const fridgeItems = storedFridgeItems ? JSON.parse(storedFridgeItems) : [];
        fridgeItems.push({ name: boughtItem.name });
  
        await AsyncStorage.setItem('fridgeItems', JSON.stringify(fridgeItems));
  
        // Remove from shopping list
        setItems(updatedItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error moving item to fridge:', error);
      }
    }
  };

  return (
    <View style={styles.background}>
      <Text style={styles.title}>My Shoppinglist</Text>
      <View style={list.inputContainer}>
        <TextInput
          style={[styles.input, {fontSize: 18, flex: 1}]}
          placeholder="Add an item..."
          value={newItem}
          onChangeText={setNewItem}
        />
        <TouchableOpacity style={[styles.buttonRed, list.addButton]} onPress={addItem}>
          <Text style={[styles.redButtonText, {fontSize: 30}]}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <View style={[styles.sectionGreen, list.itemContainer, item.bought && list.boughtItem]}>
            <TouchableOpacity onPress={() => toggleBought(item.id)}>
              <Text style={[list.itemText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleBought(item.id)}>
              <View style={list.checkbox}></View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const list = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
    width: "100%"
  },
  addButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: "100%",
    justifyContent: "space-between"
  },
  item: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    color: '#472D30',
    fontFamily: "BalooPaaji2",
  },
  checkbox: {
    width: 35,
    height: 35,
    backgroundColor: "#FFF5E1",
    borderRadius: 7
  }
});

export default ShoppingListScreen;