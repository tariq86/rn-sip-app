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

    renderActiveCalls() {
        let calls = this.props.calls.toList();
        let result = [];

        for (let call of calls) {
            result.push(
                (
                    <TouchableHighlight key={call.getId()} style={{height: 38, backgroundColor: "#4cda64", alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.onCallSelect(call)}>
                        <Text style={{color: "#FFF", fontSize: 14, paddingLeft: 10}}>{call.getRemoteUri()}</Text>
                    </TouchableHighlight>
                )
            )
        }

        return result;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderActiveCalls()}

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableHighlight onPress={this._makeCall} style={{borderRadius: 3, backgroundColor:"#CCC", padding: 10, paddingLeft: 20, paddingRight: 20}}>
                        <Text>Make call</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

TestScreen.props = {

}

function select(store) {
    return {
        calls: store.calls.map
    };
}

function actions(dispatch) {
    return {
        onCallPress: () => {
            dispatch(Calls.makeCall("1000"));
        },
        onCallSelect: (call) => {
            dispatch(Navigation.goTo({name: 'call', call}));
        },
    };
}

export default connect(select, actions)(TestScreen);