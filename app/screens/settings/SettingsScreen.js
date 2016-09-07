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

import LinedAccountInfo from '../../components/settings/LinedAccountInfo'
import LinedSection from '../../components/common/LinedSection'
import LinedTextInput from '../../components/common/LinedTextInput'

import Header from '../../components/Header'

class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    renderAccounts(accounts) {
        let list = accounts.toArray();
        let result = [];

        for (let acc of list) {
            result.push((
                <LinedAccountInfo key={acc.getId()} account={acc} onPress={this.props.onAccountPress && this.props.onAccountPress.bind(this, acc)} />
            ))
        }

        if (result.length == 0) {
            return (
                <View style={{height: 56, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, color: "#CCC"}}>No accounts available</Text>
                </View>
            )
        }

        return result;
    }

    render() {
        let platformHeaderProps = {};

        if (Platform.OS === 'ios') {

        } else {
            platformHeaderProps['leftItem'] = {
                title: 'Menu',
                icon: require('../../assets/images/header/hamburger.png'),
                layout: 'icon',
                onPress: this.props.onHamburgerPress
            };
        }


        platformHeaderProps['rightItem'] = {
            title: 'Create',
            icon: require('../../assets/images/header/add_white.png'),
            layout: 'icon',
            onPress: this.props.onNewAccountPress
        };

        return (
            <View style={{flex: 1}}>
                <Header title="Settings" {...platformHeaderProps} />

                <LinedSection title="Accounts" />

                {this.renderAccounts(this.props.accounts)}

                { /**
                <View style={{height: 40, alignItems:'center', justifyContent: 'center'}}>
                    <Text>No accounts available</Text>
                </View>
                 **/
                }

                <LinedSection title="Advanced" />


            </View>
        );
    }

}

SettingsScreen.props = {
    accounts: PropTypes.object,
    onHamburgerPress: PropTypes.func,
    onAccountPress: PropTypes.func,
    onNewAccountPress: PropTypes.func
}

function select(store) {
    return {
        accounts: store.accounts.map
    };
}

function actions(dispatch) {
    return {
        onHamburgerPress: () => {
            dispatch(Navigation.openDrawer());
        },
        onAccountPress: (account) => {
            dispatch(Navigation.goTo({name: 'account', account: account}));
        },
        onNewAccountPress: () => {
            dispatch(Navigation.goTo({name: 'account'}));
        }
    };
}

export default connect(select, actions)(SettingsScreen);