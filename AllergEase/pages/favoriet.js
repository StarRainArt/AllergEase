import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const FavoriteRecipesScreen = () => {
  
  const [favorites, setFavorites] = useState([
    { id: '1', title: 'Spaghetti Bolognese' },
    { id: '2', title: 'Caesar Salad' },
    { id: '3', title: 'Chicken Curry' },
    { id: '4', title: 'Pancakes' },
  ]);

  const handleRecipePress = (recipe) => {
    
    alert(`Je hebt ${recipe.title} geselecteerd!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Je Favoriete Recepten</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => handleRecipePress(item)}
            >
              <Text style={styles.recipeTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Je hebt nog geen favoriete recepten.</Text>
      )}
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
  recipeItem: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  recipeTitle: {
    fontSize: 18,
    color: '#333333',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoriteRecipesScreen;
