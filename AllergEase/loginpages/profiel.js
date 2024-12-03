import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage({ navigation }) {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const userData = await AsyncStorage.getItem('user');
        setUser(userData ? JSON.parse(userData) : null);
      };
      fetchUser();
    }, []);
  
    return (
      <View>
        {user && (
          <>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Allergies: {user.allergies.join(', ') || 'None'}</Text>
            <Button title="Edit Allergies" onPress={() => navigation.navigate('EditAllergies')} />
            <Button title="Edit User Info" onPress={() => navigation.navigate('EditUserInfo')} />
          </>
        )}
      </View>
    );
  }