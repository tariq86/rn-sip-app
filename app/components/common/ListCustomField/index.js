import React, { Component, PropTypes } from 'react';
import {View, TouchableOpacity, Text, Modal, Image} from 'react-native'

import s from './styles'

export default class ListCustomField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            text: this.props.value
        };

        this._onModalOpenPress = this.onModalOpenPress.bind(this);
        this._onModalClosePress = this.onModalClosePress.bind(this);
        this._onModalOkPress = this.onModalOkPress.bind(this);
    }

    close() {
        this.setState({
            active: false
        });
    }

    onModalOpenPress() {
        this.setState({
            active: true
        });
    }

    onModalClosePress() {
        this.setState({
            active: false
        });
        this.props.onClosePress && this.props.onClosePress();
    }

    onModalOkPress() {
        this.setState({
            active: false
        });
        this.props.onOkPress && this.props.onOkPress();
    }

    render() {
        let value = this.props.value;
        let empty = this.props.value.length == 0;

        if (this.props.valueType == 'password') {
            value = "*".repeat(value.length)
        }

        return (
            <View>
                <TouchableOpacity style={s.listContainer} onPress={this._onModalOpenPress}>
                    <View style={s.listContent}>
                        <Text style={(empty ? s.listTitle : s.listPlaceholder)}>{this.props.title}</Text>
                        <Text style={(empty ? s.listPlaceholder : s.listTitle)}>
                            {
                                this.props.value.length > 0 ? value : this.props.placeholder
                            }
                        </Text>
                    </View>
                    <View style={s.listIconContainer}>
                        <Image source={require('../../../assets/images/common/lined-goto.png')} />
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.active}
                    onRequestClose={this._onModalClosePress}
                >
                    <View style={s.modalBackground}>
                        <View style={s.modalContent}>
                            <View style={s.modalHeader}>
                                <Text style={s.modalTitle}>{this.props.title}</Text>
                                <TouchableOpacity onPress={this._onModalClosePress}>
                                    <Image source={require('../../../assets/images/modal/close-icon.png')} />
                                </TouchableOpacity>
                            </View>

                            {this.props.children}

                            <TouchableOpacity onPress={this._onModalOkPress} style={s.modalSubmitTouchable}>
                                <Text style={s.modalSubmitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

ListCustomField.propTypes = {
    value: PropTypes.string.isRequired,
    valueType: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    onClosePress: PropTypes.func,
    onOkPress: PropTypes.func
};
