import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import styles from "../style";

const FavoriteRecipesScreen = ({ navigation }) => {
	const [favorites, setFavorites] = useState([]);

	const [fontsLoaded] = useFonts({
		"Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
		"DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
		"DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
		"BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
	});

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

	// Function to remove an item from favorites
	const removeFavorite = async (id) => {
		try {
			// Filter out the item with the matching id
			const updatedFavorites = favorites.filter(item => item.id !== id);

			// Update the state and AsyncStorage
			setFavorites(updatedFavorites);
			await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		} catch (error) {
			console.error("Failed to remove favorite:", error);
		}
	};

	useEffect(() => {
		fetchFavorites();  // Laad favorieten wanneer de pagina wordt geladen
	}, []);

	// Render elke favoriet
	const RenderFavorite = ({ recipe }) => (
		<View style={favs.recipeContainer}>
			<Text style={favs.recipeTitle}>{recipe.title}</Text>
			<TouchableOpacity onPress={() => removeFavorite(recipe.id)}>
			<Icon name='star' color="#E26D5C" size={50}/>
		</TouchableOpacity>
		</View >
	);

return (
	<View style={styles.background}>
		<View style={favs.inARow}>
			<Pressable onPress={() => navigation.goBack()}><Text style={styles.title}>{'<'}</Text></Pressable>
			<Text style={styles.title}>Recipes</Text>
			<View></View>
		</View>
		<Text style={[styles.kopje, { marginBottom: 10 }]}>Favorites</Text>
		{favorites.length > 0 ? (
			<FlatList
				style={{ width: "100%" }}
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

// Stijlen voor de favorietenpagina
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
		flexDirection: "row",
		justifyContent: "space-between",
	},
	recipeTitle: {
		fontSize: 20,
		fontFamily: "DynaPuffMedium",
		color: "#472D30",
		marginBottom: 5,
		width: "80%"
	},
	text: {
		fontSize: 20,
		fontFamily: "BalooPaaji2",
		textAlign: "center"
	}
});

export default FavoriteRecipesScreen;