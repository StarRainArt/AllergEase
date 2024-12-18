import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import styles from "../style";
const SPOONACULAR_API_KEY = '698e1cea042340ba930b76e05c681e9c';
const SEARCH = 'https://api.spoonacular.com/recipes;

export default function RecipesPage({ navigation }) {
	const recipesPerPage = 20;
	const maxPages = 1;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [filters, setFilters] = useState({ query: null, cuisine: null, diet: null, ingredients: [], maxReadyTime: null });
	const [allergies, setAllergies] = useState([]);
  const [apiAvailable, setApiAvailable] = useState(true);

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


	const dummyRecipe = [
		{
		  id: "dummy-1",
		  title: "Dummy Recipe",
		  image: "https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg",
		},
		{
			id: "dummy-2",
			title: "Dummy Recipe 2",
			image: "https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg",
		},
		{
			id: "dummy-3",
			title: "Dummy Recipe 3",
			image: "https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg",
		},
	];

	const checkApiAvailability = async () => {
		try {
		  	const testUrl = `${SEARCH}complexSearch?apiKey=${SPOONACULAR_API_KEY}`;
		  	const response = await fetch(testUrl);
		  	if (response.ok) {
				setApiAvailable(true);
		  	}
			else {
				throw new Error("API unavailable");
		  	}
		} 
		catch (error) {
		  	console.warn("API is unavailable, using dummy recipes:", error);
		  	setApiAvailable(false);
		}
	};

	// Haal recepten op op basis van filters
	const getRecipesSearch = async (filter = filters, page = 1, allergies = []) => {
		if (!apiAvailable) {
			setData(dummyRecipe); // Use dummy recipe if API is unavailable
			setLoading(false);
			return;
		}
		
		try {
			let url = `${SEARCH}/complexSearch?number=${recipesPerPage}&offset=${(page - 1) * recipesPerPage}&apiKey=${SPOONACULAR_API_KEY}`;
			if (filter.query !== null) url += `&query=${filter.query}`;
			if (filter.cuisine) url += `&cuisine=${filter.cuisine}`;
			if (filter.diet) url += `&diet=${filter.diet}`;
			if (filter.ingredients.length) url += `&includeIngredients=${filter.ingredients.join(",")}`;
			if (selectedAllergies.length > 0) url += `&intolerances=${selectedAllergies.join(",")}`;
      if (filter.maxReadyTime) url += `&maxReadyTime=${filter.maxReadyTime}`;
			if (allergies.length > 0) url += `&intolerances=${allergies.join(",")}`;
			const response = await fetch(url);
			const json = await response.json();
			const results = json.results || []; // Safeguard against undefined results
			setData((prevData) => [...prevData, ...results]);
		} catch (error) {
			console.error("Failed to fetch recipes:", error);
			setData(dummyRecipe); // Use dummy recipe on error
		} finally {
			setLoading(false);
			setIsFetchingMore(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			setData([]);
			fetchUser();
      checkApiAvailability();
			getRecipesSearch(filters, page, allergies);
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


	const onFilter = (newFilters) => {
		setFilters(newFilters);
		setPage(1);
		setData([]);
	};

	// Render elke recept
	const RenderRecipe = ({ recipe }) => (
		<View style={[styles.sectionGreen, { marginBottom: 10 }]}>
      <TouchableOpacity onPress={() => navigation.navigate('RecipePage', { recipe.id })}>
		  <Text style={[styles.kopje, { paddingVertical: 10, fontSize: 20 }]}>{recipe.title}</Text>
		  {recipe.image && <Image source={{ uri: recipe.image }} style={recipes.image} />}
      </TouchableOpacity>
		  <TouchableOpacity
			style={[styles.buttonRed, recipes.favButton]}
			onPress={() => addToFavorites(recipe)}
		  >
			<Text style={[styles.redButtonText, recipes.favButtonText]}>Add to Favorites</Text>
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
				style={{width: "100%"}}
				data={data}
				renderItem={({ item }) => <RenderRecipe recipe={item} />}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={!filters.query && !filters.diet && !filters.cuisine && filters.ingredients.length < 1 ? null : loadMoreRecipes}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isFetchingMore ? <Text>Loading...</Text> : null}
			/>

			<View style={recipes.container}>
				<Pressable style={[styles.buttonRed, recipes.button]} title="Filter" onPress={() => navigation.navigate('FilterRecipes', { onFilter})}>
					<Text style={[styles.redButtonText, recipes.buttonText]}>Filter</Text>
				</Pressable>
				<Pressable style={[styles.buttonRed, recipes.button]} onPress={() => navigation.navigate('FavoriteRecipes')}>
					<Text style={[styles.redButtonText, recipes.buttonText]}>Favorites</Text>
				</Pressable>
			</View>
		</View>
	);
}

const { width, height } = Dimensions.get('window');

const recipes = StyleSheet.create({
	
	image: {
		width: width * 0.8,
		alignSelf: 'center',
		height: 100,
	},
	favButton: {
		paddingVertical: 10,
		marginTop: 10,
		borderRadius: 7
	},
	favButtonText: {
		fontSize: 16,
	},
	button: {
		width: "100%",
		paddingVertical: 10
	},
	buttonText: {
		fontSize: 20
	},
	container: {
		paddingVertical: 10,
		gap: 10,
		width: "100%"
	}
});