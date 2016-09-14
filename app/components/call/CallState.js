'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image
} from 'react-native'

// import s from '../../styles/components/call/KeypadInputTextStyles';

export default class CallState extends Component {

    constructor(props) {
        super(props);

        let timer = setInterval(() => {this.onTick()}, 1000);

        this.state = {
            timer: timer
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    onTick() {
        if (this.props.call.getState() == "PJSIP_INV_STATE_CONFIRMED") {
            this.refs.status.setNativeProps({ text: this.props.call.getFormattedConnectDuration() });
        }
    }

    render() {
        let call = this.props.call;
        let description = null;

        console.log("connectDuration", call.getConnectDuration(), call.getFormattedConnectDuration());

        // TODO: Show error if last status text is not empty.
        // TODO: Show reason if call wasn't answered.

        switch (call.getState()) {
            case 'PJSIP_INV_STATE_NULL':
                description = "initializing";
                break;
            case 'PJSIP_INV_STATE_CALLING':
            case 'PJSIP_INV_STATE_EARLY':
            case 'PJSIP_INV_STATE_CONNECTING':
                description = "ringing";
                break;
            case 'PJSIP_INV_STATE_INCOMING':
                description = "calling";
                break;
            default:
                description = call.getFormattedConnectDuration();
                break;
        }

        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TextInput ref="status" underlineColorAndroid="transparent" numberOfLines={1} editable={false} style={{textAlign: 'center', flex: 1, fontSize: 16, color: "#FFF", padding: 0, margin: 0}} value={description} />
            </View>
        )

    }
}

CallState.propTypes = {
    style: View.propTypes.style,
    call: PropTypes.object.isRequired,
    onBackspacePress: PropTypes.func,
    onClearPress: PropTypes.func
}