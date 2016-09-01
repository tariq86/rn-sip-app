'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet,
    PixelRatio,
    TextInput,
    TabBarIOS,
    Dimensions
} from 'react-native'
import * as Navigation from '../modules/navigation'
import Header from '../components/Header'

import LinedSection from '../components/common/LinedSection';
import LinedTextInput from '../components/common/LinedTextInput';
import LinedTextInputStyles from '../styles/common/LinedTextInput';

import {connect} from 'react-redux'


    class TestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            host: "",
            port: "",
            realm: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="Test Screen" />

                <View style={{flex: 1}}>





                    { /* LinedSection */ }
                    <LinedSection title="Settins" />


                    { /* LinedTextInput */ }
                    <LinedTextInput placeholder="Username" value={this.state.username} onChangeText={(text) => {this.setState({username: text})}} />
                    <LinedTextInput
                        style={LinedTextInputStyles.wrapperWithOffset}
                        inputStyle={LinedTextInputStyles.inputWithOffset}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(text) => {this.setState({password: text})}} />
                    <LinedTextInput placeholder="Host" value={this.state.host} />
                    <LinedTextInput placeholder="Port" value={this.state.port} />
                    <LinedTextInput placeholder="Realm" value={this.state.realm} />


                </View>
            </View>
        )
    }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;


var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

TestScreen.props = {

}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onCancelPress: () => {
            dispatch(Navigation.goBack())
        }
    };
}

export default connect(select, actions)(TestScreen);