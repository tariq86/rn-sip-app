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


export default class DialerModal extends Component {

    render() {
        let containerStyles = this.props.theme == "dark" ? {backgroundColor:"#3f5057"} : {backgroundColor:"#fff"};
        let contentStyles = this.props.theme == "dark" ? {backgroundColor:"#3f5057"} : {backgroundColor:"#fff"};
        let touchableStyle = this.props.theme == "dark" ?  { flex: 0.1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#52636a"} :
        {flex: 0.1, backgroundColor:"#E7ECEF", borderTopWidth: 1, borderColor: "#E0E7EA", alignItems: 'center', justifyContent: 'center'};

        let touchableTextStyle = this.props.theme == "dark" ?  { color: "#FFF"} : {color: "#000"};

        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={[{flex: 1}, containerStyles]}>
                    <KeypadWithActions
                        style={[{flex: 1}, contentStyles]}
                        theme={this.props.theme}
                        actions={this.props.actions}
                    />

                    <TouchableOpacity onPress={this.props.onRequestClose} style={[null, touchableStyle]}>
                        <Text style={[{fontSize: 12}, touchableTextStyle]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

DialerModal.propTypes = {
    visible: Modal.propTypes.visible,
    theme: PropTypes.string,
    actions: PropTypes.array.isRequired,
    onRequestClose: Modal.propTypes.onRequestClose,
    onPress: PropTypes.func
}