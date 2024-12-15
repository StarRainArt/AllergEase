import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import styles from "../style";

export default function FilterRecipes({ onFilter, navigation }) {
    const [query, setQuery] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");

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
        onFilter({ query, ingredients, diet, cuisine });
    };

    return (
        <View style={styles.background}>
            <View style={regist.inARow}>
            <Pressable onPress={() => navigation.navigate('recipes')}><Text style={styles.title}>{'<'}</Text></Pressable>
            <Text style={styles.title}>Recipes</Text>
            <View></View>
        </View>
            <Text style={styles.kopje}>Filter</Text>
            <TextInput
                style={[styles.input, filter.input]}
                placeholder="Name"
                value={query}
                onChangeText={setQuery}
            />
            <TextInput
                style={[styles.input, filter.input]}
                placeholder="diet"
                value={diet}
                onChangeText={setDiet}
            />
            <TextInput
                style={[styles.input, filter.input]}
                placeholder="cuisine"
                value={cuisine}
                onChangeText={setCuisine}
            />
            <View style={{width: "100%"}}>
                <TextInput
                    style={[styles.input, filter.input]}
                    placeholder="Add ingredient"
                    value={ingredient}
                    onChangeText={setIngredient}
                />
                <Pressable style={styles.buttonGreen} onPress={handleAddIngredient}>
                    <Text style={styles.greenButtonText}>Add</Text>
                </Pressable>
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
                <Pressable style={styles.buttonRed} onPress={handleFilter}>
                    <Text style={styles.redButtonText}>Filter</Text>
                </Pressable>
                <Button title="Filter" onPress={handleFilter} />
            </View>
        </View>
    )
}

const filter = StyleSheet.create({
    inARow: {
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: "space-between", 
        width: "100%"
    },
    input: {
        width: "100%"
    }
});