import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const SPOONACULAR_API_KEY = '20d4411eec5744e79d7906bea977857e';
const SEARCH = 'https://api.spoonacular.com/recipes/';





export default function RecipesPage({query = null}) {
  const recipesPerPage = 10;
  const maxPages = 2;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    const getRecipesSearch = async (query = null, page = 1) => {
      try {
        let url;
        if (query == null) {
          url = `${SEARCH}/complexSearch?number=${recipesPerPage}&apiKey=${SPOONACULAR_API_KEY}`
        } else {
          url = `${SEARCH}complexSearch?number=${recipesPerPage}&offset=${(page - 1) * recipesPerPage}&query=${query}&apiKey=${SPOONACULAR_API_KEY}`
        }
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
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
    getRecipesSearch(query, page);
  }, [query, page]);

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
        onEndReached={!query ? null : loadMoreRecipes}
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