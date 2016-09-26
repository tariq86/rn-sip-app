import React, { Component, PropTypes } from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native'

import s from './styles'

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
                <View style={s.modalBackground}>
                    <View style={s.contentBackground}>
                        <View style={s.titleContainer}>
                            <Text style={s.titleText}>{this.props.call.getRemoteFormattedNumber()} is calling</Text>
                        </View>

                        <TouchableOpacity onPress={this.props.onAnswerPress} style={[s.actionTouchable, s.actionGreen]}>
                            <Text style={s.actionText}>Answer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.props.onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
                            <Text style={s.actionText}>Decline</Text>
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