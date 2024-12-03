import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './loginpages/inloggen';
import RegisterPage from './loginpages/registreren';
import ProfilePage from './loginpages/profiel';
import EditAllergiesPage from './loginpages/editallergy';
import EditUserInfoPage from './loginpages/edituser';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="EditAllergies" component={EditAllergiesPage} />
        <Stack.Screen name="EditUserInfo" component={EditUserInfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}