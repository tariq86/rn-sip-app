'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    View,
    Text,
    Platform,
    Modal,
    StyleSheet,
    Image,
    PixelRatio,
    Dimensions,
    TabBarIOS
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
import * as CallAnimation from './CallAnimation'

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
            call.then(this.onInitializationResponse.bind(this));
            call = null;
        }

        console.log("call", call);

        this.state = {
            call,
            terminatedCall: null,

            isRedirectModalVisible: false,

            isTransferModalVisible: false,
            isDTMFModalVisible: false,
            dtmfValue: "",

            screenHeight,
            screenWidth,

            ...CallAnimation.calculateComponentsHeight(screenHeight)
        };

        if (call) {
            this.state = {...this.state, ...CallAnimation.calculateInitialDimensions(this.state, call)};
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


        this._onCallRedirect = this.onCallRedirectPress.bind(this);
        this._onCallRedirectClosePress = this.onCallRedirectClosePress.bind(this);
        this._onCallRedirectSubmitPress = this.onCallRedirectSubmitPress.bind(this);
    }

    onInitializationResponse(call) {
        let state = {
            call: call
        };
        state = {...state, ...CallAnimation.calculateInitialDimensions({...this.state, ...state}, call)};

        this.setState(state);
    }

    componentWillReceiveProps(nextProps) {
        // Remember latest state of current call, to be able display call information after removal from state
        if (this.state.call && nextProps.calls.has(this.state.call.getId())) {
            let call = nextProps.calls.get(this.state.call.getId());

            if (this.state.call.getState() != call.getState()) {
                // Animate component's for different Call states
                CallAnimation.animateCallState(this.state, call);
            }

            this.setState({call});

            if (call.getState() == "PJSIP_INV_STATE_DISCONNECTED") {
                this.props.onCallEnd && this.props.onCallEnd();
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
        this.props.onCallMutePress && this.props.onCallMutePress(this.state.call);
    }

    onCallUnMutePress() {
        this.props.onCallUnMutePress && this.props.onCallUnMutePress(this.state.call);
    }

    onCallSpeakerPress() {
        this.props.onCallSpeakerPress && this.props.onCallSpeakerPress(this.state.call);
    }

    onCallEarpiecePress() {
        this.props.onCallEarpiecePress && this.props.onCallEarpiecePress(this.state.call);
    }

    onCallTransferPress() {
        console.log("onCallTransferPress");
        this.setState({isTransferModalVisible: true});
    }

    onCallTransferClosePress() {
        this.setState({isTransferModalVisible: false});
    }

    onCallAttendantTransferPress(value) {
        if (value.length > 0) {
            this.setState({isTransferModalVisible: false});
            this.props.onCallAttendantTransferPress && this.props.onCallAttendantTransferPress(this.state.call, value);
        }
    }

    onCallBlindTransferPress(value) {
        if (value.length > 0) {
            this.setState({isTransferModalVisible: false});
            this.props.onCallBlindTransferPress && this.props.onCallBlindTransferPress(this.state.call, value);
        }
    }

    onCallDTMFPress() {
        this.setState({isDTMFModalVisible: true});
    }

    onCallDTMFKeyPress(key) {
        this.setState({dtmfValue: this.state.dtmfValue + key});

        this.props.onCallDTMFPress && this.props.onCallDTMFPress(this.state.call, key);
    }

    onCallDTMFModalClosePress() {
        this.setState({isDTMFModalVisible: false, dtmfValue: ""});
    }

    onCallHoldPress() {
        this.props.onCallHoldPress && this.props.onCallHoldPress(this.state.call);
    }

    onCallUnHoldPress() {
        this.props.onCallUnHoldPress && this.props.onCallUnHoldPress(this.state.call);
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

    renderCallWait() {
        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Please wait while call initialized</Text>
                </View>
            </LinearGradient>
        )
    }

    render() {
        let call = this.state.call;

        if (!call) {
            return this.renderCallWait();
        }

        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={{flex: 1}}>
                <View style={{flex: 1}}>

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
                        <CallActions call={call}
                                     style={{flex: 0.7}}
                                     onChatPress={this._onCallChatPress}
                                     onMutePress={this._onCallMutePress}
                                     onUnMutePress={this._onCallUnMutePress}
                                     onSpeakerPress={this._onCallSpeakerPress}
                                     onEarpiecePress={this._onCallEarpiecePress}
                                     onTransferPress={this._onCallTransferPress}
                                     onDTMFPress={this._onCallDTMFPress}
                                     onHoldPress={this._onCallHoldPress}
                                     onUnHoldPress={this._onCallUnHoldPress} />
                        <View style={{flex: 0.15}} />

                    </Animated.View>

                    <View style={{position: 'absolute', top: this.state.screenHeight - this.state.buttonsHeight, height: this.state.buttonsHeight, alignItems: 'center', width: this.state.screenWidth, backgroundColor: backgroundColorShow ? "#59c15b" : "transparent"}}>
                        <CallButtons
                            onAnswerPress={this._onCallAnswer}
                            onHangupPress={this._onCallHangup}
                            onRedirectPress={this._onCallRedirect}
                            call={call} />
                    </View>

                    {/* TODO: Move to RedirectDialog */}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.isRedirectModalVisible}
                        onRequestClose={this._onCallRedirectClosePress}
                    >
                        <View style={{backgroundColor: "#3f5057", flex: 1}}>

                            <KeypadWithActions
                                style={{flex: 1, backgroundColor:"#3f5057"}}
                                inputStyle={{backgroundColor:"#3c4b51"}}
                                inputTextStyle={{color:"#FFF"}}
                                keyUnderlayColor={"#566971"}
                                keyTextStyle={{color:"#FFF"}}
                                actionTouchableStyle={{backgroundColor:"#59696f"}}
                                actionTextStyle={{color:"#FFF"}}
                                actions={[
                                    // {icon: "attendant-transfer", text: "Attendant\ntransfer", callback: this._onCallAttendantTransferPress},
                                    {icon: "redirect", text: "Redirect", callback: this._onCallRedirectSubmitPress}
                                ]}
                            />

                            <TouchableOpacity onPress={this._onCallRedirectClosePress} style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#52636a"}}>
                                <Text style={{fontSize: 12, color: "#FFF"}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    {/* TODO: Move to TransferDialog */}
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.isTransferModalVisible}
                        onRequestClose={this._onCallTransferClosePress}
                    >
                        <View style={{backgroundColor: "#3f5057", flex: 1}}>

                            <KeypadWithActions
                                style={{flex: 1, backgroundColor:"#3f5057"}}
                                inputStyle={{backgroundColor:"#3c4b51"}}
                                inputTextStyle={{color:"#FFF"}}
                                keyUnderlayColor={"#566971"}
                                keyTextStyle={{color:"#FFF"}}
                                actionTouchableStyle={{backgroundColor:"#59696f"}}
                                actionTextStyle={{color:"#FFF"}}
                                actions={[
                                    // {icon: "attendant-transfer", text: "Attendant\ntransfer", callback: this._onCallAttendantTransferPress},
                                    {icon: "blind-transfer", text: "Blind\ntransfer", callback: this._onCallBlindTransferPress}
                                ]}
                            />

                            <TouchableOpacity onPress={this._onCallTransferClosePress} style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#52636a"}}>
                                <Text style={{fontSize: 12, color: "#FFF"}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

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
        calls: store.calls.map,
        call: store.navigation.current.call
    };
}

function actions(dispatch) {
    return {
        onCallEnd() {
            setTimeout(() => {
                dispatch(Navigation.goBack());
            }, 5000);
        },
        onCallHoldPress(call) {
            dispatch(Calls.holdCall(call));
        },
        onCallUnHoldPress(call) {
            dispatch(Calls.unholdCall(call));
        },
        onCallMutePress(call) {
            dispatch(Calls.muteCall(call));
        },
        onCallUnMutePress(call) {
            dispatch(Calls.unmuteCall(call));
        },
        onCallSpeakerPress(call) {
            dispatch(Calls.useSpeaker(call));
        },
        onCallEarpiecePress(call) {
            dispatch(Calls.useEarpiece(call));
        },
        onCallDTMFPress(call, key) {
            dispatch(Calls.dtmfCall(call, key));
        },
        onCallBlindTransferPress(call, destination) {
            dispatch(Calls.xferCall(call, destination));
        },
        onCallAttendantTransferPress() {
            alert("Not implemented");
        },
        onCallRedirect(call, destination) {
            dispatch(Calls.redirectCall(call, destination));
        },
        onCallHangup(call) {
            dispatch(Calls.hangupCall(call));
        },
        onCallAnswer(call) {
            dispatch(Calls.answerCall(call));
        }
    };
}

export default connect(select, actions)(CallScreen);