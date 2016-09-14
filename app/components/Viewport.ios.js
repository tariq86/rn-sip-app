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

import Header from './Header'
import * as Navigation from '../modules/navigation'

import ConversationsScreen from '../screens/conversations/ConversationsScreen'
import ContactsScreen from '../screens/contacts/ContactsScreen'
import DialerScreen from '../screens/dialer/DialerScreen'
import HistoryScreen from '../screens/history/HistoryScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

class Viewport extends React.Component {

    onTabSelect(tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {
        return (
            <TabBarIOS tintColor="#3F5057" barTintColor="#f8f9fa" translucent={false}>
                <TabBarIOS.Item
                    title="Conversations"
                    selected={this.props.tab === 'conversations'}
                    onPress={this.onTabSelect.bind(this, 'conversations')}
                    onLayout={(event) => {}}
                    icon={require('../assets/images/toolbar/conversations-icon.png')}>

                    <ConversationsScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Contacts"
                    selected={this.props.tab === 'contacts'}
                    onPress={this.onTabSelect.bind(this, 'contacts')}
                    onLayout={(event) => {}}
                    icon={require('../assets/images/toolbar/contacts-icon.png')}>

                    <ContactsScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Keypad"
                    selected={this.props.tab === 'dialer'}
                    onPress={this.onTabSelect.bind(this, 'dialer')}
                    onLayout={(event) => {}}
                    icon={require('../assets/images/toolbar/call-icon.png')}>

                    <DialerScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="History"
                    selected={this.props.tab === 'history'}
                    onPress={this.onTabSelect.bind(this, 'history')}
                    onLayout={(event) => {}}
                    icon={require('../assets/images/toolbar/history-icon.png')}>

                    <HistoryScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Settings"
                    selected={this.props.tab === 'settings'}
                    onPress={this.onTabSelect.bind(this, 'settings')}
                    onLayout={(event) => {}}
                    icon={require('../assets/images/toolbar/settings-icon.png')}>

                    <SettingsScreen />

                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

}

Viewport.props = {
    onTabSelect: PropTypes.func,
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
            //if (tab == 'dialer') {
            //    dispatch(Navigation.goTo({name: tab}))
            //} else {
                dispatch(Navigation.goAndReplace({name: tab}))
            //}
        }
    };
}

export default connect(select, actions)(Viewport);