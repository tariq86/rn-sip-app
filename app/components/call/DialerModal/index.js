import React, { Component, PropTypes } from 'react'
import {TouchableOpacity, View, Text, Modal} from 'react-native'

import s from './styles'

import KeypadWithActions from '../KeypadWithActions'

export default class DialerModal extends Component {

    render() {
        let containerStyles = this.props.theme == "dark" ? s.containerDarkStyle : s.containerStyle;
        let contentStyles = this.props.theme == "dark" ? s.containerDarkStyle : s.containerStyle;
        let touchableStyle = this.props.theme == "dark" ?  s.touchableDarkStyle : s.touchableStyle;
        let touchableTextStyle = this.props.theme == "dark" ? s.touchableTextDarkStyle : s.touchableTextStyle;

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
                        <Text style={[s.touchableText, touchableTextStyle]}>Cancel</Text>
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