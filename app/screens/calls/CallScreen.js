'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    View,
    Text,
    Platform,
    StyleSheet,
    Image,
    PixelRatio,
    Dimensions,
    TabBarIOS
} from 'react-native'
import * as Navigation from '../../modules/navigation'
import {hangupCall, answerCall, muteCall, unmuteCall, holdCall, unholdCall, enableSpeaker, disableSpeaker, makeTransfer, sendDTMF} from '../../modules/calls'

import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux'
import CallState from '../../components/call/CallState'
import CallInfo from '../../components/call/CallInfo'
import CallAction from '../../components/call/CallAction'
import CallButtons from '../../components/call/CallButtons'

let backgroundColorShow = false;

class CallScreen extends Component {

    constructor(props) {
        super(props);

        let {height : screenHeight, width : screenWidth} = Dimensions.get('window');

        // TODO: Calculate buttonsOpacity and buttonsOffset bcs its as static

        this.state = {
            call: props.calls.get(props.id),
            terminatedCall: null,
            screenHeight,
            screenWidth,
            infoHeight: this.calcHeightForInfo(screenHeight),
            avatarHeight: this.calcHeightForAvatar(screenHeight),
            stateHeight: this.calcHeightForState(screenHeight),
            actionsHeight: this.calcHeightForActions(screenHeight),
            buttonsHeight: this.calcHeightForButtons(screenHeight),
        };
        this.state = {...this.state, ...this.calcInitialPosition(this.state)};


        this._onCallHangup = this.onCallHangup.bind(this);
        this._onCallAnswer = this.onCallAnswer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // Remember latest state of current call, to be able display call information after removal from state
        if (!this.state.terminatedCall) {
            let call = nextProps.calls.get(this.props.id);
            let dim = this.calcCallPositions(this.state, call);

            Animated.parallel([
                Animated.timing(this.state.infoOffset, {toValue: dim.infoOffset}),
                Animated.timing(this.state.stateOffset, {toValue: dim.stateOffset}),

                Animated.timing(this.state.avatarOffset, {toValue: dim.avatarOffset}),
                Animated.timing(this.state.avatarOpacity, {toValue: dim.avatarOpacity}),

                Animated.timing(this.state.actionsOffset, {toValue: dim.actionsOffset}),
                Animated.timing(this.state.actionsOpacity, {toValue: dim.actionsOpacity})
            ]).start();

            if (call.getState() == "PJSIP_INV_STATE_DISCONNECTED") {
                this.setState({terminatedCall:call});
                this.props.onCallEnd && this.props.onCallEnd();
            }
        }
    }

    calcDimensionsForIncomingCall(state) {
        let totals = state.infoHeight  + state.stateHeight + state.actionsHeight + state.buttonsHeight;
        let spaces = state.screenHeight - totals;
        let space = spaces / 4;

        let infoOffset = space;
        let avatarOffset = infoOffset + state.infoHeight + space;
        let stateOffset = avatarOffset + state.avatarHeight + space;

        return {
            infoOffset: infoOffset,
            avatarOpacity: 1,
            avatarOffset: avatarOffset,
            stateOffset: stateOffset,
            actionsOpacity: 0,
            actionsOffset: state.screenHeight
        }
    }

    calcDimensionsForActiveCall(state) {
        let totals = state.infoHeight  + state.stateHeight + state.actionsHeight + state.buttonsHeight;
        let spaces = state.screenHeight - totals;
        let space = spaces / 4;

        let infoOffset = space;
        let stateOffset = infoOffset + state.infoHeight + space;
        let actionsOffset = stateOffset + state.stateHeight + space;

        return {
            infoOffset: infoOffset,
            avatarOpacity: 0,
            avatarOffset: state.screenHeight,
            stateOffset: stateOffset,
            actionsOpacity: 1,
            actionsOffset: actionsOffset
        }
    }

    calcDimensionsForTerminatedCall(state) {

        return {
            infoOffset: 20,
            avatarOpacity: 0,
            avatarOffset: state.screenHeight,
            stateOffset: 250,
            actionsOpacity: 0,
            actionsOffset: state.screenHeight,
            buttonsOpacity: 1,
            buttonsOffset: 400
        }
    }

