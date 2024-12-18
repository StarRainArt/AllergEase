import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
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



	const getRecipesSearch = async (filter = filters, page = 1, allergies = []) => {
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
			if (filter.maxReadyTime) {
				url += `&maxReadyTime=${filter.maxReadyTime}`;
			}
			if (filter.ingredients.length) {
				url += `&includeIngredients=${filter.ingredients.join(",")}`;
			}
			if (allergies.length > 0) {
				url += `&intolerances=${allergies.join(",")}`;

			}
			console.log(url);
			const response = await fetch(url);
			const json = await response.json();
			setData(prevData => [...prevData, ...json.results]);
		}
		catch (error) {
			console.error("Failed to fetch recipe details:", error);
		}
		finally {
			setLoading(false);
			setIsFetchingMore(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			setData([]);
			fetchUser();
			console.log(allergies);
			getRecipesSearch(filters, page, allergies);
		}, [filters, page])
	);

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

	const RenderRecipe = ({ title, image, id }) => (
		<Pressable style={[styles.sectionGreen,{ marginBottom: 4,}]} onPress={() => navigation.navigate('RecipePage', { id })}>
			<Text style={[styles.title, {paddingVertical: 10,fontSize: 20}]}>{title}</Text>
			{image && <Image source={{ uri: image }} style={recipesStyle.image} />}
		</Pressable>
	);


	if (loading && page == 1) {
		return <View>
			<Text>loading</Text>
		</View>
	}
	return (
		<View style={styles.background}>
			<Text style={styles.title}>Recipes</Text>
			<FlatList
				data={data}
				renderItem={({ item }) => <RenderRecipe title={item.title} image={item.image} id={item.id} />}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={!filters.query && !filters.diet && !filters.cuisine && filters.ingredients.length < 1 ? null : loadMoreRecipes}
				onEndReachedThreshold={0.5}
				ListFooterComponent={isFetchingMore ? <Text>Loading...</Text> : null}
			/>
			<Pressable style={styles.buttonRed} title="Filter" onPress={() => navigation.navigate('FilterRecipes', { onFilter })}><Text style={styles.redButtonText}>filter</Text></Pressable>
		</View>
	);

}
const { width, height } = Dimensions.get('window');

// Styling temporary
const recipesStyle = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 3,
	},
	image: {
		width: width*0.8,
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
		paddingVertical: 20
	  },
	  sectionGreen: {
		backgroundColor: "#C9CBA3",
		color: "#472D30",
		borderRadius: 15,
		padding: 5
	  },
	  sectionYellow: {
		backgroundColor: "#FFE1A8",
		color: "#472D30",
		borderRadius: 15,
		padding: 5
	  },
	  buttonRed: {
		backgroundColor: "#E26D5C",
		width: "60%",
		borderRadius: 15,
		paddingVertical: 5
	  },
	  buttonGreen: {
		backgroundColor: "#C9CBA3",
		width: "60%",
		borderRadius: 15,
		paddingVertical: 5
	  },
	  greenButtonText: {
		color: "#472D30",
		fontSize: 25,
		fontFamily: "DynaPuff",
		textAlign: "center",
	  },
	  redButtonText: {
		color: "#FFF5E1",
		fontSize: 25,
		fontFamily: "DynaPuff",
		textAlign: "center",
	  },
	  input: {
		backgroundColor: "#FFE1A8",
		color: "#472D30",
		paddingLeft: 15,
		paddingTop: 5,
		paddingBottom: 0,
		width: "95%",
		borderRadius: 15,
		marginBottom: 20,
		fontSize: 25,
		fontFamily: "BalooPaaji2",
		textAlignVertical: "bottom"
	  },
	});