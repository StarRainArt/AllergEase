import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { RecipeList } from "./recipeList";
import { Recipe } from "./recipe";

const SPOONACULAR_API_KEY = '20d4411eec5744e79d7906bea977857e';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export default function recipes() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${BASE_URL}?query=${query}&number=20&apiKey=${SPOONACULAR_API_KEY}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRecipes(data.results);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        } finally {
          setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <RecipeList recipes={recipes}/>
        </View>
    );
}