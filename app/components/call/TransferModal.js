'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
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
import KeypadWithActions from './KeypadWithActions';
import DialerModal from './DialerModal';

export default class TransferModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isRedirectModalVisible: false
        };

        this._onBlindTransferRequest = this.onBlindTransferRequest.bind(this);
        this._onBlindTransferPress = this.onBlindTransferPress.bind(this);
        this._onBlindTransferClose = this.onBlindTransferClose.bind(this);
    }

    onBlindTransferRequest() {
        this.setState({
            isRedirectModalVisible: true
        })
    }

    onBlindTransferPress(value) {
        this.setState({
            isRedirectModalVisible: false
        });

        this.props.onBlindTransferPress && this.props.onBlindTransferPress(value);
    }

    onBlindTransferClose() {
        this.setState({
            isRedirectModalVisible: false
        });
        this.props.onRequestClose && this.props.onRequestClose();
    }

    renderOptions(options) {
        let result = [];

        for (let i=0; i < options.length; i++) {
            let o = options[i];
            let last = i == options.length - 1;

            result.push((
                <TouchableOpacity key={o.key} onPress={o.callback} style={{padding: 20, flexDirection: 'row', borderBottomWidth: last ? 0 : 1, borderColor: "#E0E7EA"}}>
                    <Text style={{flex: 1, fontSize: 15, color: "#000"}}>{o.title}</Text>
                </TouchableOpacity>
            ));
        }

        return result;
    }

    render() {
        if (this.props.calls.length == 1 || this.state.isRedirectModalVisible) {
            return (
                <DialerModal
                    actions={[
                        {icon: "blind-transfer", text: "Blind\nTransfer", callback: this._onBlindTransferPress}
                    ]}
                    theme="dark"
                    visible={this.props.visible}
                    onRequestClose={this._onBlindTransferClose} />
            )
        }

        let options = [];

        for (let c of this.props.calls) {
            if (c.getId() == this.props.call.getId()) {
                continue;
            }

            options.push({
                key: "merge_" + c.getId(),
                title: "Merge with " + c.getRemoteFormattedNumber(),
                callback: this.props.onAttendantTransferPress.bind(null, c)
            });
        }

        options.push({
            key: "new_call",
            title: "New call",
            callback: this._onBlindTransferRequest
        });

        return (
            <Modal
                ref="optionsModal"
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={{backgroundColor: "rgba(0,0,0,0.5)", flex: 1}}>
                    <View style={{margin: 30, marginTop: 70, backgroundColor: "#FFF", borderRadius: 8}}>

                        <View style={{padding: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: "#E0E7EA"}}>
                            <Text style={{textAlign: 'center', flex: 1, fontSize: 18}}>Transfer call</Text>
                            <TouchableOpacity onPress={this._onModalClosePress}>
                                <Image source={require('../../assets/images/modal/close-icon.png')} />
                            </TouchableOpacity>
                        </View>

                        {this.renderOptions(options)}

                    </View>
                </View>
            </Modal>
        )
    }
}

TransferModal.propTypes = {
    call: PropTypes.object.isRequired,
    calls: PropTypes.array.isRequired,
    visible: Modal.propTypes.visible,
    onRequestClose: Modal.propTypes.onRequestClose,
    onBlindTransferPress: PropTypes.func,
    onAttendantTransferPress: PropTypes.func
}