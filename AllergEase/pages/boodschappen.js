import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    // Verplaats naar fridge als gekocht
    const boughtItem = updatedItems.find((item) => item.id === id && item.bought);
    if (boughtItem) {
      try {
        const storedFridgeItems = await AsyncStorage.getItem('fridgeItems');
        const fridgeItems = storedFridgeItems ? JSON.parse(storedFridgeItems) : [];
        fridgeItems.push({ name: boughtItem.name });

        // Opslaan in AsyncStorage
        await AsyncStorage.setItem('fridgeItems', JSON.stringify(fridgeItems));

        // Verwijder uit boodschappenlijst
        setItems(updatedItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Fout bij verplaatsen naar fridge:', error);
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
        renderItem={({ item }) => (
          <View style={[styles.sectionGreen, list.itemContainer, item.bought && list.boughtItem]}>
            <TouchableOpacity onPress={() => toggleBought(item.id)}>
              <Text style={[list.itemText, item.bought && list.boughtText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleBought(item.id)}>
              <Text style={styles.checkmark}>✔</Text>
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
    padding: 15,
    marginBottom: 10,
    width: "100%"
  },
  item: {
    flex: 1,
  },
  boughtItem: {
    backgroundColor: '#FFE1A8',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  itemText: {
    fontSize: 18,
    color: '#472D30',
  },
  boughtText: {
    textDecorationLine: 'line-through',
    color: '#806266',
  },
  deleteText: {
    color: '#E26D5C',
    fontSize: 20,
    color: '#C9CBA3',
  },
});

export default ShoppingListScreen;