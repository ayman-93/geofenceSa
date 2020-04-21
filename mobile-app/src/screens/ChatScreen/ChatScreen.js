import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from "react-native";

import MessageBubble from './components/MessageBubble';
import styles from './style';

export default ChatView = () => {
    const [messages, setMessages] = useState([]);
    const [inputBarText, setInputBarText] = useState("");
    const scrollViewControl = useRef(null);
    useEffect(() => {
        let loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac orci augue. Sed fringilla nec magna id hendrerit. Proin posuere, tortor ut dignissim consequat, ante nibh ultrices tellus, in facilisis nunc nibh rutrum nibh.';

        //create a set number of texts with random lengths. Also randomly put them on the right (user) or left (other person).
        const numberOfMessages = 20;
        const fackeMessages = [];
        for (let i = 0; i < numberOfMessages; i++) {
            let messageLength = getRandomInt(10, 120);

            let direction = getRandomInt(1, 2) === 1 ? 'right' : 'left';

            let newMessage = loremIpsum.substring(0, messageLength);

            fackeMessages.push({
                direction: direction,
                text: newMessage
            })
        }
        setMessages(fackeMessages);

        //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        setTimeout(function () {
            scrollViewControl.scrollToEnd();
        }.bind(this))

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        }
    }, [])






    //   ////
    // static navigationOptions = {
    //   title: 'Chat',
    // };



    //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
    //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
    const _keyboardDidShow = () => {
        scrollViewControl.scrollToEnd();
    }

    //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
    const _keyboardDidHide = () => {
        scrollViewControl.scrollToEnd();
    }

    //scroll to bottom when first showing the view
    // componentDidMount() {
    //   setTimeout(function() {
    //     scrollView.scrollToEnd();
    //   }.bind(this))
    // }

    //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but 
    //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
    // componentDidUpdate() {
    //   setTimeout(function() {
    //     scrollView.scrollToEnd();
    //   }.bind(this))
    // }
    useEffect(() => {
        scrollViewControl.scrollToEnd();
    }, messages)

    _sendMessage = () => {
        setMessages((prevMessages) => [...prevMessages, { direction: "right", text: inputBarText }])
        setInputBarText("");
        //   this.state.messages.push({direction: "right", text: this.state.inputBarText});
        //   this.setState({
        //     messages: this.state.messages,
        //     inputBarText: ''
        //   });
    }

    _onChangeInputBarText = (text) => {
        this.setState({
            inputBarText: text
        });
    }

    //This event fires way too often.
    //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
    //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
    //The real solution here is probably a fork of AutogrowInput that can provide this information.
    _onInputSizeChange = () => {
        //   setTimeout(function() {
        scrollViewControl.scrollToEnd({ animated: false });
        //   }.bind(this))
    }

    // render() {

    const viewMessages = [];

    messages.forEach(function (message, index) {
        viewMessages.push(
            <MessageBubble key={index} direction={message.direction} text={message.text} />
        );
    });

    return (
        <View style={styles.outer}>
            <ScrollView ref={scrollViewControl} style={styles.messages}>
                {viewMessages}
            </ScrollView>
            <InputBar onSendPressed={() => this._sendMessage()}
                onSizeChange={() => this._onInputSizeChange()}
                onChangeText={(text) => this._onChangeInputBarText(text)}
                text={this.state.inputBarText} />
            <KeyboardSpacer />
        </View>
    );
}
