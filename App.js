import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Pressable, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { cars } from "./car.json";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="login"
            options={{ title: "Login" }}
          >
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="car-list"
              component={CarListScreen}
              options={{ title: "Car List" }}
            />
            <Stack.Screen
              name="specific-car"
              component={SpecificCarScreen}
              options={{ title: "Specific Car" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validUsername = 'user';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
      navigation.navigate("car-list");
    } else {
      Alert.alert('Error', 'Invalid username or password!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Pressable style={styles.button_press} onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

function CarListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.carlist}
        data={cars}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("specific-car", { car: item })}
            style={styles.itemContainer}
          >
            <Text style={styles.name}>{item.merk}</Text>
            <Image style={styles.image} source={{ uri: item.image }} />
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

function SpecificCarScreen({ route }) {
  const { car } = route.params;

  return (
    <View style={styles.speccontainer}>
      <Text style={styles.specifics}>Car Specifics:</Text>
      <Text>Merk: {car.merk}</Text>
      <Text>Model: {car.model}</Text>
      <Text>Bouwjaar: {car.bouwjaar}</Text>
      <Text>Beschrijving:</Text>
      <Text>{car.beschrijving}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button_press: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  carlist: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 200,
  },
  name: {
    marginRight: 10,
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
  },
  speccontainer:{
    flex: 1,
    backgroundColor: '#fff',
    gap: 10,
    alignItems: 'center',
  },
  specifics: {
    fontSize: 25,
  }
});

