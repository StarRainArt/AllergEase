import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, Pressable, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../style";

const FavoriteRecipesScreen = ({ navigation }) => {
	const [favorites, setFavorites] = useState([]);


	const fetchFavorites = async () => {
		try {
			const savedFavorites = await AsyncStorage.getItem('favorites');
			if (savedFavorites) {
				setFavorites(JSON.parse(savedFavorites));  
			}
		} catch (error) {
			console.error("Failed to load favorites:", error);
		}
	};

	
	const removeFavorite = async (id) => {
		try {
			
			const updatedFavorites = favorites.filter(item => item.id !== id);
			
		
			setFavorites(updatedFavorites);
			await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		} catch (error) {
			console.error("Failed to remove favorite:", error);
		}
	};

	useEffect(() => {
		fetchFavorites();  
	}, []);


	const RenderFavorite = ({ recipe }) => (
		<View style={favs.recipeContainer}>
			<Text style={favs.recipeTitle}>{recipe.title}</Text>
			{recipe.image && <Image source={{ uri: recipe.image }} style={favs.recipeImage} />}
			<Pressable style={styles.buttonRed} onPress={() => removeFavorite(recipe.id)}>
				<Text style={[styles.redButtonText, {fontSize: 18}]}>Remove Favorite</Text>
			</Pressable>
		</View>
	);

	return (
		<View style={styles.background}>
			<View style={favs.inARow}>
                <Pressable onPress={() => navigation.navigate('Main', { screen: 'recipes' })}><Text style={styles.title}>{'<'}</Text></Pressable>
                <Text style={styles.title}>Recipes</Text>
                <View></View>
            </View>
			<Text style={[styles.kopje, {marginBottom: 10}]}>Favorites</Text>
			{favorites.length > 0 ? (
				<FlatList
					style={{width: "100%"}}
					data={favorites}
					renderItem={({ item }) => <RenderFavorite recipe={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			) : (
				<Text style={favs.text}>You don't have any favorite recipes yet.</Text>
			)}
		</View>
	);
};


const favs = StyleSheet.create({
	inARow: {
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: "space-between", 
        width: "100%"
    },
	recipeContainer: {
		backgroundColor: "#C9CBA3",
		width: "100%",
		padding: 10,
		borderRadius: 15,
		marginBottom: 15,
	},
	recipeTitle: {
		fontSize: 20,
		fontFamily: "DynaPuffMedium",
		color: "#472D30",
		marginBottom: 5,
	},
	recipeImage: {
		width: "100%",
		height: 150,
		borderRadius: 10,
		marginVertical: 10,
	},
	text: {
		fontSize: 20,
		fontFamily: "BalooPaaji2",
		textAlign: "center"
	}
});

export default FavoriteRecipesScreen;