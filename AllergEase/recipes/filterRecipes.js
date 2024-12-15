import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";

export default function FilterRecipes({ onFilter }) {
    const [query, setQuery] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [maxReadyTime, setMaxReadyTime] = useState("");

    const handleAddIngredient = () => {
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient("");
        }
    };

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };
    const handleFilter = () => {
        onFilter({ query, ingredients, diet, cuisine, maxReadyTime });
    };

    return (
        <View>
            <Text>Filter</Text>
            <TextInput
                placeholder="Name"
                value={query}
                onChangeText={setQuery}
            />
            <TextInput
                placeholder="diet"
                value={diet}
                onChangeText={setDiet}
            />
            <TextInput
                placeholder="cuisine"
                value={cuisine}
                onChangeText={setCuisine}
            />
            <View>
                <TextInput
                    placeholder="Add ingredient"
                    value={ingredient}
                    onChangeText={setIngredient}
                />
                <Button title="Add" onPress={handleAddIngredient} />
                <FlatList
                    data={ingredients}
                    renderItem={({ item, index }) => (
                        <View>
                            <Text>{item}</Text>
                            <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                                <Text style={filterStyles.removeButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor= {(item, index) => index.toString()}
                />
                <Button title="Filter" onPress={handleFilter} />
            </View>
        </View>
    )
}