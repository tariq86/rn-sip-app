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
import {createAccount, replaceAccount, deleteAccount} from '../../modules/accounts'

import LinedSection from '../../components/common/LinedSection';
import LinedDialogInput from '../../components/common/LinedDialogInput';
import LinedDialogSelection from '../../components/common/LinedDialogSelection';

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
                    <LinedSection title="General" />
                    <View>
                        <Text>TODO</Text>
                    </View>

                    <LinedSection title="Advanced" />
                    <View>
                        <Text>TODO</Text>
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