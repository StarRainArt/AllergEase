import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ShoppingListScreen = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'Tomaten', bought: false },
    { id: '2', name: 'Pasta', bought: false },
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
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={styles.deleteText}>✕</Text>
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
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#28a745',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  item: {
    flex: 1,
  },
  boughtItem: {
    backgroundColor: '#d4edda',
    borderRadius: 8,
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  boughtText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  deleteText: {
    color: '#dc3545',
    fontSize: 20,
    marginLeft: 10,
  },
});

export default ShoppingListScreen;