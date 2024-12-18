import React, { useCallback, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, FlatList, StyleSheet, Image, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import styles from "../style";
const SPOONACULAR_API_KEY = '698e1cea042340ba930b76e05c681e9c';
const SEARCH = 'https://api.spoonacular.com/recipes';

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
	const [favorites, setFavorites] = useState([]);
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

	const fetchFavorites = async () => {
		const favoritesData = await AsyncStorage.getItem('favorites');
		let favorites = JSON.parse(favoritesData) || [];

		setFavorites(favorites);
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
			if (filter.maxReadyTime) url += `&maxReadyTime=${filter.maxReadyTime}`;
			if (allergies.length > 0) url += `&intolerances=${allergies.join(",")}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch recipes");
			}
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
			fetchFavorites();
			setData([]);
			fetchUser();
			getRecipesSearch(filters, page, allergies);
		}, [filters, page])
	);

	const toggleFavorite = async (recipe) => {
		const favoritesData = await AsyncStorage.getItem('favorites');
		let favorites = favoritesData ? JSON.parse(favoritesData) : [];

		if (!favorites.some(i => i.id === recipe.id)) {
			favorites.push(recipe);
		} else {
			favorites = favorites.filter(i => i.id !== recipe.id);
		}

		await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
		fetchFavorites(favorites);
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
	const RenderRecipe = ({ recipe, favorites }) => {
		let id = recipe.id;
		return (
			<View style={[styles.sectionGreen, { marginBottom: 10 }]}>
				<TouchableOpacity onPress={() => navigation.navigate('RecipePage', { id })}>
					<Text style={[styles.kopje, { paddingVertical: 10, fontSize: 20 }]}>{recipe.title}</Text>
					{recipe.image && <Image source={{ uri: recipe.image }} style={recipes.image} />}
				</TouchableOpacity>

				<TouchableOpacity
					style={recipes.favButton}
					onPress={() => toggleFavorite(recipe)}
				>
					<Icon name={favorites.some(i => i.id === recipe.id) ? 'star' : 'star-border'} size={50} color="#E26D5C" />
				</TouchableOpacity>
			</View>
		)
	};

	if (loading && page == 1) {
		return <View>
			<Text>Loading...</Text>
		</View>;
	}

	return (
		<View style={styles.background}>
			<Text style={styles.title}>Recipes</Text>
			<FlatList
				style={{ width: "100%" }}
				data={data}
				renderItem={({ item }) => <RenderRecipe recipe={item} favorites={favorites}/>}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={!filters.query && !filters.diet && !filters.cuisine && filters.ingredients.length < 1 ? null : loadMoreRecipes}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isFetchingMore ? <Text>Loading...</Text> : null}
			/>

			<View style={recipes.container}>
				<Pressable style={[styles.buttonRed, recipes.button]} title="Filter" onPress={() => navigation.navigate('FilterRecipes', { onFilter })}>
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
		height: 50,
		width: 50,
		marginTop: 10,
		borderRadius: 7
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