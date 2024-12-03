import React, {useState} from 'react';
import { Button, Text, ScrollView, View, StyleSheet, Pressable, Dimensions, TextInput } from 'react-native';

const IngredientInput = () => {
    const [ingredientName, setIngredientName] = useState('');
  
    const handleChangeText = (text) => {
      setIngredientName(text);
    };
  
    const handleSubmit = () => {
      console.log('Ingredient name submitted:', ingredientName);
      // Handle submission logic, e.g., saving to a database
    };
}

const AddToFridgePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>
                    Scan Barcode of voeg handmatig toe.
                </Text>
                <Pressable>
                    <Text>Scan barcode</Text>
                </Pressable>
            </View>
            <View>
                <Text>Handmatig invoeren:</Text>
                <Text>Selecteer Categorie</Text>
                <Text>Placeholder selection menu</Text>
                <Text>Kies de category van het ingredient</Text>
                <Text>Ingredient naam:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E.g., Tomatoes"
                    value={ingredientName}
                    onChangeText={handleChangeText}
                />
                <Pressable title="Voeg ingredient toe" onPress={handleSubmit} />
            </View>
            <View>
                <Text>
                    Recentelijke ingredienten placeholder
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      paddingTop: 40
    }
})

export default AddToFridgePage;