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
            <TabBarIOS tintColor="#032250">
                <TabBarIOS.Item
                    title="Conversations"
                    selected={this.props.tab === 'conversations'}
                    onPress={this.onTabSelect.bind(this, 'conversations')}
                    icon={require('../assets/images/schedule-icon-1.png')}
                    selectedIcon={require('../assets/images/schedule-icon-1-active.png')}>

                    <ConversationsScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Contacts"
                    selected={this.props.tab === 'contacts'}
                    onPress={this.onTabSelect.bind(this, 'contacts')}
                    icon={require('../assets/images/my-schedule-icon.png')}
                    selectedIcon={require('../assets/images/my-schedule-icon-active.png')}>

                    <ContactsScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Keypad"
                    selected={this.props.tab === 'dialer'}
                    onPress={this.onTabSelect.bind(this, 'dialer')}
                    icon={require('../assets/images/maps-icon.png')}
                    selectedIcon={require('../assets/images/maps-icon-active.png')}>

                    <DialerScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="History"
                    selected={this.props.tab === 'history'}
                    onPress={this.onTabSelect.bind(this, 'history')}
                    icon={require('../assets/images/notifications-icon.png')}
                    selectedIcon={require('../assets/images/notifications-icon-active.png')}>

                    <HistoryScreen />

                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Settings"
                    selected={this.props.tab === 'settings'}
                    onPress={this.onTabSelect.bind(this, 'settings')}
                    icon={require('../assets/images/info-icon.png')}
                    selectedIcon={require('../assets/images/info-icon-active.png')}>

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