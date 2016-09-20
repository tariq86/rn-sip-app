'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    Animated,
    View,
    Text,
    Modal,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native'
import * as Navigation from '../../modules/navigation'
import * as Calls from '../../modules/calls'

import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux'
import CallState from '../../components/call/CallState'
import CallInfo from '../../components/call/CallInfo'
import CallAction from '../../components/call/CallAction'
import CallButtons from '../../components/call/CallButtons'
import CallActions from '../../components/call/CallActions'
import CallParallelInfo from '../../components/call/CallParallelInfo'
import * as CallAnimation from './CallAnimation'
import TransferModal from '../../components/call/TransferModal'
import DialerModal from '../../components/call/DialerModal'
import IncomingCallModal from '../../components/call/IncomingCallModal'

// TODO Move to TranferModal
import Keypad from '../../components/call/Keypad'
import KeypadWithActions from '../../components/call/KeypadWithActions'
import KeypadInputText from '../../components/call/KeypadInputText'
import KeypadActions from '../../components/call/KeypadActions'

let backgroundColorShow = false;

class CallScreen extends Component {

    constructor(props) {
        super(props);

        let {height : screenHeight, width : screenWidth} = Dimensions.get('window');
        let call = this.props.call;

        if (call instanceof Promise) {
            call.then(this.onInitializationResponse.bind(this), this.onInitializationError.bind(this));
            call = null;
        }

        this.state = {
            call,
            incomingCall: null,

            isAddModalVisible: false,
            isRedirectModalVisible: false,
            isTransferModalVisible: false,

            isDTMFModalVisible: false,
            dtmfValue: "",

            screenHeight,
            screenWidth,

            error: null,

            ...CallAnimation.calculateComponentsHeight(screenHeight)
        };

        if (call) {
            this.state = {...this.state, ...CallAnimation.calculateInitialDimensions({...this.state, totalCalls: props.calls.size}, call)};
        }

        this._onCallAnswer = this.onCallAnswer.bind(this);
        this._onCallHangup = this.onCallHangup.bind(this);
        this._onCallChatPress = this.onCallChatPress.bind(this);
        this._onCallMutePress = this.onCallMutePress.bind(this);
        this._onCallUnMutePress = this.onCallUnMutePress.bind(this);
        this._onCallSpeakerPress = this.onCallSpeakerPress.bind(this);
        this._onCallEarpiecePress = this.onCallEarpiecePress.bind(this);

        this._onCallHoldPress = this.onCallHoldPress.bind(this);
        this._onCallUnHoldPress = this.onCallUnHoldPress.bind(this);
        
        this._onCallDTMFPress = this.onCallDTMFPress.bind(this);
        this._onCallDTMFKeyPress = this.onCallDTMFKeyPress.bind(this);
        this._onCallDTMFModalClosePress = this.onCallDTMFModalClosePress.bind(this);

        this._onCallTransferPress = this.onCallTransferPress.bind(this);
        this._onCallTransferClosePress = this.onCallTransferClosePress.bind(this);
        this._onCallAttendantTransferPress = this.onCallAttendantTransferPress.bind(this);
        this._onCallBlindTransferPress = this.onCallBlindTransferPress.bind(this);

        this._onCallAddPress = this.onCallAddPress.bind(this);
        this._onCallAddClosePress = this.onCallAddClosePress.bind(this);
        this._onCallAddSubmitPress = this.onCallAddSubmitPress.bind(this);

        this._onCallRedirect = this.onCallRedirectPress.bind(this);
        this._onCallRedirectClosePress = this.onCallRedirectClosePress.bind(this);
        this._onCallRedirectSubmitPress = this.onCallRedirectSubmitPress.bind(this);

        this._onIncomingCallAnswer = this.onIncomingCallAnswer.bind(this);
        this._onIncomingCallDecline = this.onIncomingCallDecline.bind(this);
    }

    onInitializationResponse(call) {
        let state = {
            call: call
        };
        state = {...state, ...CallAnimation.calculateInitialDimensions({...this.state, ...state, totalCalls: this.props.calls.size}, call)};

        this.setState(state);
    }

    onInitializationError(reason) {
        this.setState({error: reason});
        this.props.onCallEnd && this.props.onCallEnd(this.state.call);
    }

