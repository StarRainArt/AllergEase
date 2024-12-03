import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage({ navigation }) {
    const [user, setUser] = useState(null);
    
    useFocusEffect(
        React.useCallback(() => {
          const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            setUser(userData ? JSON.parse(userData) : null);
          };
          fetchUser();
        }, [])
      );
  
    return (
      <View style={styles.background}>
        {user && (
          <>
            <Text>Username: {user.username}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Allergies: {user.allergies && user.allergies.length > 0 ? user.allergies.join(', ') : 'None'}</Text>
            <Button title="Edit Allergies" onPress={() => navigation.navigate('EditAllergies')} />
            <Button title="Edit User Info" onPress={() => navigation.navigate('EditUserInfo')} />
          </>
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    background: {
        padding: 30,
    },
    container: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 100, // Space for the Save button
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uncheckedBox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'transparent',
    },
    checkedBox: {
        width: 18,
        height: 18,
        backgroundColor: '#000',
    },
    buttonContainer: {
        padding: 10,
        backgroundColor: '#fff',
    },
});