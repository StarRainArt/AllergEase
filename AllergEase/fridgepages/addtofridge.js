import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddToFridgePage = ({ route }) => {
  const [ingredientName, setIngredientName] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const { addToFridge } = route.params;

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handle barcode scanning
  const handleBarCodeScanned = ({ type, data }) => {
    setIsScanning(false);
    Alert.alert("Barcode Scanned", `Type: ${type}\nData: ${data}`, [
      { text: "OK" },
    ]);
    fetchProductInfo(data);
  };

  // Fetch product information from the API
  const fetchProductInfo = async (barcode) => {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const product = await response.json();

      if (product.status === 1) {
        Alert.alert("Product Found", product.product.product_name);
        addToFridge([{ name: product.product.product_name }]);
      } else {
        Alert.alert("Product Not Found", "No product found for this barcode.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch product details.");
    }
  };

  // Handle manual ingredient addition
  const handleSubmit = async () => {
    if (ingredientName.trim()) {
      // Get existing fridge items from AsyncStorage
      const storedItems = await AsyncStorage.getItem('fridgeItems');
      let fridgeItems = storedItems ? JSON.parse(storedItems) : [];

      // Add the new ingredient to the fridge
      const updatedItems = [...fridgeItems, { name: ingredientName }];
      
      // Save the updated fridge items to AsyncStorage
      await AsyncStorage.setItem('fridgeItems', JSON.stringify(updatedItems));

      // Update the fridge items in the parent component
      addToFridge(updatedItems);

      setIngredientName('');
    } else {
      Alert.alert("Invalid Input", "Please enter an ingredient name.");
    }
  };

  // Render permission request feedback
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please grant permissions to use the camera.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Scan Barcode or Add Manually</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsScanning(true);
          }}
        >
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </Pressable>
      </View>

      {isScanning && (
        <CameraView
          style={styles.camera}
          type={'back'}
          onBarCodeScanned={handleBarCodeScanned}
        />
      )}

      <View style={styles.section}>
        <Text style={styles.title}>Add Ingredient Manually:</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Tomatoes"
          value={ingredientName}
          onChangeText={setIngredientName}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </Pressable>
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
  camera: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
});

export default AddToFridgePage;
