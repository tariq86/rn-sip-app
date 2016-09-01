'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet,
    Image,
    TabBarIOS
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux'

class CallScreen extends Component {
    render() {
        return (

            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Text>Call screen</Text>

                    <View style={{marginTop: 250, flexDirection:'row', justifyContent: 'space-between'}}>

                        <View style={{height: 64, width: 64, borderRadius: 64, borderWidth: 1, borderColor: 'rgba(157, 218, 220, 0.7)', justifyContent: 'center', alignItems: 'center'}}>
                            <Image resizeMode="contain" style={{height: 28, width: 28}} source={require('../../assets/images/call/action-chat.png')} />
                        </View>

                        <View style={{height: 64, width: 64, borderRadius: 64, borderWidth: 1, borderColor: 'rgba(157, 218, 220, 0.7)', justifyContent: 'center', alignItems: 'center'}}>
                            <Image resizeMode="contain" style={{height: 28, width: 28}} source={require('../../assets/images/call/action-mute.png')} />
                        </View>

                        <View style={{height: 64, width: 64, borderRadius: 64, borderWidth: 1, borderColor: 'rgba(157, 218, 220, 0.7)', justifyContent: 'center', alignItems: 'center'}}>
                            <Image resizeMode="contain" style={{height: 28, width: 28}} source={require('../../assets/images/call/action-speaker.png')} />
                        </View>

                    </View>


                </View>
            </LinearGradient>
        )
    }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;


CallScreen.props = {

}

// Later on in your styles..
var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});


function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {

    };
}

export default connect(select, actions)(CallScreen);