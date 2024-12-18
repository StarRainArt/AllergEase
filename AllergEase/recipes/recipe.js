import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, Button, Dimensions, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from "../style";
const SPOONACULAR_API_KEY = '698e1cea042340ba930b76e05c681e9c';
const SEARCH = 'https://api.spoonacular.com/recipes';

export default function RecipePage({ navigation, route }) {
    const { id } = route.params;
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [allergies, setAllergies] = useState([]);
    const [fontsLoaded] = useFonts({
        "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
        "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
        "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
        "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
    });

 

    const fetchUser = async () => {
        const userData = await AsyncStorage.getItem('user');
        const user = JSON.parse(userData);
        
        setAllergies(user.allergies);
    };
    const getRecipe = async (id) => {
        try {
            const response = await fetch(`${SEARCH}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`);
            const json = await response.json();
            setRecipe(json);
        }
        catch (error) {
            console.error("Failed to fetch recipe details:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const ingredientsList = () => {
        return recipe.extendedIngredients.map((ingredient) => {
            return (
                <Text key={ingredient.id} style={styles.ingredient}>
                    {ingredient.original}
                </Text>
            );
        });
    };
    const instructionsList = () => {
        return recipe.analyzedInstructions[0].steps.map((step) => {
            return (
                <Text key={step.number} style={styles.instruction}>
                    {step.number}. {step.step}
                </Text>
            );
        });
    }
    useFocusEffect(
        useCallback(() => {
            fetchUser();
            getRecipe(id);
    }, [id])
);

    if (!fontsLoaded || loading) {
        return <Text style={[styles.background, recipeStyle.recipe]}>Loading...</Text>;
    }
    return (
        <View style={styles.background}>
            <Button
                title="Back"
                onPress={() => navigation.navigate('RecipesPage')}
                buttonStyle={styles.button}
            />
            <Text style={styles.title}>Recipes</Text>
           
            <ScrollView >
            <Image source={{ uri: recipe.image }} style={recipeStyle.image} />
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.subtitle}>Ingredients:</Text>
            <View style={recipeStyle.ingredientsContainer}>
                {ingredientsList()}
            </View>
            <Text style={styles.subtitle}>Instructions:</Text>
            {recipe.analyzedInstructions.length > 0 ? (
            <View style={recipeStyle.instructionsContainer}>
                {instructionsList()}
            </View>) : (
            <Text style={recipeStyle.instructions}>{recipe.instructions}</Text>
               )}
            </ScrollView>
        </View>
    );
}

const {width, height} = Dimensions.get('window');

const recipeStyle = StyleSheet.create({
    image: {
		width: width*0.8,
		alignSelf: 'center',
		height: 100,
	},
});