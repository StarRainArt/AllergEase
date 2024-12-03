import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View, StyleSheet, Pressable } from 'react-native';
import ProfilePage from './loginpages/profiel';

const Stack = createStackNavigator();

const FridgePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Your fridge</Text>
      <View>
        <View style={styles.fridgeItems}></View>
        <View style={styles.fridgeItems}></View>
        <View style={styles.fridgeItems}></View>
      </View>
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
          onPress={() => navigation.navigate('Add Ingredient')}
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  fridgeItems: {
    width: 100,
    height: 100,
    backgroundColor: '#d3d3d3',
    marginBottom: 10,
  },
  buttonItems: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
