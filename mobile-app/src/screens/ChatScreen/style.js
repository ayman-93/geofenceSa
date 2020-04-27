import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({

    //ChatView

    outer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },

    messages: {
        flex: 1
    },

    //InputBar

    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 3,
    },

    textBox: {
        borderRadius: 25,
        // borderColor: 'gray',
        backgroundColor: '#fff',
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 10
    },

    sendButton: {
        position: "absolute",
        top: 15,
        right: 15
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingLeft: 15,
        // marginLeft: 5,
        // paddingRight: 15,
        // borderRadius: 5,
        // backgroundColor: '#66db30'
    },

    //MessageBubble

    messageBubble: {
        borderRadius: 5,
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        // flexDirection: 'row',
        // flex: 1,
        width: "70%"
    },

    messageBubbleLeft: {
        backgroundColor: '#d5d8d4',
    },

    messageBubbleTextLeft: {
        color: 'black'
    },

    messageBubbleRight: {
        backgroundColor: '#66db30'
    },

    messageBubbleTextRight: {
        right: 0,
        color: 'white'
    },
    container: {
        marginTop: 30,
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
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
    }
})