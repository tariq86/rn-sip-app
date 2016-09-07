import React, { Component, PropTypes } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import s from '../../styles/common/LinedTextInput'

export default class LinedTextInput extends Component {
    constructor(props) {
        super(props);

        // TODO: Replace arrow functions in render to bind'ed ones

        this.state = {
            active: false,
            text: this.props.value
        }
    }

    _onInputEndEditing() {
        this.setState({active: false});
    }

    _onInputFocus() {
        this.setState({active: true});
    }

    _onClearPress() {
        this.props.onChangeText && this.props.onChangeText("")
    }

    focus() {
        this.refs.input.focus();
    }

    render() {
        return (
            <View style={[s.wrapper, (this.state.active ? s.wrapperActive : {}), this.props.style]}>
                <TextInput
                    autoFocus={this.props.autoFocus}
                    ref="input"
                    style={[s.input, this.props.inputStyle]}
                    placeholderTextColor="#ADADAD"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    onFocus={() => this._onInputFocus()}
                    onEndEditing={() => this._onInputEndEditing()}
                    onChangeText={this.props.onChangeText}
                />
                {
                    this.props.value && this.props.value.length > 0 ?
                    <TouchableOpacity onPress={() => this._onClearPress()}>
                        <View style={s.clear}>
                            <Image source={require('../../assets/images/common/lined-text-input-clear.png')} />
                        </View>
                    </TouchableOpacity> : null
                }
            </View>
        )
    }
}

LinedTextInput.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    style: View.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    autoFocus: TextInput.propTypes.autoFocus,
    inputProps: PropTypes.object,
    onChangeText: PropTypes.func
};
