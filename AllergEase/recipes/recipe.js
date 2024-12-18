import React, { useState, useCallback } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from "../style";
const SPOONACULAR_API_KEY = '8b5ba339a9c944b5bebe6274e6044b5c';
const SEARCH = 'https://api.spoonacular.com/recipes';

export default function RecipePage({ navigation, route }) {
    const { id } = route.params;
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [allergies, setAllergies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [items, setItems] = useState([]);
    const [itemsAdded, setItemsAdded] = useState(false);
    const [fontsLoaded] = useFonts({
        "Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
        "DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
        "DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
        "BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
    });

    const fetchItems = async () => {
        const storedItems = await AsyncStorage.getItem('shoppingList');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    };

    const addItems = async (addItems = []) => {
        addItems = addItems.map(i => ({ id: i.id, name: i.nameClean, bought: false }));
        let newitems = addItems.filter(i => !items.some(j => j.id === i.id));
        setItems([...items, ...newitems]);
        setItemsAdded(true);
        await AsyncStorage.setItem('shoppingList', JSON.stringify([...items, ...newitems]));
    };

    const fetchFavorites = async () => {
        const favoritesData = await AsyncStorage.getItem('favorites');
        let favorites = JSON.parse(favoritesData) || [];

        setFavorites(favorites);
    };

    const toggleFavorite = async (recipe) => {
        fetchFavorites();
        checkItems(recipe);
        if (!itemsAdded) {
           
        if (!favorites.some(i => i.id === recipe.id)) {
            favorites.push(recipe);
        } else {
            favorites = favorites.filter(i => i.id !== recipe.id);
        }
        }


        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        fetchFavorites(favorites);
    };

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
                <Text key={ingredient.id} style={recipeStyle.paragraph}>
                    {ingredient.original}
                </Text>
            );
        });
    };
    const instructionsList = () => {
        return recipe.analyzedInstructions[0].steps.map((step) => {
            return (
                <Text key={step.number} style={recipeStyle.paragraph}>
                    {step.number}. {step.step}
                </Text>
            );
        });
    }
    const checkItems =  async (recipe) => { 
        if (items.some(i => !recipe.extendedIngredients.some(j => j.id === i.id))) {
            setItemsAdded(false);
        } else {
            setItemsAdded(true);
        }
    }
    useFocusEffect(
        useCallback(() => {
            fetchItems();
            fetchUser();
            fetchFavorites();
            getRecipe(id);
            checkItems(recipe);
        }, [id])
    );

    if (!fontsLoaded || loading) {
        return <Text style={[styles.background, recipeStyle.recipe]}>Loading...</Text>;
    }
    return (
        <View style={styles.background}>
            <View style={recipeStyle.inARow}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.title}>{'<'}</Text></TouchableOpacity>
                <Text style={styles.title}>Recipes</Text>
                <View />
            </View>
            <ScrollView style={[styles.sectionGreen, { marginBottom: 10 }]} >
                <View style={recipeStyle.inARow}>
                    <View />
                    <TouchableOpacity onPress={() => toggleFavorite(recipe)}><Icon name={favorites.some(i => i.id === recipe.id) ? 'star' : 'star-border'} size={60} color="#E26D5C" /></TouchableOpacity>
                    <Text style={[recipeStyle.title]}>{recipe.title}</Text>
                </View>
                <Image source={{ uri: recipe.image }} style={recipeStyle.image} />
                <View style={recipeStyle.inARow}>
                    <View/>
                    <Text style={[styles.title, recipeStyle.subtitle]}>Ingredients</Text>
                       
                    <TouchableOpacity style={recipeStyle.icon} onPress={() => addItems(recipe.extendedIngredients)}>
                        <Icon name={itemsAdded ? 'shopping-cart' : 'add-shopping-cart'} size={50} color="#FFF5E1" />
                    </TouchableOpacity>
                       

                
                </View>

                <View style={recipeStyle.paragraphContainer}>
                    {ingredientsList()}
                </View>
                <Text style={[styles.title, recipeStyle.subtitle]}>Instructions</Text>
                {recipe.analyzedInstructions.length > 0 ? (
                    <View style={recipeStyle.paragraphContainer}>
                        {instructionsList()}
                    </View>) : (
                    <Text style={recipeStyle.paragraph}>{recipe.instructions}</Text>
                )}
            </ScrollView>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const recipeStyle = StyleSheet.create({
    image: {
        width: width * 0.7,
        alignSelf: 'center',
        height: 150,
        borderRadius: 15,
    },
    inARow: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        width: width * 0.65
    },
    paragraph: {
        fontSize: 18,
        fontFamily: "BalooPaaji2",
        color: "#FFF5E1",
        fontWeight: "bold",
        paddingBottom: 5
    },
    icon: {
        backgroundColor: '#E26D5C',
        borderRadius: 17,
        margin: 2,
        padding: 5,
    },
    title: {
        fontSize: 23,
        fontFamily: "DynaPuff",
        color: "#472D30",
        paddingVertical: 0
    },
    subtitle: {
        fontSize: 22,
        textAlign: "center",
        color: "#FFF5E1",
        paddingVertical: 3
    },
});