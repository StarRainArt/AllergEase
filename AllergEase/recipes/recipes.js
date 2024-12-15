import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";

const SPOONACULAR_API_KEY = '20d4411eec5744e79d7906bea977857e';
const SEARCH = 'https://api.spoonacular.com/recipes/';

export default function RecipesPage({ navigation }) {
	const recipesPerPage = 10;
	const maxPages = 2;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [filters, setFilters] = useState({ query: null, cuisine: null, diet: null, ingredients: [] });
	const [selectedAllergies, setSelectedAllergies] = useState([]);
	const [fontsLoaded] = useFonts({
		"Chewy": require("../assets/fonts/Chewy-Regular.ttf"),
		"DynaPuff": require("../assets/fonts/DynaPuff-Regular.ttf"),
		"DynaPuffMedium": require("../assets/fonts/DynaPuff-Medium.ttf"),
		"BalooPaaji2": require("../assets/fonts/BalooPaaji2-VariableFont_wght.ttf"),
	});

	const fetchUser = async () => {
		const userData = await AsyncStorage.getItem('user');
		const user = JSON.parse(userData);
		setSelectedAllergies(user.allergies || []);
	};

	// Haal recepten op op basis van filters
	const getRecipesSearch = async (filter = filters, page = 1) => {
		try {
			let url = `${SEARCH}/complexSearch?number=${recipesPerPage}&offset=${(page - 1) * recipesPerPage}&apiKey=${SPOONACULAR_API_KEY}`;
			if (filter.query !== null) {
				url += `&query=${filter.query}`;
			}
			if (filter.cuisine) {
				url += `&cuisine=${filter.cuisine}`;
			}
			if (filter.diet) {
				url += `&diet=${filter.diet}`;
			}
			if (filter.ingredients.length) {
				url += `&includeIngredients=${filter.ingredients.join(",")}`;
			}
			if (selectedAllergies.length > 0) {
				url += `&intolerances=${selectedAllergies.join(",")}`;
			}
			const response = await fetch(url);
			const json = await response.json();
			setData(prevData => [...prevData, ...json.results]);
		} catch (error) {
			console.error("Failed to fetch recipe details:", error);
		} finally {
			setLoading(false);
			setIsFetchingMore(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			setData([]);
			fetchUser();
			getRecipesSearch(filters, page);
		}, [filters, page])
	);

	// Voeg recept toe aan favorieten
	const addToFavorites = async (recipe) => {
		try {
			// Haal de bestaande favorieten op uit AsyncStorage
			const existingFavorites = await AsyncStorage.getItem('favorites');
			let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

			// Voeg het recept toe aan de lijst van favorieten als het nog niet in de lijst staat
			if (!favorites.some(fav => fav.id === recipe.id)) {
				favorites.push(recipe);
				await AsyncStorage.setItem('favorites', JSON.stringify(favorites));  // Sla de favorieten op
			} else {
				console.log("Recept is al een favoriet!");
			}
		} catch (error) {
			console.error("Fout bij toevoegen aan favorieten:", error);
		}
	};

	// Laad meer recepten wanneer de gebruiker scrolt
	const loadMoreRecipes = () => {
		if (!isFetchingMore && page < maxPages) {
			setIsFetchingMore(true);
			setPage(prevPage => prevPage + 1);
		}
	};

	// Render elke recept
	const RenderRecipe = ({ recipe }) => (
		<View style={[styles.sectionGreen, { marginBottom: 4 }]}>
			<Text style={[styles.title, { paddingVertical: 10, fontSize: 20 }]}>{recipe.title}</Text>
			{recipe.image && <Image source={{ uri: recipe.image }} style={recipesStyle.image} />}
			<TouchableOpacity
				style={styles.favoriteButton}
				onPress={() => addToFavorites(recipe)}
			>
				<Text style={styles.favoriteButtonText}>Add to Favorites</Text>
			</TouchableOpacity>
			
		</View>
	);

	if (loading && page == 1) {
		return <View>
			<Text>Loading...</Text>
		</View>;
	}

	return (
		<View style={styles.background}>
			<Text style={styles.title}>Recipes</Text>
			<FlatList
				data={data}
				renderItem={({ item }) => <RenderRecipe recipe={item} />}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={!filters.query && !filters.diet && !filters.cuisine && filters.ingredients.length < 1 ? null : loadMoreRecipes}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isFetchingMore ? <Text>Loading...</Text> : null}
			/>
			<Pressable style={styles.buttonRed} title="Filter" onPress={() => navigation.navigate('FilterRecipes')}><Text style={styles.redButtonText}>Filter</Text></Pressable>
			<Pressable 
  style={styles.buttonRed} 
  onPress={() => navigation.navigate('FavoriteRecipes')}
>
  <Text style={styles.redButtonText}>Favoriete</Text>
</Pressable>
		</View>
	);
}

const { width, height } = Dimensions.get('window');

const recipesStyle = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 3,
	},
	image: {
		width: width * 0.8,
		alignSelf: 'center',
		height: 100,
	},
});

const styles = StyleSheet.create({
	background: {
		padding: 30,
		flex: 1,
		alignItems: 'center',
		backgroundColor: "#FFF5E1",
	},
	title: {
		textAlign: "center",
		fontSize: 40,
		fontFamily: "DynaPuffMedium",
		color: "#472D30",
		paddingVertical: 20,
	},
	sectionGreen: {
		backgroundColor: "#C9CBA3",
		color: "#472D30",
		borderRadius: 15,
		padding: 5,
	},
	buttonRed: {
		backgroundColor: "#E26D5C",
		width: "60%",
		borderRadius: 15,
		paddingVertical: 5,
	},
	redButtonText: {
		color: "#FFF5E1",
		fontSize: 25,
		fontFamily: "DynaPuff",
		textAlign: "center",
	},
	favoriteButton: {
		backgroundColor: "#E26D5C",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	favoriteButtonText: {
		color: "#FFF5E1",
		fontSize: 16,
		textAlign: "center",
	},
});