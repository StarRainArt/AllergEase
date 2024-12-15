import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { allergyList } from "../allergies";
import { dietList } from "../diets";
import { cuisineList } from "../cuisines";

export default function FilterRecipes({ route }) {
    const { onFilter } = route.params;
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
            <Picker
                selectedValue={diet}
                onValueChange={(itemValue) => setDiet(itemValue)}
            >
                <Picker.Item label="Select diet" value="" />
                {dietList.map((diet) => (
                    <Picker.Item key={diet} value={diet} label={diet} />
                ))}
            </Picker>
            <Picker
                selectedValue={cuisine}
                onValueChange={(itemValue) => setCuisine(itemValue)}
            >
                <Picker.Item label="Select cuisine" value="" />
                {cuisineList.map((cuisine) => (
                    <Picker.Item key={cuisine} value={cuisine} label={cuisine} />
                ))}
            </Picker>
           
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