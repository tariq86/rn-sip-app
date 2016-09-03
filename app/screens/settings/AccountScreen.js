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
import {createAccount} from '../../modules/accounts'

import LinedTextInput from '../../components/common/LinedTextInput';
import LinedSection from '../../components/common/LinedSection';

import Header from '../../components/Header'

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            host: "",
            realm: ""
        }
        
        this._onUsernameChanged = this.onFieldChanged.bind(this, "username");
        this._onPasswordChanged = this.onFieldChanged.bind(this, "password");
        this._onHostChanged = this.onFieldChanged.bind(this, "host");
        this._onRealmChanged = this.onFieldChanged.bind(this, "realm");
        this._onSubmitPress = this.onSubmitPress.bind(this);
    }

    onFieldChanged(name, value) {
        this.setState({[name]: value});
    }
    
    onSubmitPress() {
        // TODO: Validation and prompting.
        // TODO: Add port and transport

        let credentials = {
            username: this.state.username,
            password: this.state.password,
            host: this.state.host,
            realm: this.state.realm
        };

        this.props.onCreatePress && this.props.onCreatePress(credentials);
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
            title: 'Create',
            icon: require('../../assets/images/header/ok_white.png'),
            layout: 'icon',
            onPress: this._onSubmitPress
        };

        return (
            <View style={{flex: 1}}>
                <Header title="Account" {...platformHeaderProps} />

                <LinedSection title="Settings" />

                <LinedTextInput placeholder="Username" onChangeText={this._onUsernameChanged} value={this.state.username} />
                <LinedTextInput placeholder="Password" onChangeText={this._onPasswordChanged} value={this.state.password} />
                <LinedTextInput placeholder="Host" onChangeText={this._onHostChanged} value={this.state.host} />
                <LinedTextInput placeholder="Realm" onChangeText={this._onRealmChanged} value={this.state.realm} />

            </View>
        );
    }

}

AccountScreen.props = {
    onBackPress: PropTypes.func,
    onCreatePress: PropTypes.func
};

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onBackPress: () => {
            dispatch(Navigation.goBack());
        },
        onCreatePress: (configuration) => {
            dispatch(createAccount(configuration));
        }
    };
}

export default connect(select, actions)(AccountScreen);