import React, { Component, PropTypes } from 'react';
import {View, Text} from 'react-native'

import s from './styles';

export default class CallAvatar extends Component {
    render() {
        let size = this.props.size - 20;

        return (
            <View style={[s.circle, {borderRadius: size, height: size, width: size}]}>
                <Text style={s.abbr}>Avatar</Text>
            </View>
        )
    }
}

CallAvatar.propTypes = {
    call: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired
}
