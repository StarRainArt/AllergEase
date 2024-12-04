import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, Pressable, TextInput } from 'react-native';

const AddToFridgePage = ({ navigation, route }) => {
  const [ingredientName, setIngredientName] = useState('');
  const { addToFridge } = route.params;  // Access addToFridge function from params

  const handleChangeText = (text) => {
    setIngredientName(text);
  };

  const fetchIngredients = async (ingredientName) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/search?query=${ingredientName}&apiKey=bdab5cb788674ef286de1e7e6294097d`
      );
      const data = await response.json();
      console.log('API Response:', data); // Log the full response
      return data.results; // Return results (not ingredients)
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      return []; // Return an empty array if there's an error
    }
  };

  const handleSubmit = async () => {
    if (ingredientName.trim()) {
      const ingredients = await fetchIngredients(ingredientName);

      // Filter the results to only get the exact match (case-insensitive)
      const exactMatch = ingredients.filter(
        (ingredient) =>
          ingredient.name.toLowerCase() === ingredientName.toLowerCase()
      );

      console.log('Exact match ingredients:', exactMatch);  // Debugging step

      if (exactMatch.length > 0) {
        // Use the addToFridge function from route.params
        addToFridge(exactMatch);  // This will call the function in FridgePage to update fridgeItems
      } else {
        console.log('No exact match ingredients found');
      }
      setIngredientName('');  // Reset the input field
    } else {
      console.log('Please enter a valid ingredient name');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Scan Barcode or Add Manually</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Add Ingredient Manually:</Text>

        <Text>Select Category (Placeholder)</Text>
        <Text>Select the category of the ingredient</Text>

        <Text>Ingredient Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Tomatoes"
          value={ingredientName}
          onChangeText={handleChangeText}
        />

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Recent Ingredients (Placeholder)</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddToFridgePage;
