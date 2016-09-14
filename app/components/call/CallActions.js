'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'
import ViewPager from '../common/ViewPager';

import CallAction from './CallAction'

export default class CallActions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionsIndex: 0
        };

        this._onAddPress = this.onAddPress.bind(this);
        this._onChatPress = this.onChatPress.bind(this);
        this._onMutePress = this.onMutePress.bind(this);
        this._onParkPress = this.onParkPress.bind(this);
        this._onMergePress = this.onMergePress.bind(this);
        this._onSpeakerPress = this.onSpeakerPress.bind(this);
        this._onTransferPress = this.onTransferPress.bind(this);
        this._onHoldPress = this.onHoldPress.bind(this);
        this._onDTMFPress = this.onDTMFPress.bind(this);
        this._onSelectedIndexChange = this.onSelectedIndexChange.bind(this);
    }

    onAddPress() {
        this.props.onAddPress && this.props.onAddPress(this.state.call);
    }

    onParkPress() {

    }

    onMergePress() {

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

    onSelectedIndexChange(index) {
        this.setState({
            actionsIndex: index
        });
    }

    render() {
        let held = this.props.call.isHeld();
        let muted = this.props.call.isMuted();
        let speaker = this.props.call.isSpeaker();

        return (
            <View {...this.props.style}>
                <ViewPager style={{flex: 1}} count={2} selectedIndex={this.state.actionsIndex} onSelectedIndexChange={this._onSelectedIndexChange}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.15}} />
                        <View style={{flex: 0.7}}>
                            <View style={{flexDirection: 'row'}}>
                                <CallAction type="add" description="add" onPress={this._onAddPress} />
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
                        <View style={{flex: 0.15}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.15}} />
                        <View style={{flex: 0.7}}>
                            <View style={{flexDirection: 'row'}}>
                                <CallAction type="park" description="park" onPress={this._onParkPress} />
                                <View style={{flex: 0.3}} />
                                <CallAction type="merge" description="merge" onPress={this._onMergePress} />
                                <View style={{flex: 0.3}} />
                                <CallAction type="record" description="record" onPress={this._onRecordPress} />
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 30}}>
                                <CallAction type="chat" description="chat" onPress={this._onChatPress} />
                                <View style={{flex: 0.3}} />
                                <View style={{width: 64}} />
                                <View style={{flex: 0.3}} />
                                <View style={{width: 64}} />
                            </View>
                        </View>
                        <View style={{flex: 0.15}} />
                    </View>
                </ViewPager>
                <View style={{height: 10, alignItems: 'center', justifyContent:'center', flexDirection: 'row'}}>
                    <View style={{width: 8, height: 8, backgroundColor: (this.state.actionsIndex == 0 ? "#FFF" : "rgba(255,255,255,0.4)"), borderRadius: 8, marginRight: 5}} />
                    <View style={{width: 8, height: 8, backgroundColor: (this.state.actionsIndex == 1 ? "#FFF" : "rgba(255,255,255,0.4)"), borderRadius: 8, marginLeft: 5}}/>
                </View>
            </View>
        )

    }
}

CallActions.propTypes = {
    style: View.propTypes.style,
    call: PropTypes.object.isRequired
}