    calcCallPositions(state, call) {
        switch (call.getState()) {
            case 'PJSIP_INV_STATE_NULL':
            case 'PJSIP_INV_STATE_CALLING':
            case 'PJSIP_INV_STATE_EARLY':
            case 'PJSIP_INV_STATE_CONNECTING':
            case 'PJSIP_INV_STATE_CONFIRMED':
                return this.calcDimensionsForActiveCall(state);
            case 'PJSIP_INV_STATE_INCOMING':
                return this.calcDimensionsForIncomingCall(state);
            case 'PJSIP_INV_STATE_DISCONNECTED':
                return this.calcDimensionsForTerminatedCall(state);
        }
    }

    calcInitialPosition(state) {
        let dim = this.calcCallPositions(state, state.call);

        return {
            infoOffset: new Animated.Value(dim.infoOffset),
            avatarOpacity: new Animated.Value(dim.avatarOpacity),
            avatarOffset: new Animated.Value(dim.avatarOffset),
            stateOffset: new Animated.Value(dim.stateOffset),
            actionsOpacity: new Animated.Value(dim.actionsOpacity),
            actionsOffset: new Animated.Value(dim.actionsOffset),
            buttonsOpacity: new Animated.Value(dim.buttonsOpacity),
            buttonsOffset: new Animated.Value(dim.buttonsOffset),
        }
    }

    calcHeightForInfo(height) {
        return height * 0.12;
    }

    calcHeightForState(height) {
        return height * 0.08;
    }

    calcHeightForAvatar(height) {
        return height * 0.3;
    }

    calcHeightForActions(height) {
        return height * 0.4;
    }

    calcHeightForButtons(height) {
        return height * 0.22;
    }

    onCallHangup() {
        console.log("_onCallHangup");

        this.props.onCallHangup && this.props.onCallHangup(this.state.call);
    }

    onCallAnswer() {
        console.log("_onCallAnswer");
        this.props.onCallAnswer && this.props.onCallAnswer(this.state.call);
    }

    render() {
        let call = this.state.terminatedCall ? this.state.terminatedCall : this.props.calls.get(this.props.id);

        console.log("this.state.actionsOpacity", this.state.actionsOpacity);

        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1, marginTop: STATUS_BAR_HEIGHT}}>

                    <Animated.View style={{position: 'absolute', top: this.state.infoOffset, height: this.state.infoHeight, width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>
                        <CallInfo call={call} />
                    </Animated.View>

                    <Animated.View style={{alignItems: 'center', position: 'absolute', top: this.state.avatarOffset, opacity: this.state.avatarOpacity,  height: this.state.avatarHeight, width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>
                        <View style={{margin: 10, height: this.state.avatarHeight - 20, width: this.state.avatarHeight - 20, backgroundColor: "#FFF", borderRadius: this.state.avatarHeight - 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>Avatar</Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={{position: 'absolute', top: this.state.stateOffset, height: this.state.stateHeight, width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>
                        <CallState call={call} />
                    </Animated.View>

                    <Animated.View style={{position: 'absolute', top: this.state.actionsOffset, height: this.state.actionsHeight, opacity: this.state.actionsOpacity, flexDirection:'row', width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>

                        <View style={{flex: 0.15}} />

                        <View style={{flex: 0.7}}>
                            <View style={{flexDirection: 'row'}}>
                                <CallAction type="chat" description="chat" />
                                <View style={{flex: 0.3}} />
                                <CallAction type="mute" description="mute" />
                                <View style={{flex: 0.3}} />
                                <CallAction type="speaker" description="speaker" />
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 30}}>
                                <CallAction type="transfer" description="transfer" />
                                <View style={{flex: 0.3}} />
                                <CallAction type="hold" description="hold" />
                                <View style={{flex: 0.3}} />
                                <View style={{width: 64}} />
                            </View>
                        </View>

                        <View style={{flex: 0.15}} />

                    </Animated.View>

                    <Animated.View style={{position: 'absolute', top: this.state.screenHeight - this.state.buttonsHeight, height: this.state.buttonsHeight, alignItems: 'center', width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>
                        <CallButtons onAnswerPress={this._onCallAnswer} onHangupPress={this._onCallHangup} call={call} />
                    </Animated.View>
                </View>
            </LinearGradient>
        )
    }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;


CallScreen.props = {
    onCallEnd: PropTypes.func
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
        calls: store.calls.map,
        id: store.navigation.current.id
    };
}

function actions(dispatch) {
    return {
        onCallEnd() {
            setTimeout(() => {
                dispatch(Navigation.goBack());
            }, 5000);
        },
        onCallHangup(call) {

            console.log("hangupCall");

            dispatch(hangupCall(call));
        },
        onCallAnswer(call) {
            console.log("answerCall");
            dispatch(answerCall(call));
        }
    };
}

export default connect(select, actions)(CallScreen);