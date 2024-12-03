import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import ProfilePage from '.loginpages/profiel';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Screen name="Profile" component={ProfilePage} />
    </NavigationContainer>
  );
}

function fridgePage(){
    return(
        <View styles={styles.container}>
            <Text>Your fridge</Text>
            <View>
                <View styles={styles.fridgeItems}>

                </View>
                <View styles={styles.fridgeItems}>

                </View>
                <View styles={styles.fridgeItems}>

                </View>
            </View>
            <View styles={buttonItems}>
                <Button>

                </Button>
                <Button>

                </Button>
                <Button>
                    
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8'
    },
    fridgeItems: {
        flex: 1,
        width: 100,
        height: 100,
        backgroundColor: '#d3d3d3'
    }
  });