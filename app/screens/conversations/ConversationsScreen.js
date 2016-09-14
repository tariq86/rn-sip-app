'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Modal,
    Image,
    Text,
    Platform,
    StyleSheet,
    TabBarIOS
} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'
import {makeCall} from '../../modules/calls'

import Header from '../../components/Header'
import KeypadWithActions from '../../components/call/KeypadWithActions'
import ActionButton from 'react-native-action-button';

class ConversationsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {dialerVisible: false};
        this._onCallPress = this.onCallPress.bind(this);
    }

    setDialerVisible(visible) {
        this.setState({dialerVisible: visible});
    }

    onKeypadPress() {
        this.setState({dialerVisible: true});
    }

    onCallPress(destination) {
        this.setState({dialerVisible: false});
        this.props.onCallPress && this.props.onCallPress(destination);
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

        // TODO: Use DialerModal instead of Modal

        return (
            <View style={{flex: 1}}>
                <Header title="Conversations" {...platformHeaderProps} />
                <View style={{flex: 1, alignItems: 'center', backgroundColor: "#ECEFF1", justifyContent: 'center', paddingBottom: (Platform.OS === 'ios' ? 50 : 0)}}>
                    <Text style={{fontSize: 42, marginTop: 26, color: "#666"}}>Вітаю!</Text>
                    <Image resizeMode="contain" style={{width: 250}} source={require('../../assets/demo/tyrannosaurus-rex.png')} />
                </View>

                {
                    Platform.OS === 'ios' ? null :
                        <Modal
                            animationType={"slide"}
                            transparent={false}
                            visible={this.state.dialerVisible}
                            onRequestClose={() => {alert("Modal has been closed.")}}
                        >
                            <KeypadWithActions
                                style={{flex: 1}}
                                actions={[
                                    {icon: "call", text: "Call", callback: this._onCallPress}
                                ]}
                            />

                            <TouchableHighlight
                                style={{height: 46, backgroundColor:"#E7ECEF", borderTopWidth: 1, borderColor: "#E0E7EA", alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => { this.setDialerVisible(!this.state.dialerVisible) }}>
                                <Text style={{fontSize: 14}}>Отмена</Text>
                            </TouchableHighlight>

                        </Modal>
                }

                {
                    Platform.OS === 'ios' ? null :
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={this.onKeypadPress.bind(this)}
                    />
                }
            </View>
        );
    }

}

ConversationsScreen.props = {
    onHamburgerPress: PropTypes.func,
    onKeypadPress: PropTypes.func
}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onHamburgerPress: () => {
            dispatch(Navigation.openDrawer());
        },
        onCallPress: (destination) => {
            if (destination) {
                dispatch(makeCall(destination));
            }
        },
    };
}

export default connect(select, actions)(ConversationsScreen);