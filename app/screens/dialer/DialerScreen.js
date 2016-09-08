'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    PixelRatio,
    TabBarIOS,
    Dimensions
} from 'react-native'
import * as Navigation from '../../modules/navigation'
import {makeCall} from '../../modules/calls'

import Header from '../../components/Header'
import KeypadWithActions from '../../components/call/KeypadWithActions'

import {connect} from 'react-redux'

class DialerScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Header title="Набрать номер" />

                <KeypadWithActions onCallPress={this.props.onCallPress} style={{flex: 1}} />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 49.5 // TODO: Use it only for iOS version.
    }
});

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onCallPress: (destination) => {
            if (destination) {
                dispatch(makeCall(destination));
            }
        },
        onCancelPress: () => {
            dispatch(Navigation.goBack());
        }
    };
}

export default connect(select, actions)(DialerScreen);