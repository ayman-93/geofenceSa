import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';





export default HomeScreen = ({ navigation, route }) => {
    const [count, setCount] = useState(0);
    const [location, setLocation] = useState({});
    const [error, setError] = "";


    const _getLocationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)

        if (status !== 'granted') {
            console.log("Location Permission Denied.");
            setError("Location Permission Denied.")
        }

        const userLocation = await Location.getCurrentPositionAsync();
        setLocation(userLocation)
    }



    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ display: 'none' }}>
                    <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                    <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                </View>
            ),
        });
    }, [navigation, setCount]);

    useEffect(() => {
        _getLocationPermission()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>User: {route.params?.user.userId}</Text>
            {location &&
                <Text>User Location: {JSON.stringify(location)}</Text>}
            <Button
                title="Go to Details"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details', {
                        itemId: 86,
                        homeScreenCounter: count,
                    });
                }}
            />
            <Button
                onPress={() => navigation.navigate('MyModal')}
                title="Open Modal"
            />
            <Button
                onPress={() => navigation.navigate('Chat')}
                title="Chat"
            />
            <Button
                onPress={() => {
                    console.log(route.params?.user)
                }}
                title="log user"
            />
        </View>
    );
}
