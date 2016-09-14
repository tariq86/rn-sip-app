'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

export default class CallAction extends Component {

    render() {

        let icon = null;
        let toggle = false;

        switch (this.props.type) {
            case 'chat':
                icon = require('../../assets/images/call/action-chat.png');
                break;
            case 'add':
                icon = require('../../assets/images/call/action-add.png');
                break;
            case 'earpiece':
                icon = require('../../assets/images/call/action-speaker.png');
                break;
            case 'speaker':
                icon = require('../../assets/images/call/action-speaker-active.png');
                toggle = true;
                break;
            case 'merge':
                icon = require('../../assets/images/call/action-merge.png');
                break;
            case 'dtmf':
                icon = require('../../assets/images/call/action-dtmf.png');
                break;
            case 'mute':
                icon = require('../../assets/images/call/action-mute.png');
                break;
            case 'unmute':
                icon = require('../../assets/images/call/action-mute-active.png');
                toggle = true;
                break;
            case 'hold':
                icon = require('../../assets/images/call/action-hold.png');
                break;
            case 'unhold':
                icon = require('../../assets/images/call/action-hold-active.png');
                toggle = true;
                break;
            case 'park':
                icon = require('../../assets/images/call/action-park.png');
                break;
            case 'transfer':
                icon = require('../../assets/images/call/action-transfer.png');
                break;
            case 'record':
                icon = require('../../assets/images/call/action-record.png');
                break;
        }

        let buttonStyle = {height: 64, width: 64, borderRadius: 64, borderWidth: 1, justifyContent: 'center', alignItems: 'center'};

        if (toggle) {
            buttonStyle = {...buttonStyle, borderColor: '#FFF', backgroundColor: "#FFF"}
        } else {
            buttonStyle = {...buttonStyle, borderColor: 'rgba(255, 255, 255, 1)'}
        }

        return (
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={buttonStyle} onPress={this.props.onPress}>
                    <Image resizeMode="contain" style={{height: 28, width: 28}} source={icon}/>
                </TouchableOpacity>
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