    componentWillReceiveProps(nextProps) {
        // Remember latest state of current call, to be able display call information after removal from state
        if (this.state.call && nextProps.calls.has(this.state.call.getId())) {
            let call = nextProps.calls.get(this.state.call.getId());
            let calls = nextProps.calls.toList().toArray();

            // Animate component's for different Call states
            CallAnimation.animateCallState({...this.state, totalCalls: calls.length}, call);

            // Handle incoming call
            let incomingCall = this.state.incomingCall;

            if (!incomingCall && calls.length > 1) {
                for (let c of calls) {
                    if (c.getId() == call.getId()) {
                        continue;
                    }

                    if (c.getState() == "PJSIP_INV_STATE_INCOMING") {
                        incomingCall = c;
                    }
                }
            } else if (incomingCall) {
                let exist = false;

                for (let c of calls) {
                    if (c.getId() == incomingCall.getId()) {
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    incomingCall = null;
                }
            }

            this.setState({call, incomingCall});

            if (call.getState() == "PJSIP_INV_STATE_DISCONNECTED") {
                this.props.onCallEnd && this.props.onCallEnd(this.state.call);
            }
        }
    }

    onCallHangup() {
        this.props.onCallHangup && this.props.onCallHangup(this.state.call);
    }

    onCallAnswer() {
        this.props.onCallAnswer && this.props.onCallAnswer(this.state.call);
    }

    onCallRedirect() {
        this.props.onCallRedirect && this.props.onCallRedirect(this.state.call);
    }

    onCallChatPress() {
        this.props.onCallChatPress && this.props.onCallChatPress(this.state.call);
    }

    onCallMutePress() {
        this.props.onCallMute && this.props.onCallMute(this.state.call);
    }

    onCallUnMutePress() {
        this.props.onCallUnMute && this.props.onCallUnMute(this.state.call);
    }

    onCallSpeakerPress() {
        this.props.onCallSpeaker && this.props.onCallSpeaker(this.state.call);
    }

    onCallEarpiecePress() {
        this.props.onCallEarpiece && this.props.onCallEarpiece(this.state.call);
    }

    onCallTransferPress() {
        // TODO: Put local call on hold while typing digits

        console.log("onCallTransferPress");
        this.setState({isTransferModalVisible: true});
    }

    onCallTransferClosePress() {
        this.setState({isTransferModalVisible: false});
    }

    onCallAttendantTransferPress(destinationCall) {
        this.setState({isTransferModalVisible: false});
        this.props.onCallAttendantTransfer && this.props.onCallAttendantTransfer(this.state.call, destinationCall);
    }

    onCallBlindTransferPress(value) {
        if (value.length > 0) {
            this.setState({isTransferModalVisible: false});
            this.props.onCallBlindTransfer && this.props.onCallBlindTransfer(this.state.call, value);
        }
    }

    onCallDTMFPress() {
        this.setState({isDTMFModalVisible: true});
    }

    onCallDTMFKeyPress(key) {
        this.setState({dtmfValue: this.state.dtmfValue + key});

        this.props.onCallDTMF && this.props.onCallDTMF(this.state.call, key);
    }

    onCallDTMFModalClosePress() {
        this.setState({isDTMFModalVisible: false, dtmfValue: ""});
    }

    onCallHoldPress() {
        this.props.onCallHold && this.props.onCallHold(this.state.call);
    }

    onCallUnHoldPress() {
        this.props.onCallUnHold && this.props.onCallUnHold(this.state.call);
    }

    onCallAddPress() {
        // TODO: Put local call on hold while typing digits
        this.setState({isAddModalVisible: true});
    }
    
    onCallAddClosePress() {
        this.setState({isAddModalVisible: false});
    }
    
    onCallAddSubmitPress(destination) {
        this.setState({isAddModalVisible: false});
        this.props.onCallAdd && this.props.onCallAdd(this.state.call, destination);
    }
    
    onCallRedirectPress() {
        this.setState({isRedirectModalVisible: true});
    }

    onCallRedirectClosePress() {
        this.setState({isRedirectModalVisible: false});
    }

    onCallRedirectSubmitPress(destination) {
        if (destination.length > 0) {
            this.setState({isRedirectModalVisible: false});
            this.props.onCallRedirect && this.props.onCallRedirect(this.state.call, destination);
        }
    }

    onIncomingCallAnswer() {
        this.setState({incomingCall: null});
        this.props.onIncomingCallAnswer && this.props.onIncomingCallAnswer(this.state.incomingCall);
    }

    onIncomingCallDecline() {
        this.setState({incomingCall: null});
        this.props.onIncomingCallDecline && this.props.onIncomingCallDecline(this.state.incomingCall);
    }

    renderSimultaniousCalls() {
        let activeCall = this.state.call;
        let calls = this.props.calls.toList().toArray().filter((c) => { return c.getId() != activeCall.getId()});
        let result = [];

        for (let i=0; i < calls.length; i++) {
            let call = calls[i];

            result.push(
                (<CallParallelInfo key={"parallel-" + call.getId()} call={call} onPress={this.props.onCallSelect} style={{marginTop: i == 0 ? 0 : 5}} />)
            )
        }

        return (
            <View style={{position: 'absolute', top: 5, width: this.state.screenWidth,}}>
                {result}
            </View>
        );
    }

    renderError() {
        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                    <Text style={{color: "#FFF"}}>{this.state.error}</Text>
                </View>
            </LinearGradient>
        )
    }

