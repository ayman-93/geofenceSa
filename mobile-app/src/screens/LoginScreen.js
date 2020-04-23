import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';


export default LoginScreen = ({ navigation, route }) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {

        // await fetch('api/login', {
        //      method: 'POST',
        //      body: JSON.stringify(data)
        // }).then((res) => res.json())
        // .then((data) => {
        //      try {
        //          await AsyncStorage.setItem('User', JSON.stringify(data));
        //      } catch (error) {
        //          Error saving data
        //      }
        //      navigation.navigate('Home')
        // })

        setTimeout(() => {
            const user = JSON.parse('{"userId":"ayman","homeLocation":{"latitude":24.702262,"longitude":46.824737}, "radiusInMeter": 500 }');
            route.params?.getUser(user);
            // AsyncStorage.setItem('User', '{ "userId": "ayman",  }');
            // navigation.navigate('Home')
        }, 1000)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>SiajLab</Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="User Id..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setUserId(text)} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)} />
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
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
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
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});