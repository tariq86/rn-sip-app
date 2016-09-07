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
import {createAccount, deleteAccount} from '../../modules/accounts'

import LinedTextInput from '../../components/common/LinedTextInput';
import LinedSection from '../../components/common/LinedSection';
import LinedDialogInput from '../../components/common/LinedDialogInput';

import Header from '../../components/Header'

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.account) {
            this.state = {
                name: this.props.account.getName(),
                username: this.props.account.getUsername(),
                domain: this.props.account.getDomain(),
                password: this.props.account.getPassword(),

                proxy: this.props.account.getPassword(),
                transport: this.props.account.getTransport(),
                regServer: this.props.account.getRegServer(),
                regTimeout: this.props.account.getRegTimeout()
            }
        } else {
            this.state = {
                name: "",
                username: "",
                domain: "",
                password: "",

                proxy: "",
                transport: "",
                regServer: "",
                regTimeout: ""
            }
        }


        
        this._onNameChanged = this.onFieldChanged.bind(this, "name");
        this._onUsernameChanged = this.onFieldChanged.bind(this, "username");
        this._onPasswordChanged = this.onFieldChanged.bind(this, "password");
        this._onDomainChanged = this.onFieldChanged.bind(this, "domain");
        this._onProxyChanged = this.onFieldChanged.bind(this, "proxy");
        this._onSubmitPress = this.onSubmitPress.bind(this);
        this._onDeletePress = this.onDeletePress.bind(this);
    }

    onFieldChanged(name, value) {
        this.setState({[name]: value});
    }
    
    onSubmitPress() {
        // TODO: Validation and prompting.
        // TODO: Add port and transport

        let credentials = {
            name: this.state.name,
            username: this.state.username,
            domain: this.state.domain,
            password: this.state.password,

            proxy: this.state.proxy,
            transport: this.state.transport,
            regServer: this.state.regServer,
            regTimeout: this.state.regTimeout
        };

        this.props.onCreatePress && this.props.onCreatePress(credentials);
    }

    onDeletePress() {
        this.props.onDeletePress && this.props.onDeletePress(this.props.account);
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
                <Header title={this.props.account ? this.props.account.getName() : "New account"} {...platformHeaderProps} />

                <ScrollView style={{flex: 1}}>
                    <LinedSection title="General" />

                    <LinedDialogInput title="Full name" placeholder="Display name" value={this.state.name} onChange={this._onNameChanged} />
                    <LinedDialogInput title="Username" placeholder="Account name / Login" value={this.state.username} onChange={this._onUsernameChanged} />
                    <LinedDialogInput title="Server" placeholder="SIP server domain" value={this.state.domain} onChange={this._onDomainChanged} />
                    <LinedDialogInput title="Password" placeholder="Password to access your account" value={this.state.password} onChange={this._onPasswordChanged} />

                    <LinedSection title="Advanced" />

                    <LinedDialogInput title="Proxy" placeholder="Proxy domain/ip and port (optional)" value="" onChange={this._onProxyChanged} />
                    <LinedDialogInput title="Transport" placeholder="Connection transport UDP, TCP, TLS (optional)" value="" onChange={() => {}} />
                    <LinedDialogInput title="Registry server / Realm" placeholder="URL to be put in the request URI for the registration" value="" onChange={() => {}} />
                    <LinedDialogInput title="Registration Timeout" placeholder="Interval for registration, in seconds" value="" onChange={() => {}} />
                </ScrollView>
                {
                    !this.props.account ? null :
                    <TouchableHighlight
                        style={{height: 46, backgroundColor: "#E7ECEF", borderTopWidth: 1, borderColor: "#E0E7EA", alignItems: 'center', justifyContent: 'center'}}
                        onPress={this._onDeletePress}>
                        <Text style={{fontSize: 14}}>Remove account</Text>
                    </TouchableHighlight>
                }
            </View>
        );
    }

}

AccountScreen.props = {
    onBackPress: PropTypes.func,
    onCreatePress: PropTypes.func,
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
        onCreatePress: (configuration) => {
            dispatch(createAccount(configuration));
        },
        onDeletePress: (account) => {
            dispatch(deleteAccount(account))
        }
    };
}

export default connect(select, actions)(AccountScreen);