    renderCallWait() {
        // TODO: Show loader here
        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFF"}}>Please wait while call initialized</Text>
                </View>
            </LinearGradient>
        )
    }

    render() {
        let call = this.state.call;
        let calls = this.props.calls.toList().toArray();

        if (this.state.error) {
            return this.renderError();
        }

        if (!call) {
            return this.renderCallWait();
        }

        if (this.props.isScreenLocked === true) {
            // TODO: Use overlay with absolute position instead of this
            return (
                <View style={{flex: 1, backgroundColor: "#000"}} />
            )
        }

        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1}}>

                    {this.renderSimultaniousCalls()}

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
                        <CallActions call={call}
                                     style={{flex: 0.7}}
                                     onAddPress={this._onCallAddPress}
                                     onChatPress={this._onCallChatPress}
                                     onMutePress={this._onCallMutePress}
                                     onUnMutePress={this._onCallUnMutePress}
                                     onSpeakerPress={this._onCallSpeakerPress}
                                     onEarpiecePress={this._onCallEarpiecePress}
                                     onTransferPress={this._onCallTransferPress}
                                     onDTMFPress={this._onCallDTMFPress}
                                     onHoldPress={this._onCallHoldPress}
                                     onUnHoldPress={this._onCallUnHoldPress} />
                    </Animated.View>

                    <View style={{position: 'absolute', top: this.state.screenHeight - this.state.buttonsHeight, height: this.state.buttonsHeight, alignItems: 'center', width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>
                        <CallButtons
                            onAnswerPress={this._onCallAnswer}
                            onHangupPress={this._onCallHangup}
                            onRedirectPress={this._onCallRedirect}
                            call={call} />
                    </View>

                    <DialerModal
                        actions={[
                            {icon: "call", text: "Call2", callback: this._onCallAddSubmitPress}
                        ]}
                        visible={this.state.isAddModalVisible}
                        onRequestClose={this._onCallAddClosePress} />

                    <DialerModal
                        actions={[
                            {icon: "blind-transfer", text: "Redirect", callback: this._onCallRedirectSubmitPress}
                        ]}
                        theme="dark"
                        visible={this.state.isRedirectModalVisible}
                        onRequestClose={this._onCallRedirectClosePress} />

                    <TransferModal
                        call={call}
                        calls={calls}
                        visible={this.state.isTransferModalVisible}
                        onRequestClose={this._onCallTransferClosePress}
                        onBlindTransferPress={this._onCallBlindTransferPress}
                        onAttendantTransferPress={this._onCallAttendantTransferPress} />

                    <IncomingCallModal
                        call={this.state.incomingCall}
                        onAnswerPress={this._onIncomingCallAnswer}
                        onDeclinePress={this._onIncomingCallDecline} />

                    {/* TODO: Move to DTMFDialog */}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.isDTMFModalVisible}
                        onRequestClose={this._onCallDTMFModalClosePress}
                    >
                        <View style={{backgroundColor: "rgba(0,0,0,0.5)", flex: 1}}>

                            <View style={{margin: 30, flex: 0.7, marginTop: 70, backgroundColor: "#FFF", borderRadius: 8}}>

                                <View style={{padding: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: "#E0E7EA"}}>
                                    <Text style={{textAlign: 'center', flex: 1, fontSize: 18}}>DTMF</Text>
                                    <TouchableOpacity onPress={this._onCallDTMFModalClosePress}>
                                        <Image source={require('../../assets/images/modal/close-icon.png')} />
                                    </TouchableOpacity>
                                </View>

                                <KeypadInputText style={{flex: 0.20}} value={this.state.dtmfValue} editable={false} />

                                <Keypad onKeyPress={this._onCallDTMFKeyPress} style={{flex:1, borderColor: "#E0E7EA", borderTopWidth: 1, paddingTop: 20, paddingBottom: 30}} />
                            </View>
                        </View>
                    </Modal>

                </View>
            </LinearGradient>
        )
    }
}

