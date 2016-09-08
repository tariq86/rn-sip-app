'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

// import s from '../../styles/components/call/KeypadInputTextStyles';

export default class CallInfo extends Component {

    render() {
        let call = this.props.call;
        let items = null;

        if (call.getRemoteName() && call.getRemoteNumber()) {
            items = [
                (<Text key="top" style={{fontSize: 28, color: "#FFF"}}>{call.getRemoteName()}</Text>),
                (<Text key="bot" style={{fontSize: 16, color: "#FFF"}}>{call.getRemoteNumber()}</Text>)
            ]
        } else if (call.getRemoteNumber()) {
            items = [
                (<Text key="top" style={{fontSize: 28, color: "#FFF"}}>{call.getRemoteNumber()}</Text>)
            ]
        } else {
            items = [
                (<Text key="top" style={{fontSize: 28, color: "#FFF", marginLeft: 20, marginRight: 20}} numberOfLines={1} ellipsizeMode="middle">{call.getRemoteUri()}</Text>)
            ]
        }

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {items}
            </View>
        )
    }
}

CallInfo.propTypes = {
    call: PropTypes.object.isRequired,
    style: View.propTypes.style,
    onBackspacePress: PropTypes.func,
    onClearPress: PropTypes.func
}