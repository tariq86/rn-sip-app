'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    Image,
    View,
    Text,
    Platform,
    StyleSheet,
    DrawerLayoutAndroid
} from 'react-native'

import {connect} from 'react-redux'
import {closeDrawer} from '../modules/navigation'

import Header from './Header'
import * as Navigation from '../modules/navigation'

import ConversationsScreen from '../screens/conversations/ConversationsScreen'
import ContactsScreen from '../screens/contacts/ContactsScreen'
import DialerScreen from '../screens/dialer/DialerScreen'
import HistoryScreen from '../screens/history/HistoryScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

class Viewport extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.drawer == "VISIBLE") {
            this._drawer.openDrawer();
        } else {
            this._drawer.closeDrawer();
        }
    }

    onTabSelect(tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        } else {
            this.props.onDrawerClose();
        }
    }

    renderNavigationView() {

        let selectedStyles = {

        }

        return (
            <View style={{flex: 1, flexDirection: 'column'}}>

                <View style={{flex: 0.3, backgroundColor: "#E7ECEF"}} />

                <TouchableHighlight underlayColor="#E7ECEF" style={{ marginTop: 10}} onPress={this.onTabSelect.bind(this, 'conversations')}>
                    <View style={{height: 46, flexDirection: 'row', alignItems:'center'}}>
                        <Image resizeMode="contain" style={{width: 36, marginLeft: 16}} source={require('../assets/images/toolbar/conversations-icon.png')} />
                        <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>Conversations</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor="#E7ECEF" style={{ marginTop: 10}} onPress={this.onTabSelect.bind(this, 'contacts')}>
                    <View style={{height: 46, flexDirection: 'row', alignItems:'center'}}>
                        <Image resizeMode="contain" style={{width: 36, marginLeft: 16}} source={require('../assets/images/toolbar/contacts-icon.png')} />
                        <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>Contacts</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor="#E7ECEF" style={{ marginTop: 10}} onPress={this.onTabSelect.bind(this, 'history')}>
                    <View style={{height: 46, flexDirection: 'row', alignItems:'center'}}>
                        <Image resizeMode="contain" style={{width: 36, marginLeft: 16}} source={require('../assets/images/toolbar/history-icon.png')} />
                        <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>History</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor="#E7ECEF" style={{ marginTop: 10}} onPress={this.onTabSelect.bind(this, 'settings')}>
                    <View style={{height: 46, flexDirection: 'row', alignItems:'center'}}>
                        <Image resizeMode="contain" style={{width: 36, marginLeft: 16}} source={require('../assets/images/toolbar/account-icon.png')} />
                        <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>Settings</Text>
                    </View>
                </TouchableHighlight>


                <View style={{flex: 0.6}} />
            </View>
        )
    }

    renderActiveCalls() {
        let calls = this.props.calls.toList();
        let result = [];

        for (let call of calls) {
            result.push(
                (
                    <TouchableHighlight key={call.getId()} style={{height: 38, backgroundColor: "#4cda64", alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.onCallSelect(call.getId())}>
                        <Text style={{color: "#FFF", fontSize: 14, paddingLeft: 10}}>{call.getRemoteUri()}</Text>
                    </TouchableHighlight>
                )
            )
        }

        return result;

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
        return (
            <DrawerLayoutAndroid drawerWidth={320} ref={(drawer) => { this._drawer = drawer; }} onDrawerClose={this.props.onDrawerClose} style={{flex: 1}} renderNavigationView={this.renderNavigationView.bind(this)}>
                <View key={this.props.tab} style={{flex: 1}}>
                    {this.renderActiveCalls()}
                    {this.renderContent()}
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

Viewport.props = {
    navigator: PropTypes.object,
    onTabSelect: PropTypes.func,
    onDrawerClose: PropTypes.func
}

function select(store) {
    // Do not track tabs other then 'conversations', 'contacts', 'history' and 'settings'
    let tab = store.navigation.current.name;

    if (['conversations', 'contacts', 'history', 'settings'].indexOf(tab) == -1) {
        tab = store.navigation.prevision.name;
    }

    return {
        tab: tab,
        drawer: store.navigation.drawer,
        calls: store.calls.map
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => {
            dispatch(Navigation.goAndReplace({name: tab}));
        },
        onCallSelect: (id) => {
            dispatch(Navigation.goTo({name: 'call', id: id}));
        },
        onDrawerClose: () => {
            dispatch(Navigation.closeDrawer());
        }
    };
}

export default connect(select, actions)(Viewport);