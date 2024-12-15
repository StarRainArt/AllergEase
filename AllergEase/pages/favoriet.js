import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteRecipesScreen = () => {
	const [favorites, setFavorites] = useState([]);

	// Haal de favorieten op uit AsyncStorage
	const fetchFavorites = async () => {
		try {
			const savedFavorites = await AsyncStorage.getItem('favorites');
			if (savedFavorites) {
				setFavorites(JSON.parse(savedFavorites));  // Zet de favorieten in de state
			}
		} catch (error) {
			console.error("Failed to load favorites:", error);
		}
	};

	useEffect(() => {
		fetchFavorites();  // Laad favorieten wanneer de pagina wordt geladen
	}, []);

	// Render elke favoriet
	const RenderFavorite = ({ recipe }) => (
		<View style={styles.recipeContainer}>
			<Text style={styles.recipeTitle}>{recipe.title}</Text>
			{recipe.image && <Image source={{ uri: recipe.image }} style={styles.recipeImage} />}
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Favorite Recipes</Text>
			{favorites.length > 0 ? (
				<FlatList
					data={favorites}
					renderItem={({ item }) => <RenderFavorite recipe={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			) : (
				<Text style={styles.noFavoritesText}>You don't have any favorite recipes yet.</Text>
			)}
		</View>
	);
};

// Stijlen voor de favorietenpagina
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#FFF5E1",
	},
	title: {
		fontSize: 30,
		fontFamily: "DynaPuffMedium",
		color: "#472D30",
		textAlign: "center",
		marginBottom: 20,
	},
	recipeContainer: {
		backgroundColor: "#C9CBA3",
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
		marginTop: 10,
	},
	noFavoritesText: {
		fontSize: 18,
		color: "#472D30",
		textAlign: "center",
	},
});

export default FavoriteRecipesScreen;