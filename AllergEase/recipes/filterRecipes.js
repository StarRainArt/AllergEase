import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { allergyList } from "../allergies";
import { dietList } from "../diets";
import { cuisineList } from "../cuisines";
import styles from "../style";

export default function FilterRecipes({ route, navigation }) {
    const { onFilter } = route.params;
    const [query, setQuery] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [maxReadyTime, setMaxReadyTime] = useState(0);

    const handleAddIngredient = () => {
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient("");
        }
    };

    const handleSilderChange = (value) => {
        setMaxReadyTime(value);
    };

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleFilter = () => {
        const filters = { query, diet, cuisine, ingredients, maxReadyTime };
        onFilter(filters);
        navigation.goBack();
    };


    return (
        <View style={styles.background}>
            <View style={filter.inARow}>
                <Pressable onPress={() => navigation.navigate('Main', { screen: 'recipes' })}><Text style={styles.title}>{'<'}</Text></Pressable>
                <Text style={styles.title}>Recipes</Text>
                <View></View>
            </View>
            <Text style={[styles.kopje, {marginBottom: 20}]}>Filter</Text>
            <TextInput
                style={[styles.input, filter.input]}
                placeholder="Name"
                value={query}
                onChangeText={setQuery}
            />
            <Slider
                minimumValue={0}
                maximumValue={120}
                step={5}
                value={maxReadyTime}
                onValueChange={handleSilderChange}
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
            <View style={{width: "100%"}}>

                <TextInput
                    style={[styles.input, filter.input]}
                    placeholder="Add ingredient"
                    value={ingredient}
                    onChangeText={setIngredient}
                />
                <Pressable style={[styles.buttonGreen, filter.button]} onPress={handleAddIngredient}>
                    <Text style={[styles.greenButtonText, filter.buttonText]}>Add</Text>
                </Pressable>
                <FlatList
                    data={ingredients}
                    renderItem={({ item, index }) => (
                        <View>
                            <Text>{item}</Text>
                            <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                                <Text>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor= {(item, index) => index.toString()}
                />
                <Pressable style={[styles.buttonRed, filter.button]} onPress={handleFilter}>
                    <Text style={[styles.redButtonText, filter.buttonText]}>Filter</Text>
                </Pressable>
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
        width: "100%",
        fontSize: 18
    },
    button: {
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20
    },
});