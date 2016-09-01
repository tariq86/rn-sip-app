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
import * as Navigation from '../../modules/navigation'

import Header from '../../components/Header'

class AccountScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Header title="Account" />
            </View>
        );
    }

}

AccountScreen.props = {

}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {

    };
}

export default connect(select, actions)(AccountScreen);