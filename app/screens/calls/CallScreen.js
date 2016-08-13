'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet,
    TabBarIOS
} from 'react-native'

import {connect} from 'react-redux'

class CallScreen extends Component {
    render() {
        return (
            <View style={{padding: 20, flex: 1}}>
                <Text>Call Screen</Text>
            </View>
        )
    }
}

CallScreen.props = {

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});


function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {

    };
}

export default connect(select, actions)(CallScreen);