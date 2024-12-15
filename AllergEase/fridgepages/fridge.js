import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FridgePage = ({ navigation }) => {
  const [fridgeItems, setFridgeItems] = useState([]);

  // Functie om koelkastitems op te halen
  const fetchFridgeItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('fridgeItems');
      if (storedItems) {
        setFridgeItems(JSON.parse(storedItems));
      } else {
        setFridgeItems([]);
      }
    } catch (error) {
      console.error('Fout bij ophalen van fridgeItems:', error);
    }
  };

  // Haal gegevens op bij laden van de pagina
  useEffect(() => {
    fetchFridgeItems();
  }, []);

  // Luister naar veranderingen in AsyncStorage
  useEffect(() => {
    const interval = setInterval(fetchFridgeItems, 500); // Controleer elke halve seconde
    return () => clearInterval(interval); // Opruimen wanneer component wordt ontkoppeld
  }, []);

  // Verwijder een item uit de koelkast
  const removeItem = async (index) => {
    const updatedItems = fridgeItems.filter((_, i) => i !== index);
    setFridgeItems(updatedItems);

    try {
      await AsyncStorage.setItem('fridgeItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Fout bij verwijderen van item uit fridgeItems:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {fridgeItems.length > 0 ? (
          fridgeItems.map((item, index) => (
            <View key={index} style={styles.fridgeItemContainer}>
              <Text style={styles.fridgeItem}>{item.name}</Text>
              <TouchableOpacity onPress={() => removeItem(index)}>
                <Text style={styles.removeButton}>✔</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noItemsText}>No ingredients in your fridge.</Text>
        )}
      </ScrollView>

      <View style={styles.buttonItems}>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Recipes')}
        >
          <Text>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Shopping List')}
        >
          <Text>Shopping List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('AddToFridge', { addToFridge: setFridgeItems })}
        >
          <Text>Add Ingredient</Text>
        </TouchableOpacity>
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

