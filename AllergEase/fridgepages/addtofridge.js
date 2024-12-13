import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { Camera } from 'expo-camera'; 
import { CameraView } from 'expo-camera';

const AddToFridgePage = ({ route }) => {
  const [ingredientName, setIngredientName] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const { addToFridge } = route.params; // Access addToFridge function from params

  // Request camera permissions
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error("Permission request error:", error);
        setHasPermission(false);
      }
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

  // Fetch product information from the Open Food Facts API using barcode
  const fetchProductInfo = async (barcode) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const product = await response.json();

      if (product.status === 1) {
        Alert.alert("Product Found", product.product.product_name);
        addToFridge((prevItems) => [...prevItems, { name: product.product.product_name }]);
      } else {
        Alert.alert("Product Not Found", "No product found for this barcode.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      Alert.alert("Error", "Failed to fetch product details.");
    }
  };

  // Handle ingredient submission (manual input)
  const handleSubmit = async () => {
    const trimmedInput = ingredientName.trim();

    if (!trimmedInput) {
      Alert.alert("Invalid Input", "Please enter an ingredient name or barcode.");
      return;
    }

    try {
      if (/^\d+$/.test(trimmedInput)) {
        // Input is a numeric string, assume it's a barcode
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/${trimmedInput}.json`
        );
        const productData = await response.json();

        if (productData.status === 1) {
          // Product found for the barcode
          addToFridge((prevItems) => [...prevItems, { name: productData.product.product_name }]);
          setIngredientName(''); // Reset the input field
        } else {
          Alert.alert("Product Not Found", "No product found for this barcode.");
        }
      } else {
        // Input is a product name, search by name
        const ingredientResponse = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${trimmedInput}&json=true`
        );
        const ingredientData = await ingredientResponse.json();

        if (ingredientData.count > 0) {
          // Check if an exact match exists
          const matchingIngredient = ingredientData.products.find(product =>
            product.product_name.toLowerCase() === trimmedInput.toLowerCase()
          );

          if (matchingIngredient) {
            addToFridge((prevItems) => [...prevItems, { name: matchingIngredient.product_name }]);
            setIngredientName(''); // Reset the input field
          } else {
            Alert.alert("No Exact Match", "We couldn't find an exact match for this ingredient.");
          }
        } else {
          Alert.alert("Ingredient Not Found", "No products found for this ingredient.");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch product or ingredient details.");
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

        {/* Button to trigger camera */}
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsScanning(true); // Set isScanning to true to show CameraView
          }}
        >
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </Pressable>
      </View>

      {isScanning && (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleBarCodeScanned}
          flash="auto" // Adjust other props as needed
          facing="back"
        />
      )}

      <View style={styles.section}>
        <Text style={styles.title}>Add Ingredient Manually:</Text>
        <Text>Ingredient Name or Barcode:</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Tomatoes or product barcode"
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
