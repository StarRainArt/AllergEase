import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function RecipeList({ recipes }) {
  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ recipe }) => (
          <View style={styles.recipe}>
            <Text>{recipe.title}</Text>
            <Text>{recipe.image}</Text>
          </View>
        )}
      />
    </View>
  );
}
