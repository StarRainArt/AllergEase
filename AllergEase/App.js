import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './loginpages/inloggen';
import RegisterPage from './loginpages/registreren';
import RecipesPage from './recipes';
import FridgeStack from './fridgepages/FridgeStack';
import ShoplistPage from './shoplist';
import ProfilePage from './loginpages/profiel';
import EditAllergiesPage from './loginpages/editallergy';
import EditUserInfoPage from './loginpages/edituser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide headers for tabs
      }}
    >
      <Tab.Screen name="recipes" component={RecipesPage} />
      <Tab.Screen name="fridge" component={FridgeStack} />
      <Tab.Screen name="shoplist" component={ShoplistPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Authentication Pages */}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />

        {/* Pages accessed from Profile */}
        <Stack.Screen name="EditAllergies" component={EditAllergiesPage} />
        <Stack.Screen name="EditUserInfo" component={EditUserInfoPage} />

        {/* Main App (Bottom Tabs) */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}