'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    Dimensions,
    Animated,
    View,
    Text,
    Image
} from 'react-native'


var backgroundColorShow = true;
// import s from '../../styles/components/call/KeypadInputTextStyles';

export default class CallButtons extends Component {

    constructor(props) {
        super(props);

        let call = props.call;
        let {height : screenHeight, width : screenWidth} = Dimensions.get('window');
        let answerable = call.getState() == "PJSIP_INV_STATE_INCOMING";


        let space = (screenWidth - 64 * 3) / 4;
        let hangupOffset = space;
        let answerOffset = hangupOffset + 64 + space;
        let transferOffset = answerOffset + 64 + space;

        if (!answerable) {
            hangupOffset = answerOffset;
        }

        this.state = {
            screenWidth,
            screenHeight,
            answerable,
            answerOpacity: new Animated.Value(answerable ? 1 : 0),
            answerOffset,
            hangupOffset: new Animated.Value(hangupOffset),
            transferOpacity: new Animated.Value(answerable ? 1 : 0),
            transferOffset
        }

        this._onHangupPress = this.onHangupPress.bind(this);
        this._onAnswerPress = this.onAnswerPress.bind(this);
        this._onRedirectPress = this.onRedirectPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let call = nextProps.call;

        if (call.getState() != 'PJSIP_INV_STATE_INCOMING') {
            Animated.parallel([
                Animated.timing(this.state.hangupOffset, {toValue: this.state.answerOffset})
            ]).start();

            this.setState({
                answerable: false
            });
        }
    }

    onHangupPress() {
        if (this.props.call.getState() != "PJSIP_INV_STATE_DISCONNECTED") {
            this.props.onHangupPress && this.props.onHangupPress();
        }
    }

    onAnswerPress() {
        if (this.props.call.getState() == "PJSIP_INV_STATE_INCOMING") {
            this.props.onAnswerPress && this.props.onAnswerPress();
        }
    }

    onRedirectPress() {
        if (this.props.call.getState() == "PJSIP_INV_STATE_INCOMING") {
            this.props.onRedirectPress && this.props.onRedirectPress();
        }
    }

    render() {
        let call = this.props.call;

        return (
            <View style={{width: this.state.screenWidth, flex: 1}}>

                <Animated.View style={{position: 'absolute', left: this.state.hangupOffset, height: 64, width: 64}}>
                    <TouchableOpacity onPress={this._onHangupPress} style={{width: 64, height: 64, backgroundColor: call.getState() == "PJSIP_INV_STATE_DISCONNECTED" ? "#B6B6B6" : "#FF3B30", justifyContent: 'center', alignItems: 'center', borderRadius: 64}}>
                        <Image source={require('../../assets/images/call/action-hangup.png')} />
                    </TouchableOpacity>
                </Animated.View>

                {
                    this.state.answerable && (
                        <Animated.View style={{position: 'absolute', left: this.state.answerOffset, opacity: this.state.answerOpacity, height: 64, width: 64}}>
                            <TouchableOpacity onPress={this._onAnswerPress} style={{width: 64, height: 64, backgroundColor:"#4CD964", justifyContent: 'center', alignItems: 'center', borderRadius: 64}}>
                                <Image source={require('../../assets/images/call/action-answer.png')} />
                            </TouchableOpacity>
                        </Animated.View>
                    )
                }

                {
                    this.state.answerable && (
                        <Animated.View style={{position: 'absolute', left: this.state.transferOffset, opacity: this.state.transferOpacity}}>
                            <TouchableOpacity onPress={this._onRedirectPress} style={{width: 64, height: 64, backgroundColor:"#EBAE00", justifyContent: 'center', alignItems: 'center', borderRadius: 64}}>
                                <Image source={require('../../assets/images/call/action-redirect.png')} />
                            </TouchableOpacity>
                        </Animated.View>
                    )
                }
            </View>
        )

    }
}

CallButtons.propTypes = {
    call: PropTypes.object.isRequired,
    onAnswerPress: PropTypes.func,
    onHangupPress: PropTypes.func,
    onRedirectPress: PropTypes.func
}