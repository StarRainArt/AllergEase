import React, {useState, useEffect} from 'react';
import { Button, Text, ScrollView, View, StyleSheet, Pressable, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const FridgePage = ({ navigation }) => {
  const [fridgeItems, setFridgeItems] = useState([]);
  
  useEffect(() => {
    navigation.setOptions({
      addToFridge: (items) => {
        console.log('Adding to fridge:', items);  // Debugging step
        setFridgeItems((prev) => [...prev, ...items]);
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Your fridge</Text>
      <ScrollView>
        {fridgeItems.length > 0 ? (
          fridgeItems.map((item, index) => (
            <View key={index} style={styles.fridgeItems}>
              <Text>{item.name}</Text>
            </View>
          ))
        ) : (
          <Text>No ingredients in your fridge.</Text>
        )}
      </ScrollView>

      <View style={styles.buttonItems}>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Recipes')}
        >
          <Text>Recipes</Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Shopping List')}
        >
          <Text>Shopping List</Text>
        </Pressable>
        <Pressable
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('AddToFridge', { addToFridge: setFridgeItems })} // Pass addToFridge here
        >
          <Text>Add Ingredient</Text>
        </Pressable>
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
    paddingTop: 40
  },
  fridgeItems:{

  },
  buttonItems: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
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
