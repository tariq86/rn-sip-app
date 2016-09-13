'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

import CallAction from './CallAction'

export default class CallActions extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

        this._onChatPress = this.onChatPress.bind(this);
        this._onMutePress = this.onMutePress.bind(this);
        this._onSpeakerPress = this.onSpeakerPress.bind(this);
        this._onTransferPress = this.onTransferPress.bind(this);
        this._onHoldPress = this.onHoldPress.bind(this);
        this._onDTMFPress = this.onDTMFPress.bind(this);
    }

    onChatPress() {
        this.props.onChatPress && this.props.onChatPress(this.state.call);
    }

    onMutePress() {
        if (this.props.call.isMuted()) {
            this.props.onUnMutePress && this.props.onUnMutePress(this.state.call);
        } else {
            this.props.onMutePress && this.props.onMutePress(this.state.call);
        }
    }

    onSpeakerPress() {
        if (this.props.call.isSpeaker()) {
            this.props.onEarpiecePress && this.props.onEarpiecePress(this.state.call);
        } else {
            this.props.onSpeakerPress && this.props.onSpeakerPress(this.state.call);
        }
    }

    onTransferPress() {
        this.props.onTransferPress && this.props.onTransferPress(this.state.call);
    }

    onHoldPress() {
        // TODO: Able to define isHeld
        if (this.props.call.isHeld()) {
            this.props.onUnHoldPress && this.props.onUnHoldPress(this.state.call);
        } else {
            this.props.onHoldPress && this.props.onHoldPress(this.state.call);
        }
    }

    onDTMFPress() {
        this.props.onDTMFPress && this.props.onDTMFPress(this.state.call);
    }

    render() {
        let held = this.props.call.isHeld();
        let muted = this.props.call.isMuted();
        let speaker = this.props.call.isSpeaker();

        return (
            <View {...this.props.style}>

                <View style={{flexDirection: 'row'}}>
                    <CallAction type="chat" description="chat" onPress={this._onChatPress} />
                    <View style={{flex: 0.3}} />
                    <CallAction type={muted ? "unmute" : "mute"} description={muted ? "unmute" : "mute"} onPress={this._onMutePress} />
                    <View style={{flex: 0.3}} />
                    <CallAction type={speaker ? "speaker" : "earpiece"} description="speaker" onPress={this._onSpeakerPress} />
                </View>

                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <CallAction type="transfer" description="transfer" onPress={this._onTransferPress} />
                    <View style={{flex: 0.3}} />
                    <CallAction type={held ? "unhold" : "hold"} description={held ? "unhold" : "hold"} onPress={this._onHoldPress} />
                    <View style={{flex: 0.3}} />
                    <CallAction type="dtmf" description="dtmf" onPress={this._onDTMFPress} />
                </View>

            </View>
        )

    }
}

CallActions.propTypes = {
    style: View.propTypes.style,
    call: PropTypes.object.isRequired
}
