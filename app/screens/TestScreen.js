'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet,
    PixelRatio,
    TextInput,
    TabBarIOS,
    Dimensions
} from 'react-native'
import * as Calls from '../modules/calls'
import * as Navigation from '../modules/navigation'

import {connect} from 'react-redux'


class TestScreen extends Component {
    constructor(props) {
        super(props);
        this._makeCall = this.makeCall.bind(this);
    }

    makeCall() {
        this.props.onCallPress && this.props.onCallPress();
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight onPress={this._makeCall} style={{borderRadius: 3, backgroundColor:"#CCC", padding: 10, paddingLeft: 20, paddingRight: 20}}>
                    <Text>Make call</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

TestScreen.props = {

}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onCallPress: () => {
            dispatch(Calls.makeCall("1000"));
        }
    };
}

export default connect(select, actions)(TestScreen);