import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const SPOONACULAR_API_KEY = '20d4411eec5744e79d7906bea977857e';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';


export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
    fetchRecipes();
    }, []);
   
    const renderRecipe = ({ item }) => (
      <View>
        <Image source={{ uri: item.image }}/>
        <Text>{item.title}</Text>
      </View>
    )

    return (
        <View>   
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecipe}
            contentContainerStyle={styles.listContent}
          />
        </View>
    );
}