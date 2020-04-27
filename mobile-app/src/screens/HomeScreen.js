import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import locationService from '../utils/locationServeis';

import MenuIcon from '../assets/images/menu.svg';
import Surface from '../assets/images/surface2.svg';
import Chat from '../assets/images/message.svg';
import NotificationIcon from '../assets/images/notification.svg'
import CountDistance from '../utils/CountDistance';
import TemperSquare from '../components/TemperSquare'
import NormalFever from '../assets/images/NormalFever.svg'
import MediumFever from '../assets/images/MediumFever.svg'
import HighFever from '../assets/images/HighFever.svg'
import LongNormalFever from '../assets/images/LongNormalFever.svg'

const patchData = async (url = '', data = {}) => {
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
    patchData(`http://18.184.129.69/siaj-api/users/${userId}/violations`, { violations: { type: violationType } })
        // .then((res) => res.json())
        .then((data) => console.log("violation added data::", data))
}

const addTemperatureRecord = (userId, temperature) => {
    console.log("tring to add temperature ", temperature, "for user ", userId);

    patchData(`http://18.184.129.69/siaj-api/users/${userId}/temperature`, { userTemperature: { temperature } })
        .then((data) => console.log("temperature added ", data))
        .catch(err => console.log(err))
}


export default HomeScreen = ({ navigation, route }) => {
    const [distancet, setDistance] = useState(0);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [user, setUser] = useState({});
    const [instruction, setInstruction] = useState("");
    const [_notificationSent, setNotificationSent] = useState();

    const getUser = async () => {
        let userr = await AsyncStorage.getItem('user');
        userr = JSON.parse(userr);
        setUser(userr);
    }

    const getInstrucions = async () => {
        fetch("http://18.184.129.69/siaj-api/instructions")
            .then(res => res.json())
            .then(({ instructions }) => setInstruction(instructions[instructions.length - 1].text))
            .catch(err => console.log(err))
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
        getUser();
        getInstrucions();
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
            {/* <ImageBackground source={require('../assets/images/backgroundTest.jpg')} style={styles.image}> */}
            <Text style={styles.title}>Home</Text>
            <View style={styles.screenIcon}>
                <MenuIcon />
                <NotificationIcon />
            </View>
            <View style={styles.card}>
                <View style={styles.cardHrader}>
                    <Text style={styles.cardTitle}>Latest News</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('InstructionsSceen');
                    }} style={{ flexDirection: "row" }}><Text style={styles.cardMoreBtn}>more{" "}</Text><View style={{ marginTop: 6 }}><Surface /></View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.cardText}>{instruction}</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHrader}>
                    <Text style={styles.cardTitle}>Current Temperature</Text>
                    <TouchableOpacity style={{ flexDirection: "row" }}><Text style={styles.cardMoreBtn}>Input{" "}</Text><View style={{ marginTop: 6 }}><Surface /></View>
                    </TouchableOpacity>
                </View>
                <View style={styles.longCard}>
                    <LongNormalFever width="100%" />
                </View>
                <View style={styles.cardHrader}>
                    <Text style={styles.cardTitle}>Latest Temperature</Text>
                    <TouchableOpacity style={{ flexDirection: "row" }}><Text style={styles.cardMoreBtn}>Previous{" "}</Text><View style={{ marginTop: 6 }}><Surface /></View>
                    </TouchableOpacity>
                </View>
                <View style={styles.nestedCard}>
                    <TouchableOpacity onPress={() => addTemperatureRecord(user._id, "40°")}>
                        {/* <TemperSquare color="#FF7442" text="High Fever" subText="40°" /> */}
                        <View style={styles.tempIcon}>
                            <HighFever />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addTemperatureRecord(user._id, "38.7°")}>
                        {/* <TemperSquare color="#FACB39" text="Medium Fever" subText="38.7°" /> */}
                        <View style={styles.tempIcon}>
                            <MediumFever />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addTemperatureRecord(user._id, "37.3°")}>
                        <View style={styles.tempIcon}>
                            <NormalFever />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.chatIcon} onPress={() => navigation.navigate('Chat')}>
                <Chat />
            </TouchableOpacity>
            {/* <Text>User Id: {route.params?.user._id}</Text>
            {location.latitude !== 0 ?
                <Text>User Location: {JSON.stringify(location)}</Text> : null}
            <Text>Distance from home: {distancet}</Text>
            <Button
                title="Instructions"
                onPress={() => {
                    navigation.navigate('InstructionsSceen');
                }}
            /> */}
            {/* <Button
                onPress={() => navigation.navigate('MyModal')}
                title="Open Modal"
            /> */}
            {/* <Button
                onPress={() => navigation.navigate('Chat')}
                title="Chat"
            /> */}
            {/* </ImageBackground> */}
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
        marginTop: 30,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#EAF7F2"
    },
    longCard: {
        flexDirection: "row",
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#09D189"
    },
    screenIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%"
    },
    card: {
        marginTop: 30,
        width: "100%",
        alignItems: "center",
    },
    cardHrader: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1
    },
    cardMoreBtn: {
        color: "#09D189"
    },
    cardBody: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 15,
        padding: 10
    },
    cardText: {
        textAlign: "right",
        fontSize: 15
    },
    nestedCard: {
        flexDirection: "row",
        // justifyContent: ""
    },
    chatIcon: {
        position: "absolute",
        bottom: 20,
        right: 20
    },
    tempIcon: {
        margin: 15
    }
})