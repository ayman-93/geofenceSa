// import react from 'react';
import { View } from "react-native";
import styles from '../style';

export default MessageBubble = ({ direction, text }) => {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = direction === 'left' ? null : <View style={{ width: 70 }} />;
    var rightSpacer = direction === 'left' ? <View style={{ width: 70 }} /> : null;

    var bubbleStyles = direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            {leftSpacer}
            <View style={bubbleStyles}>
                <Text style={bubbleTextStyle}>
                    {text}
                </Text>
            </View>
            {rightSpacer}
        </View>
    );
}
