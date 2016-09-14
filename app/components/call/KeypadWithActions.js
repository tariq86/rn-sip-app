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
        this.setState({
            value: this.state.value + key
        });
    }

    onDefineKeySize({width}) {
        this.setState({actionSize: width});
    }

    renderActionKey(type, description, callback) {
        let icon = null;
        let actionTouchableStyle = this.props.theme == "dark" ? { backgroundColor:"#59696f" } : null;
        let actionTextStyle = this.props.theme == "dark" ? {color:"#FFF"} : null;

        // TODO: Pass image instead of type.
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
            case 'redirect':
                icon = require('../../assets/images/call/action-redirect.png');
                break;
            case 'attendant-transfer':
                icon = require('../../assets/images/call/action-attendant-transfer-icon.png');
                break;
            case 'blind-transfer':
                icon = require('../../assets/images/call/action-blind-transfer.png');
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
        }, s.actionTouchable, actionTouchableStyle];

        if (type == 'call') {
            touchableStyles.push(s.actionGreenTouchable);
        }

        return (
            <View key={"action" + type} style={s.action}>
                <TouchableOpacity onPress={() => {callback && callback(this.state.value)}} style={touchableStyles}>
                    <Image source={icon} />
                </TouchableOpacity>
                <Text style={[s.actionText, actionTextStyle]}>{description}</Text>
            </View>
        )
    }

    render() {
        // TODO: Move all styles into KeypadStyles.js

        console.log("this.props.theme", this.props.theme);

        let actions = [];
        let inputStyle = this.props.theme == "dark" ? {backgroundColor:"#3c4b51"} : null;
        let inputTextStyle = this.props.theme == "dark" ? {color:"#FFF"} : null;
        let keyUnderlayColor = this.props.theme == "dark" ? "#566971" : null;
        let keyTextStyle = this.props.theme == "dark" ? {color:"#FFF"} : null;

        if (this.props.actions.length == 3) {
            let a = this.props.actions;
            actions.push(<View style={sk.outerLineOffset} />);
            actions.push(this.renderActionKey(a[0]['icon'], a[0]['text'], a[0]['callback']));
            actions.push(<View style={sk.innerLineOffset} />);
            actions.push(this.renderActionKey(a[1]['icon'], a[1]['text'], a[1]['callback']));
            actions.push(<View style={sk.innerLineOffset} />);
            actions.push(this.renderActionKey(a[2]['icon'], a[2]['text'], a[2]['callback']));
            actions.push(<View style={sk.outerLineOffset} />);
        } else {
            for (let action of this.props.actions) {
                actions.push(this.renderActionKey(action['icon'], action['text'], action['callback']));
            }
        }

        return (
             <View style={this.props.style}>
                 <KeypadInputText style={[{flex: 0.08 * this.state.heightRatio}, inputStyle]}
                                  textStyle={inputTextStyle}
                                  value={this.state.value}
                                  onBackspacePress={this._onBackspacePress}
                                  onClearPress={this._onClearPress}  />
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
                 <Keypad style={{flex: 0.75}}
                         keyUnderlayColor={keyUnderlayColor}
                         keyTextStyle={keyTextStyle}
                         onKeyPress={this._onKeyPress}
                         onDefineKeySize={this._onDefineKeySize} />
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
                 <View style={s.actionsWrapper}>
                     {actions}
                 </View>
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
            </View>
        )
    }
}

KeypadWithActions.propTypes = {
    style: View.propTypes.style,
    actions: PropTypes.array,
    theme: PropTypes.string
}