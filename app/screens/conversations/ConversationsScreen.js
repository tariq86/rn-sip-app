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

import Header from '../../components/Header'

class ConversationsScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title="Conversations" />
                <Text>I'll be back</Text>
            </View>
        );
    }

}

ConversationsScreen.props = {

}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {

    };
}

export default connect(select, actions)(ConversationsScreen);