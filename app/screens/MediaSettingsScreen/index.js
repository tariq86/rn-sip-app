'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TabBarIOS
} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'
import {createAccount, replaceAccount, deleteAccount} from '../../modules/pjsip'

import ListSection from '../../components/Common/ListSection';
import ListTextField from '../../components/Common/ListTextField';
import ListSelectField from '../../components/Common/ListSelectField';

import Header from '../../components/Header'

class MediaSettingsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let platformHeaderProps = {};

        platformHeaderProps['leftItem'] = {
            title: 'Back',
            icon: require('../../assets/images/header/back_white.png'),
            layout: 'icon',
            onPress: this.props.onBackPress
        };
        platformHeaderProps['rightItem'] = {
            title: 'Save',
            icon: require('../../assets/images/header/ok_white.png'),
            layout: 'icon',
            onPress: this._onSubmitPress
        };

        return (
            <View style={{flex: 1}}>
                <Header title={"Media settings"} {...platformHeaderProps} />

                <ScrollView style={{flex: 1}}>
                    <ListSection title="General" />
                    <View style={{padding: 10}}>
                        <Text>Not implemented</Text>
                    </View>

                    <ListSection title="Advanced" />
                    <View style={{padding: 10}}>
                        <Text>Not implemented</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

MediaSettingsScreen.props = {
    onBackPress: PropTypes.func,
    onCreatePress: PropTypes.func,
    onChangePress: PropTypes.func,
    onDeletePress: PropTypes.func
};

function select(store) {
    return {
        account: store.navigation.current.account
    };
}

function actions(dispatch) {
    return {
        onBackPress: () => {
            dispatch(Navigation.goBack());
        },
        onSavePress: (configuration) => {
            alert("Not implemented")
        }
    };
}

export default connect(select, actions)(MediaSettingsScreen);