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
        }, s.actionTouchable, this.props.actionTouchableStyle];

        if (type == 'call') {
            touchableStyles.push(s.actionGreenTouchable);
        }

        return (
            <View key={"action" + type} style={s.action}>
                <TouchableOpacity onPress={() => {callback && callback(this.state.value)}} style={touchableStyles}>
                    <Image source={icon} />
                </TouchableOpacity>
                <Text style={[s.actionText, this.props.actionTextStyle]}>{description}</Text>
            </View>
        )
    }

    render() {

        let actions = [];

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
                 <KeypadInputText style={[{flex: 0.08 * this.state.heightRatio}, this.props.inputStyle]}
                                  textStyle={this.props.inputTextStyle}
                                  value={this.state.value}
                                  onBackspacePress={this._onBackspacePress}
                                  onClearPress={this._onClearPress}  />
                 <View style={{flex: 0.02 * this.state.heightRatio}} />
                 <Keypad style={[{flex: 0.75}, this.props.keypadStyle]}
                         keyStyle={this.props.keyStyle}
                         keyUnderlayColor={this.props.keyUnderlayColor}
                         keyTextStyle={this.props.keyTextStyle}
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


// TODO: Add theme parameter instead of inputStyle, inputTextStyle, keypadStyle, keyStyle, keyTextStyle, keyTextStyle, actionTextStyle
KeypadWithActions.propTypes = {
    style: View.propTypes.style,
    actions: PropTypes.array,
    inputStyle: View.propTypes.style,
    inputTextStyle: Text.propTypes.style,
    keypadStyle: View.propTypes.style,
    keyStyle: View.propTypes.style,
    keyTextStyle: Text.propTypes.style,
    keyUnderlayColor: PropTypes.string,
    actionTouchableStyle: View.propTypes.style,
    actionTextStyle: Text.propTypes.style
}