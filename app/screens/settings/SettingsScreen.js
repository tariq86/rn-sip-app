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
                <Header title="Settings" {...platformHeaderProps} />

                <LinedSection title="Accounts" />

                <LinedAccountInfo />
                <LinedAccountInfo />

                <View style={{  }}>

                </View>


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

export default connect(select, actions)(SettingsScreen);