import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Image, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import EnLogo from '../assets/images/siajlabs-logo-EN.svg';
import Surface from '../assets/images/surface1.svg';
import Background from '../assets/images/background.png';

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export default LoginScreen = ({ navigation, route }) => {
    const [nationalId, setnationalId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async () => {

        await postData('http://18.184.129.69/siaj-api/users/login', { nationalId, password })
            .then(async (data) => {
                if (data.succeed) {
                    try {
                        console.log("user set to Storage");
                        await AsyncStorage.setItem('User', JSON.stringify(data));
                    } catch (error) {
                        //  Error saving data
                        console.log("login err", error);

                    }
                    route.params?.getUser(data.user);
                } else {
                    setErrorMsg("wrong credentials")
                }
            })
    }
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior="padding"
        >
            {/* <ImageBackground source={Background} style={{ flex: 1,
    resizeMode: "cover",
    justifyContent: "center" }} > */}
            <View style={styles.header}>
                <ImageBackground source={Background} style={styles.Background}>
                    <View style={styles.headerContainer}>
                        <EnLogo width={170} height={170} />
                        <Text style={styles.headerText}>Welcome Back</Text>
                    </View>
                </ImageBackground>
            </View>
            {/* </ImageBackground> */}
            <Text style={styles.screenTitle}>Sign in</Text>
            <View
                style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="National Id..."
                        placeholderTextColor="#09D189"
                        onChangeText={text => setnationalId(text)} />
                    <Text style={styles.error}>{errorMsg}</Text>
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#09D189"
                        onChangeText={text => setPassword(text)} />
                    <Text style={styles.error}>{errorMsg}</Text>
                </View>
                {/* <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity> */}
                <LinearGradient colors={["#09D189", "#9F2FFF"]} location={[0, 1]} start={[1, 0]}
                    end={[0, 1]} style={styles.loginBtn}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.loginText}>Sign in{" "} <Surface width={25} height={15} /></Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#EAF7F2"
    },
    Background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        overflow: 'hidden',

        borderBottomStartRadius: 30,
        borderBottomRightRadius: 30,
    },
    header: {
        // alignSelf: "center",
        width: "100%",
        height: "45%",
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2D2D2D",
        // borderTopStartRadius: 25,
        // borderTopEndRadius: 25,
        borderBottomStartRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 15
    },
    headerContainer: {
        alignItems: "center"
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    screenTitle: {
        color: "#474747",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 25,
        marginBottom: 25
    },
    container: {
        // flex: 1,
        // backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        // marginBottom: 10
    },
    inputView: {
        width: "80%",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#09D189",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        fontSize: 18
    },
    forgot: {
        color: "#fff",
        fontSize: 11
    },
    loginBtn: {
        marginTop: 10,
        width: "50%",
        borderRadius: 25,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    imgLogo: {
        resizeMode: "contain",
        height: 200,
        width: 200
    }
});