'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

import s from '../../styles/components/call/KeypadInputTextStyles';

export default class KeypadInputText extends Component {


    render() {
        return (
            <View style={[s.container, this.props.style]}>
                <Text numberOfLines={1} ellipsizeMode="head" style={[s.text, (this.props.editable === false ? s.textNotEditable : null), this.props.textStyle]}>{this.props.value}</Text>

                {
                    !this.props.value || this.props.value.length == 0 || this.props.editable === false ? null :
                    <TouchableOpacity onPress={this.props.onBackspacePress} onLongPress={this.props.onClearPress} style={s.clearTouchable}>
                        <Image source={require('../../assets/images/keypad/input-back.png')} />
                    </TouchableOpacity>
                }

            </View>
        )

    }
}

KeypadInputText.propTypes = {
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
    value: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    onBackspacePress: PropTypes.func,
    onClearPress: PropTypes.func
}