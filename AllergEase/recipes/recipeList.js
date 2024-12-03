import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Recipe } from "./recipe";

export default function recipeList({ recipes }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipe}>
            <Text>{item.title}</Text>
            <Text>{item.image}</Text>
          </View>
        )}
      />
    </View>
  );
}
