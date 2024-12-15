import React, { useState } from 'react';
import { View, Button, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // import useNavigation
import styles from "../style";
import { useFonts } from "expo-font";

const ShoppingListScreen = () => {
  const navigation = useNavigation(); // gebruik de hook
  const [items, setItems] = useState([
    
  ]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { id: Date.now().toString(), name: newItem, bought: false }]);
      setNewItem('');
    }
  };

  const toggleBought = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.background}>
      <Text style={styles.title}>Shoppinglist</Text>
      <View style={list.inputContainer}>
        <TextInput
          style={[styles.input, {fontSize: 18, flex: 1}]}
          placeholder="Voeg een item toe..."
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
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={list.deleteText}>✕</Text>
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginLeft: 10,
  },
});

export default ShoppingListScreen;