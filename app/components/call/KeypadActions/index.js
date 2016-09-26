import React, { Component, PropTypes } from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native'

import Keypad from '../Keypad';
import KeypadInputText from '../KeypadInputText';

import sk from '../Keypad/styles';
import s from '../KeypadWithActions/styles';

export default class KeypadActions extends Component {
    renderActionKey(type, description, callback) {
        let icon = null;

        switch (type) {
            case 'fax':
                icon = require('../../../assets/images/keypad/fax-icon.png');
                break;
            case 'call':
                icon = require('../../../assets/images/keypad/call-icon.png');
                break;
            case 'message':
                icon = require('../../../assets/images/keypad/message-icon.png');
                break;
        }

        if (!this.props.size) {
            return (
                <View key={"action" + type} style={{flex: 0.202}} />
            )
        }

        let touchableStyles = [{
            width: this.state.actionSize - 10,
            height: this.state.actionSize - 10
        }, s.actionTouchable];

        if (type == 'call') {
            touchableStyles.push(s.actionGreenTouchable);
        }

        return (
            <View key={"action" + type} style={s.action}>
                <TouchableOpacity onPress={() => {callback && callback(this.state.value)}} style={touchableStyles}>
                    <Image source={icon} />
                </TouchableOpacity>
                <Text style={s.actionText}>{description}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={[this.props.style, {flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}]}>
                {this.renderActionKey("message", "Attendant transfer")}
                {this.renderActionKey("fax", "Blind transfer")}
            </View>
        )
    }
}

KeypadActions.propTypes = {
    style: View.propTypes.style,
    size: PropTypes.number
}