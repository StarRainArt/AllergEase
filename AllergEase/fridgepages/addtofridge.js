import React, { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, Pressable, TextInput } from 'react-native';

const AddToFridgePage = ({ navigation }) => {
  const [ingredientName, setIngredientName] = useState('');

  // Handle text input changes
  const handleChangeText = (text) => {
    setIngredientName(text);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (ingredientName) {
      console.log('Ingredient name submitted:', ingredientName);
      // Handle submission logic, e.g., saving to a database or adding to a list
      setIngredientName(''); // Clear input after submission
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
