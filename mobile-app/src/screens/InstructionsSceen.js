import React, { useEffect, useState } from 'react'
import { View, ScrollView, FlatList, Text, StyleSheet } from "react-native";

export default InstructionsSceen = () => {
    const [instructions, setInstructions] = useState([]);
    useEffect(() => {
        fetch("http://18.184.129.69/siaj-api/instructions")
            .then(res => res.json())
            .then(({ instructions }) => setInstructions(instructions))
            .catch(err => console.log(err))
    }, [])
    return (
        <FlatList data={instructions}
            renderItem={({ item }) => (<View><Text style={styles.list}>{item.text}</Text></View>)}
            keyExtractor={item => item._id}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        textAlign: "right",
        fontWeight: "bold",
        margin: 5,
        borderWidth: 1,
        padding: 10
    }
})
