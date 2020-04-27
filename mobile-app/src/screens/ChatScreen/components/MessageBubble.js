import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import styles from '../style';

export default MessageBubble = ({ direction, text }) => {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    // let leftSpacer = direction === 'left' ? null : <View style={{ width: 70 }} />;
    // let rightSpacer = direction === 'left' ? <View style={{ width: 70 }} /> : null;

    // let bubbleStyles = direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    // let bubbleTextStyle = direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: direction === 'left' ? "flex-start" : "flex-end",
            marginBottom: 5,
        },
        sender: {
            fontSize: 18,
            fontWeight: "bold"
        }
    })
    return (
        // <View>
        // {/* {leftSpacer} */}
        <View style={styles.container}>
            <Text style={styles.sender}>
                {direction === "left" ? "Agent" : "Me"}
            </Text>
            <Text>
                {text}
            </Text>
        </View>
        // {/* {rightSpacer} */}
        // </View>
    );
}
