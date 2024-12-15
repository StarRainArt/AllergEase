import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <Text style={styles.header}>Boodschappenlijstje</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Voeg een item toe..."
          value={newItem}
          onChangeText={setNewItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={[styles.item, item.bought && styles.boughtItem]}
              onPress={() => toggleBought(item.id)}
            >
              <Text style={[styles.itemText, item.bought && styles.boughtText]}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF5E1',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#472D30',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C9CBA3',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#C9CBA3',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#C9CBA3',
    borderRadius: 8,
    backgroundColor: '#FFE1A8',
  },
  item: {
    flex: 1,
  },
  boughtItem: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  itemText: {
    fontSize: 16,
    color: '#472D30',
  },
  checkmark: {
    fontSize: 20,
    color: '#C9CBA3',
  },
});

export default ShoppingListScreen;