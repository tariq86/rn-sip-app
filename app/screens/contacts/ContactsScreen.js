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

class ContactsScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title="Contacts" />
                <Text>I'll be back</Text>
            </View>
        );
    }

}

ContactsScreen.props = {

}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {

    };
}

export default connect(select, actions)(ContactsScreen);