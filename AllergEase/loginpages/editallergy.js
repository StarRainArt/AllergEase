import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAllergiesPage({ navigation }) {
  const allergiesList = [
    'Gluten', 'Lupine', 'Selderij', 'Ei', 'Vis',
    'Pinda', 'Soja', 'Lactose', 'Schaaldieren',
    'Mosterd', 'Sesamzaad', 'Sulfiet', 'Weekdieren', 'Noten',
  ];
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setSelectedAllergies(user.allergies || []);
    };
    fetchUser();
  }, []);

  const handleToggle = (allergy) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const handleSave = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    user.allergies = selectedAllergies;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigation.goBack();
  };

  return (
    <View>
      <FlatList
        data={allergiesList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
            <Switch value={selectedAllergies.includes(item)} onValueChange={() => handleToggle(item)} />
          </View>
        )}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}