CallScreen.props = {
    onCallEnd: PropTypes.func,
    onCallHangup: PropTypes.func,
    onCallAnswer: PropTypes.func
}

function select(store) {
    return {
        calls: store.calls.map, // TODO: Use Array instead of ImmutableJS struct
        call: store.navigation.current.call,
        isScreenLocked: store.calls.isScreenLocked,
        isFromForeground: store.app.foreground
    };
}

function actions(dispatch, getState) {
    console.log("getState", getState);
    return {
        onCallEnd(call) {
            setTimeout(() => {
                dispatch(
                    async function(dispatch, getState) {
                        let calls = getState().calls.map;
                        let route = getState().navigation.current;
                        let doDirectRoute = () => {
                            // Return to previous screen once call end.
                            return dispatch(Navigation.goBack());
                        };
                        let doRoute = (call) => {
                            if (calls.has(call.getId())) {
                                return;
                            }

                            // Open active call once current call ends.
                            if (calls.size > 0) {
                                return dispatch(Navigation.goAndReplace({name:'call', call:calls.first()}));
                            }

                            // Return to previous screen once call end.
                            return dispatch(Navigation.goBack());
                        };

                        if (route.name != 'call') {
                            return
                        }

                        if (route.call instanceof Promise) {
                            route.call.then(doRoute, doDirectRoute);
                        } else {
                            doRoute(route.call);
                        }
                    }
                );
            }, 3000);
        },
        onCallHold(call) {
            dispatch(Calls.holdCall(call));
        },
        onCallUnHold(call) {
            dispatch(Calls.unholdCall(call));
        },
        onCallMute(call) {
            dispatch(Calls.muteCall(call));
        },
        onCallUnMute(call) {
            dispatch(Calls.unmuteCall(call));
        },
        onCallSpeaker(call) {
            dispatch(Calls.useSpeaker(call));
        },
        onCallEarpiece(call) {
            dispatch(Calls.useEarpiece(call));
        },
        onCallDTMF(call, key) {
            dispatch(Calls.dtmfCall(call, key));
        },
        onCallBlindTransfer(call, destination) {
            dispatch(Calls.xferCall(call, destination));
        },
        onCallAttendantTransfer(call, destinationCall) {
            dispatch(Calls.xferReplacesCall(call, destinationCall));
        },
        onCallRedirect(call, destination) {
            dispatch(Calls.redirectCall(call, destination));
        },
        onCallHangup(call) {
            dispatch(Calls.hangupCall(call));
        },
        onCallDecline(call) {
            // TODO: Add decline method.
            dispatch(Calls.hangupCall(call));
        },
        onCallAnswer(call) {
            dispatch(Calls.answerCall(call));
        },
        onCallSelect: (call) => {
            dispatch(Navigation.goAndReplace({name: 'call', call}));
        },
        onCallAdd: (call, destination) => {
            dispatch(Calls.makeCall(destination));
        },
        onIncomingCallAnswer(call) {
            dispatch(Calls.answerCall(call));
            dispatch(Navigation.goAndReplace({name: 'call', call}));
        },
        onIncomingCallDecline(call) {
            // TODO: Add decline method.
            dispatch(Calls.hangupCall(call));
        }
    };
}

export default connect(select, actions)(CallScreen);