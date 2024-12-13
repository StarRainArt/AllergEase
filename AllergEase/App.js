import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './loginpages/inloggen';
import RegisterPage from './loginpages/registreren';
import RecipesPage from './recipes';
import FridgeStack from './fridgepages/FridgeStack';
import ShoplistPage from './pages/boodschappen';
import ProfilePage from './loginpages/profiel';
import EditAllergiesPage from './loginpages/editallergy';
import EditUserInfoPage from './loginpages/edituser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfilePage" component={ProfilePage} />
      <ProfileStack.Screen name="EditUserInfo" component={EditUserInfoPage} />
      <ProfileStack.Screen name="EditAllergies" component={EditAllergiesPage} />
    </ProfileStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#472D30', // Dark brown background
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 90,
          paddingTop: 25
        },
        tabBarLabelStyle: {
          display: 'none', // No text labels
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'recipes':
              iconName = require('./assets/recepten.png');
              break;
            case 'fridge':
              iconName = require('./assets/koelkast.png');
              break;
            case 'shoplist':
              iconName = require('./assets/boodschappenlijst.png');
              break;
            case 'Profile':
              iconName = require('./assets/profiel.png');
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Image source={iconName} style={styles.iconImage}/>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="recipes" component={RecipesPage} />
      <Tab.Screen name="fridge" component={FridgeStack} />
      <Tab.Screen name="shoplist" component={ShoplistPage} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        {/* Authentication Pages */}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />

        {/* Pages accessed from Profile */}
        <Stack.Screen name="EditAllergies" component={EditAllergiesPage} />
        {/* <Stack.Screen name="EditUserInfo" component={EditUserInfoPage} />    */}

        {/* Main App (Bottom Tabs) */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E26D5C",
    borderRadius: 10
  },
  iconImage: {
    width: 50,
    height: 50,
  },
});