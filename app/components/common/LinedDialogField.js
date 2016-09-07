import React, { Component, PropTypes } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Modal,
    Image
} from 'react-native'
import LinedTextInput from './LinedTextInput'

// TODO: Move styles to dedicated file

export default class LinedDialogField extends Component {
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
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10 }} onPress={this._onModalOpenPress}>
                    <View style={{ flex: 1, }}>
                        <Text style={{fontSize: (empty ? 16 : 10), color: (empty ? "#000" : "#666")}}>{this.props.title}</Text>
                        <Text style={{fontSize: (empty ? 10 : 16), color: (empty ? "#666" : "#000")}}>
                            {
                                this.props.value.length > 0 ? value : this.props.placeholder
                            }
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Image source={require('../../assets/images/common/lined-goto.png')} />
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.active}
                    onRequestClose={this._onModalClosePress}
                >
                    <View style={{backgroundColor: "rgba(0,0,0,0.5)", flex: 1}}>

                        <View style={{margin: 30, marginTop: 70, backgroundColor: "#FFF", borderRadius: 8}}>

                            <View style={{padding: 12, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: "#E0E7EA"}}>
                                <Text style={{textAlign: 'center', flex: 1, fontSize: 18}}>{this.props.title}</Text>
                                <TouchableOpacity onPress={this._onModalClosePress}>
                                    <Image source={require('../../assets/images/modal/close-icon.png')} />
                                </TouchableOpacity>
                            </View>

                            {this.props.children}

                            <TouchableOpacity onPress={this._onModalOkPress} style={{margin: 20, height: 40, borderRadius: 3, flex: 0.5, paddingTop: 8, paddingBottom: 8, backgroundColor: "#4ea1ef", alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 12, color: "#FFF"}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

LinedDialogField.propTypes = {
    value: PropTypes.string.isRequired,
    valueType: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    onClosePress: PropTypes.func,
    onOkPress: PropTypes.func
};
