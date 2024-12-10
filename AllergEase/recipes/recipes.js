import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const SPOONACULAR_API_KEY = '20d4411eec5744e79d7906bea977857e';
const COMPLEXSEARCH = 'https://api.spoonacular.com/recipes/complexSearch';





export default function RecipesPage(query = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRecipesSearch = async (query = null) => {
      try {
        let url;
        if (query == null) {
          url = `${COMPLEXSEARCH}?number=2&apiKey=${SPOONACULAR_API_KEY}`
        } else {
          url = `${COMPLEXSEARCH}?number=20&query=${query}&apiKey=${SPOONACULAR_API_KEY}`
        }
        const response = await fetch(url)

        const json = await response.json()
        setData(json)
      }
      catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
      finally {
        setLoading(false)
      }
    }
    getRecipesSearch();
  }, []);
  const RenderRecipe = ({ title }) => {
    <View style={recipesStyle.item}>
      <Text style={recipesStyle.title}>{title}</Text>
    </View>
  }

  if(loading){
    return <View>
      <Text>loading</Text>
    </View>
  }
  let results = data.results
  return (
    <View style={recipesStyle.container}>
      <FlatList
        data={results}
        renderItem={({item}) => <RenderRecipe title={item.title}/>}
        keyExtractor={item => item.id}
      />
    </View>
  );

}
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
});