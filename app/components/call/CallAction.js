'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

// import s from '../../styles/components/call/KeypadInputTextStyles';

export default class CallAction extends Component {

    render() {

        let icon = null;

        switch (this.props.type) {
            case 'chat':
                icon = require('../../assets/images/call/action-chat.png');
                break;
            case 'speaker':
                icon = require('../../assets/images/call/action-speaker.png');
                break;
            case 'merge':
                icon = require('../../assets/images/call/action-merge.png');
                break;
            case 'mute':
                icon = require('../../assets/images/call/action-mute.png');
                break;
            case 'hold': // TODO: Icon for hold action
            case 'park':
                icon = require('../../assets/images/call/action-park.png');
                break;
            case 'transfer':
                icon = require('../../assets/images/call/action-transfer.png');
                break;
        }

        return (
            <View style={{alignItems: 'center'}}>
                <View style={{height: 64, width: 64, borderRadius: 64, borderWidth: 1, borderColor: 'rgba(157, 218, 220, 0.7)', justifyContent: 'center', alignItems: 'center'}}>
                    <Image resizeMode="contain" style={{height: 28, width: 28}} source={icon} />
                </View>
                <Text style={{paddingTop: 5, color: "#FFF"}}>{this.props.description}</Text>
            </View>
        )

    }
}

CallAction.propTypes = {
    style: View.propTypes.style,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func
}