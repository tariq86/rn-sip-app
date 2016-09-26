'use strict';

import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    Platform,
    StyleSheet,
    TabBarIOS
} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'

import Header from '../../components/Header'

class ContactsScreen extends React.Component {

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

        return (
            <View style={{flex: 1}}>
                <Header title="Contacts" {...platformHeaderProps} />
                <View style={{flex: 1, alignItems: 'center', backgroundColor: "#ECEFF1", justifyContent: 'center', paddingBottom: (Platform.OS === 'ios' ? 50 : 0)}}>
                    <Text resizeMode="contain" style={{fontSize: 42, marginTop: 26, color: "#666"}}>Բարի օր!</Text>
                    <Image source={require('../../assets/demo/pterosaurus.png')} />
                </View>
            </View>
        );
    }

}

ContactsScreen.props = {
    onHamburgerPress: PropTypes.func
}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onHamburgerPress: () => {
            dispatch(Navigation.openDrawer());
        }
    };
}

export default connect(select, actions)(ContactsScreen);