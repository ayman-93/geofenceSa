import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Image } from 'react-native';

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

        await postData('http://192.168.0.155:3001/users/login', { nationalId, password })
            .then(async (data) => {
                if (data.succeed) {
                    try {
                        console.log("user set to Storage");
                        await AsyncStorage.setItem('User', JSON.stringify(data));
                    } catch (error) {
                        //  Error saving data
                    }
                    route.params?.getUser(data.user);
                } else {
                    setErrorMsg("wrong credentials")
                }
            })
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/images/siajlabs-logo-2-AR.png')} style={styles.imgLogo} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="User Id..."
                    placeholderTextColor="#fff"
                    onChangeText={text => setnationalId(text)} />
                <Text style={styles.error}>{errorMsg}</Text>
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#fff"
                    onChangeText={text => setPassword(text)} />
                <Text style={styles.error}>{errorMsg}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 50
    },
    inputView: {
        width: "80%",
        backgroundColor: "#808080",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "#fff",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "#2d2d2d"
    },
    imgLogo: {
        resizeMode: "contain",
        height: 200,
        width: 200
    }
});