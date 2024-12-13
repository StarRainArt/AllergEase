import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FridgePage from './fridge';
import AddToFridgePage from './addtofridge';

const Stack = createStackNavigator();

const FridgeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Fridge" 
        component={FridgePage} 
        options={{ title: 'Your Fridge' }} 
      />
      <Stack.Screen 
        name="AddToFridge" 
        component={AddToFridgePage} 
        options={{ title: 'Add Ingredients' }} 
      />
    </Stack.Navigator>
  );
};

export default FridgeStack;