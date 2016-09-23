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
import {changeNetworkSettings} from '../../modules/app'
import * as Navigation from '../../modules/navigation'
import {createAccount, replaceAccount, deleteAccount} from '../../modules/accounts'

import LinedSection from '../../components/common/LinedSection';
import LinedDialogInput from '../../components/common/LinedDialogInput';
import LinedDialogSelection from '../../components/common/LinedDialogSelection';
import LinedDialogCheckbox from '../../components/common/LinedDialogCheckbox';

import Header from '../../components/Header'

class MediaSettingsScreen extends React.Component {

    constructor(props) {
        super(props);

        let s = this.props.settings.network;
        let foreground = this.props.settings.service.foreground;

        // We should disable network configuration (useWifi, use3g, useGprs, useEdge, useOtherNetworks) when useAnyway is TRUE.
        // Also we can't enable use mobile data while Wifi is not enabled

        let wifiDisabled = s.useAnyway;
        let mobileDisabled = s.useAnyway || (!wifiDisabled && !s.useWifi);

        this.state = {
            foreground,
            useAnyway: s.useAnyway,
            useWifi: s.useWifi,
            use3g: s.use3g,
            useGprs: s.useGprs,
            useEdge: s.useEdge,
            useOtherNetworks: s.useOtherNetworks,
            useInRoaming: s.useInRoaming,
            wifiDisabled,
            mobileDisabled
        };

        this._onForegroundChange = this.onBooleanChanged.bind(this, "foreground");

        this._onAnywayChange = this.onBooleanChanged.bind(this, "useAnyway");
        this._onWifiChange = this.onBooleanChanged.bind(this, "useWifi");
        this._on3gChange = this.onBooleanChanged.bind(this, "use3g");
        this._onGprsChange = this.onBooleanChanged.bind(this, "useGprs");
        this._onEdgeChange = this.onBooleanChanged.bind(this, "useEdge");
        this._onOtherNetworksChange = this.onBooleanChanged.bind(this, "useOtherNetworks");
        this._onInRoamingChange = this.onBooleanChanged.bind(this, "useInRoaming");

        this._onSavePress = this.onSavePress.bind(this);
    }

    onSavePress() {
        let configuration = {
            foreground: this.state.foreground,
            useAnyway: this.state.useAnyway,
            useWifi: this.state.useWifi,
            use3g: this.state.use3g,
            useGprs: this.state.useGprs,
            useEdge: this.state.useEdge,
            useOtherNetworks: this.state.useOtherNetworks,
            useInRoaming: this.state.useInRoaming
        };

        this.props.onSavePress && this.props.onSavePress(configuration);
    }

    onBooleanChanged(property, value) {
        let newState = {...this.state, [property]: value};
        let wifiDisabled = newState.useAnyway;
        let mobileDisabled = newState.useAnyway || (!wifiDisabled && !newState.useWifi);

        this.setState({...newState, wifiDisabled, mobileDisabled});
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
            onPress: this._onSavePress
        };

        return (
            <View style={{flex: 1}}>
                <Header title={"Network settings"} {...platformHeaderProps} />

                <ScrollView style={{flex: 1}}>
                    <LinedSection title="Connectivity settings" />

                    <LinedDialogCheckbox onChange={this._onAnywayChange} value={this.state.useAnyway} title="Always connect" description="Try to connect if any connection type available" />
                    <LinedDialogCheckbox disabled={this.state.wifiDisabled} onChange={this._onWifiChange} value={this.state.useWifi} title="Use WiFi" description="Use WiFi for incoming and outgoing calls" />
                    <LinedDialogCheckbox disabled={this.state.mobileDisabled} onChange={this._on3gChange} value={this.state.use3g} title="Use 3g (and better)" description="Your carrier MUST allow to use this option. Note that mobile carrier may also bill extra charge for data usage." />
                    <LinedDialogCheckbox disabled={this.state.mobileDisabled} onChange={this._onGprsChange} value={this.state.useGprs} title="Use GPRS" description="Your carrier MUST allow to use this option. Note that mobile carrier may also bill extra charge for data usage." />
                    <LinedDialogCheckbox disabled={this.state.mobileDisabled} onChange={this._onEdgeChange} value={this.state.useEdge} title="Use EDGE" description="Your carrier MUST allow to use this option. Note that mobile carrier may also bill extra charge for data usage." />
                    <LinedDialogCheckbox disabled={this.state.useAnyway} onChange={this._onOtherNetworksChange} value={this.state.useOtherNetworks} title="Use other networks" description="Use other then WiFi or mobile data connection types" />
                    <LinedDialogCheckbox onChange={this._onInRoamingChange} value={this.state.useInRoaming} title="Use in roaming" description="When application detects a roaming situation." />

                    <LinedSection title="Background connection" />

                    <LinedDialogCheckbox onChange={this._onForegroundChange} value={this.state.foreground} title="Run in background" description="Disable this if you do not want incoming calls, it will improve battery life significantly" />

                    <LinedSection title="Nat traversal" />

                    <LinedDialogCheckbox value={false} title="Enable ICE" description="Turn on ICE feature" />
                    <LinedDialogCheckbox value={false} title="Enable STUN" description="Turn on STUN feature" />
                </ScrollView>
            </View>
        );
    }

}

MediaSettingsScreen.props = {
    onBackPress: PropTypes.func,
    onSavePress: PropTypes.func
};

function select(store) {
    return {
        settings: store.app.endpointSettings
    };
}

function actions(dispatch) {
    return {
        onBackPress: () => {
            dispatch(Navigation.goBack());
        },
        onSavePress: (configuration) => {
            dispatch(changeNetworkSettings(configuration));
        }
    };
}

export default connect(select, actions)(MediaSettingsScreen);