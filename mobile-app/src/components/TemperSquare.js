import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import NormalFever from '../assets/images/NormalFever';
export default TemperSquare = ({ color, text, subText }) => {
    const styles = StyleSheet.create({
        container: {
            borderRadius: 15,
            padding: 10
        },
        baseSquare: {
            width: 92,
            height: 98,
            backgroundColor: color,
            opacity: 0.4,
            position: 'relative',
            borderRadius: 14
        },
        secundSequare: {
            position: 'absolute',
            width: 92,
            height: 54,
            backgroundColor: color,
            top: 60,
            left: 10,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center"
        },
        text: {
            fontSize: 10,
            fontWeight: "bold",
            color: "white"
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.baseSquare}></View>
            <View style={styles.secundSequare}>
                <NormalFever />
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.text}>{subText}</Text>
            </View>
        </View>
    )
}

