'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    PixelRatio,
    Modal,
    Dimensions
} from 'react-native'

export default class IncomingCallModal extends Component {
    render() {
        if (!this.props.call) {
            return null;
        }

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={true}
                onRequestClose={this.props.onDeclinePress}
            >
                <View style={{backgroundColor: "rgba(0,0,0,0.5)", flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <View style={{backgroundColor: "#FFF", padding: 20}}>

                        <View style={{alignItems: 'center', justifyContent:'center'}}>
                            <Text style={{color: "#000", fontSize: 22}}>{this.props.call.getRemoteFormattedNumber()} is calling</Text>
                        </View>

                        <TouchableOpacity onPress={this.props.onAnswerPress} style={{padding: 12, marginTop: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 28, borderBottomWidth: 1, backgroundColor: "#4CD964"}}>
                            <Text style={{textAlign: 'center', flex: 1, fontSize: 18, color: "#FFF"}}>Answer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.props.onDeclinePress} style={{padding: 12, marginTop: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 28, borderBottomWidth: 1, backgroundColor: "#FF3B30"}}>
                            <Text style={{textAlign: 'center', flex: 1, fontSize: 18, color: "#FFF"}}>Decline</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        )
    }
}

IncomingCallModal.propTypes = {
    call: PropTypes.object,
    onAnswerPress: PropTypes.func,
    onDeclinePress: PropTypes.func
}