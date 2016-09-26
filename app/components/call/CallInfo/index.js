import React, { Component, PropTypes } from 'react';
import {View, Text} from 'react-native'
import s from './styles'

export default class CallInfo extends Component {

    render() {
        let call = this.props.call;
        let items = null;

        if (call.getRemoteName() && call.getRemoteNumber()) {
            items = [
                (<Text key="top" style={s.remoteNameText} numberOfLines={1} ellipsizeMode="middle">{call.getRemoteName()}</Text>),
                (<Text key="bot" style={s.remoteNumberText} numberOfLines={1} ellipsizeMode="middle">{call.getRemoteNumber()}</Text>)
            ]
        } else if (call.getRemoteNumber()) {
            items = [
                (<Text key="top" style={s.remoteNameText} numberOfLines={1} ellipsizeMode="middle">{call.getRemoteNumber()}</Text>)
            ]
        } else {
            items = [
                (<Text key="top" style={s.remoteNameText} numberOfLines={1} ellipsizeMode="middle">{call.getRemoteUri()}</Text>)
            ]
        }

        return (
            <View style={s.container}>
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