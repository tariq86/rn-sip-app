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
import s from '../../styles/common/LinedTextInput'
import LinedTextInput from './LinedTextInput'

export default class LinedDialogInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            text: this.props.value
        }

        this._onModalOpenPress = this.onModalOpenPress.bind(this);
        this._onModalClosePress = this.onModalClosePress.bind(this);
        this._onModalOkPress = this.onModalOkPress.bind(this);
        this._onTextChanged = this.onTextChanged.bind(this);
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
    }

    onModalOkPress() {
        this.setState({
            active: false
        });

        this.props.onChange && this.props.onChange(this.state.text);
    }

    onTextChanged(text) {
        this.setState({
            text: text
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10 }} onPress={this._onModalOpenPress}>
                    <View style={{ flex: 1, }}>
                        <Text style={{fontSize: (this.props.value.length > 0 ? 10 : 16), color: "#000"}}>{this.props.title}</Text>
                        <Text style={{fontSize: (this.props.value.length > 0 ? 16 : 10), color: "#666"}}>
                            {
                                this.props.value.length > 0 ? this.props.value : this.props.placeholder
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

                            <Text style={{fontSize: 14, color: "#666", marginTop: 20, marginLeft: 20, marginRight: 20}}>
                                {
                                    'Proxy domain/ip and port\n(e.g. 192.168.31.50:5060)'
                                }
                            </Text>

                            <TextInput
                                style={{marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 3, backgroundColor: "#F9F9F9"}}

                                ref="input"
                                placeholderTextColor="#ADADAD"
                                placeholder={this.props.placeholder}
                                value={this.state.text}
                                underlineColorAndroid="transparent"
                                numberOfLines={1}
                                onChangeText={this._onTextChanged}
                            />

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

LinedTextInput.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    style: View.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    inputProps: PropTypes.object,
    onChange: PropTypes.func
};
