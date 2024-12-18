import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'
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
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.title}>{'<'}</Text></TouchableOpacity>
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
            <Text style={[styles.kopje, {marginBottom: 10}]}>Time limit</Text>
            {maxReadyTime < 120 ? <Text>{maxReadyTime}</Text> : <Text>120+</Text>}
            <Slider style={{width: "100%", height: 40}}
                minimumValue={0}
                maximumValue={120}
                step={5}
                value={maxReadyTime}
                onSlidingComplete={handleSilderChange}
               />
            <Picker
                style={[styles.input, filter.input]}
                selectedValue={diet}
                onValueChange={(itemValue) => setDiet(itemValue)}
            >
                <Picker.Item label="Select diet" value="" />
                {dietList.map((diet) => (
                    <Picker.Item key={diet} value={diet} label={diet} />
                ))}
            </Picker>
            <Picker
                style={[styles.input, filter.input]}
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
               
            </View>
            <TouchableOpacity style={filter.icon} onPress={handleFilter}>
                    <Icon name="search" color="#FFF5E1" size={90} style={[{padding: 0},{margin:0}]}/>
            </TouchableOpacity>
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
    icon: {
        backgroundColor: '#E26D5C',
        borderRadius: 20,
        marginTop: 50,
        padding: 0,
        alignSelf: 'flex-end',
        height: 80,
        width: 80,
    },
    input: {
        width: "100%",
        backgroundColor: "#C9CBA3",
        fontSize: 18,
        color: "#FFF5E1",
    },
    button: {
        marginBottom: 20
    },
    buttonText: {
        fontSize: 20
    },
});