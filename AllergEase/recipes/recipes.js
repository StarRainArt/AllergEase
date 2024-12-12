import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const SPOONACULAR_API_KEY = '20d4411eec5744e79d7906bea977857e';
const SEARCH = 'https://api.spoonacular.com/recipes/';





export default function RecipesPage() {
  const recipesPerPage = 10;
  const maxPages = 2;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [filters, setFilters] = useState({ query: null, cuisine: null, diet: null, ingredients: [] });


  useEffect(() => {
    const getRecipesSearch = async (filter =filters, page = 1) => {
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
    getRecipesSearch(filters, page);
  }, [filters, page]);

  const loadMoreRecipes = () => {
    if (!isFetchingMore && page < maxPages) {
      setIsFetchingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const RenderRecipe = ({ title, image }) => (
    <View style={recipesStyle.item}>
      <Text style={recipesStyle.title}>{title}</Text>
      {image && <Image source={{ uri: image }} style={recipesStyle.image} />}
    </View>
  );


  if(loading && page == 1) {
    return <View>
      <Text>loading</Text>
    </View>
  }
  return (
    <View style={recipesStyle.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <RenderRecipe title={item.title} image={item.image} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={!filters.query && !filters.diet && !filters.cuisine && filters.ingredients.length < 1 ? null : loadMoreRecipes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <Text>Loading...</Text> : <Text>Filter for more</Text>}
      />
    </View>
  );

}
// Styling temporary
const recipesStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },  
  image: {
    width: 100,
    height: 100,
  },
});