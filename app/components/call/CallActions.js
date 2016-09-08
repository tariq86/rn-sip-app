'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

// import s from '../../styles/components/call/KeypadInputTextStyles';

export default class CallActions extends Component {

    render() {


    }
}

CallActions.propTypes = {
    style: View.propTypes.style,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func
}