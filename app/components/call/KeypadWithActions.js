'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    PixelRatio,
    TabBarIOS,
    Dimensions
} from 'react-native'
import {correctFontSizeForScreen} from '../../utils/scale';
import Keypad from './Keypad';
import KeypadInputText from './KeypadInputText';

import sk from '../../styles/components/call/KeypadStyles';
import s from '../../styles/components/call/KeypadWithActions';

export default class KeypadWithActions extends Component {

    constructor(props) {
        super(props);

        let {height, width} = Dimensions.get('window');
        let ratio = height / width;

        this.state = {
            value: '',
            actionSize: false,
            heightRatio: ratio * ratio
        };

        this._onClearPress = this.onClearPress.bind(this);
        this._onBackspacePress = this.onBackspacePress.bind(this);
        this._onKeyPress = this.onKeyPress.bind(this);
        this._onDefineKeySize = this.onDefineKeySize.bind(this);
    }


    onBackspacePress() {
        this.setState({
            value: this.state.value.substr(0, this.state.value.length - 1)
        })
    }

    onClearPress() {
        this.setState({
            value: ''
        });
    }

    onKeyPress(key) {

        console.log("onKeyPress", key);

        this.setState({
            value: this.state.value + key
        });
    }

    onActionPress(type) {
        console.log("Action", type);
    }

    onDefineKeySize({width}) {
        this.setState({actionSize: width});
    }

    renderActionKey(type, description) {
        let icon = null;

        switch (type) {
            case 'fax':
                icon = require('../../assets/images/keypad/fax-icon.png');
                break;
            case 'call':
                icon = require('../../assets/images/keypad/call-icon.png');
                break;
            case 'message':
                icon = require('../../assets/images/keypad/message-icon.png');
                break;
        }

        if (!this.state.actionSize) {
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
                <TouchableOpacity onPress={this.onActionPress.bind(this, type)} style={touchableStyles}>
                    <Image source={icon} />
                </TouchableOpacity>
                <Text style={s.actionText}>{description}</Text>
            </View>
        )
    }

    render() {
        return (
             <View style={this.props.style}>
                 <KeypadInputText style={{flex: 0.08 * this.state.heightRatio}}
                                  value={this.state.value}
                                  onBackspacePress={this._onBackspacePress}
                                  onClearPress={this._onClearPress}  />
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
                 <Keypad style={{flex: 0.75}}
                         onKeyPress={this._onKeyPress}
                         onDefineKeySize={this._onDefineKeySize} />
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
                 <View style={s.actionsWrapper}>
                     <View style={sk.outerLineOffset} />
                     {this.renderActionKey("message", "Отправить\nСМС")}
                     <View style={sk.innerLineOffset} />
                     {this.renderActionKey("call", "Совершить\nзвонок")}
                     <View style={sk.innerLineOffset} />
                     {this.renderActionKey("fax", "Отправить\nфакс")}
                     <View style={sk.outerLineOffset} />
                 </View>
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
            </View>
        )
    }
}


KeypadWithActions.propTypes = {
    style: View.propTypes.style
}