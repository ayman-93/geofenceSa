import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, Button, ImageBackground, AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import locationService from '../utils/locationServeis';

import CountDistance from '../utils/CountDistance';


const patchData = async (url = '', data = {}) => {
    console.log("dataffff ", data);

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const addVaiolation = (userId, violationType) => {
    patchData(`http://192.168.1.71:3001/users/${userId}/violations`, { "violations": { type: violationType } })
        .then((res) => res.json())
        .then((data) => console.log("violation added data::", data))
}



export default HomeScreen = ({ navigation, route }) => {
    const [distancet, setDistance] = useState(0);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [user, setUser] = useState({});
    const [_notificationSent, setNotificationSent] = useState();

    const getUser = async () => {
        let userr = await AsyncStorage.getItem('user');
        userr = JSON.parse(userr);
        setUser(userr);
    }


    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <View style={{ display: 'none' }}>
    //                 <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //                 <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    //             </View>
    //         ),
    //     });
    // }, [navigation, setCount]);

    useEffect(() => {
        getUser()
        locationService.subscribersDistance(setDistance);
        locationService.subNotificationSent(setNotificationSent);
        locationService.subscribe(setLocation);
        const _getLocationPermission = async () => {

            // ask for permissions.
            const { status } = await Permissions.askAsync(
                Permissions.LOCATION,
                Permissions.USER_FACING_NOTIFICATIONS
            )

            if (status !== 'granted') {
                // send violation.
                // const violation = { type: "Location not allowed" }
                // send vaiolation.
                addVaiolation(user._id, "Location not allowed")
                console.log("Location Permission Denied.");
                setLocation({ error: "Location Permission Denied." });
            };

            console.log("Get Location Permission: ", status);

            // start location task in the background.
            await Location.startLocationUpdatesAsync("background-location-task", { accuracy: Location.Accuracy.Highest })
        }
        _getLocationPermission();

        return () => {
            locationService.unsubscribe(setLocation)
        }
    }, [])

    return (

        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/backgroundTest.jpg')} style={styles.image}>

                <Text>Home Screen</Text>
                <Text>User Id: {route.params?.user._id}</Text>
                {location.latitude !== 0 ?
                    <Text>User Location: {JSON.stringify(location)}</Text> : null}
                <Text>Distance from home: {distancet}</Text>
                <Button
                    title="Instructions"
                    onPress={() => {
                        navigation.navigate('InstructionsSceen');
                    }}
                />
                {/* <Button
                onPress={() => navigation.navigate('MyModal')}
                title="Open Modal"
            /> */}
                <Button
                    onPress={() => navigation.navigate('Chat')}
                    title="Chat"
                />
            </ImageBackground>
        </View>
    );
}



TaskManager.defineTask("background-location-task", async ({ data, error }) => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    const isUserInHome = (newLocation) => {
        const Distance = CountDistance(newLocation, user.homeLocation, "M")
        console.log("Distance ", Distance);
        locationService.setDistance(Distance)

        if (Distance > user.radiusInMeter) {
            if (!locationService.getNotificationSent()) {
                // send vaiolation.
                addVaiolation(user._id, "Out of boundry")
                locationService.setNotificationSent(true);
                console.log("violation sent");
            }
            console.log("locationService.getNotificationSent ", locationService.getNotificationSent());

            console.log("user is out of his home");
        } else {
            console.log("User in home");
            locationService.setNotificationSent(false);
        }
    }

    if (error) {
        // Error occurred - check `error.message` for more details.
        // setLocation(JSON.stringify(locations))
        console.log("error", error);

        return;
    }
    if (data) {
        // do something with the locations captured in the background
        const { latitude, longitude } = data.locations[0].coords
        isUserInHome({ latitude, longitude })
        locationService.setLocation({
            latitude,
            longitude
        })
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    }
})