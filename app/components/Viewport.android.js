'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet,
    DrawerLayoutAndroid
} from 'react-native'

import {connect} from 'react-redux'

import Header from './Header'
import * as Navigation from '../modules/navigation'

import ConversationsScreen from '../screens/conversations/ConversationsScreen'
import ContactsScreen from '../screens/contacts/ContactsScreen'
import DialerScreen from '../screens/dialer/DialerScreen'
import HistoryScreen from '../screens/history/HistoryScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

class Viewport extends React.Component {


    renderNavigationView() {
        return (
            <View>
                <Text>
                    Navigation view
                </Text>
            </View>
        )
    }

    renderContent() {
        switch (this.props.tab) {
            case 'conversations':
                return <ConversationsScreen />;
            case 'contacts':
                return <ContactsScreen />;
            case 'history':
                return <HistoryScreen />;
            case 'settings':
                return <SettingsScreen />;
        }

        throw new Error(`Unknown tab ${this.props.tab}`);
    }

    render() {
        setTimeout(() => {
            this._drawer.openDrawer();
        }, 3000)

        return (
            <DrawerLayoutAndroid ref={(drawer) => { this._drawer = drawer; }} renderNavigationView={this.renderNavigationView}>
                <View key={this.props.tab}>
                    {this.renderContent()}
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

Viewport.props = {
    navigator: PropTypes.object
}

function select(store) {
    return {
        tab: store.navigation.current.name
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => {
            if (tab == 'dialer') {
                dispatch(Navigation.goTo({name: tab}))
            } else {
                dispatch(Navigation.goAndReplace({name: tab}))
            }
        }
    };
}

export default connect(select, actions)(Viewport);