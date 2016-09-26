import React, { Component, PropTypes } from 'react';
import {TextInput, View, Text, Image} from 'react-native'

import ListCustomField from '../ListCustomField'
import s from './styles'

export default class ListTextField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this._onTextChanged = this.onTextChanged.bind(this);
        this._onModalOkPress = this.onModalOkPress.bind(this);
        this._onSubmitPress = this.onSubmitPress.bind(this);
    }

    onModalOkPress() {
        this.props.onChange && this.props.onChange(this.state.value);
    }

    onTextChanged(value) {
        this.setState({
            value: value
        });
    }

    onSubmitPress() {
        this.refs.dialog.close();
        this.props.onChange && this.props.onChange(this.state.value);
    }

    render() {
        return (
            <ListCustomField
                ref="dialog"
                value={this.props.value}
                valueType={this.props.valueType}
                placeholder={this.props.placeholder}
                title={this.props.title}
                onOkPress={this._onModalOkPress}
            >

                <TextInput
                    style={s.input}
                    ref="input"
                    onSubmitEditing={this._onSubmitPress}
                    autoFocus={true}
                    placeholderTextColor="#ADADAD"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    onChangeText={this._onTextChanged}
                    {...this.props.inputProps}
                />

            </ListCustomField>
        )
    }
}

ListTextField.propTypes = {
    value: PropTypes.string.isRequired,
    valueType: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    style: View.propTypes.style,
    inputProps: PropTypes.object,
    onChange: PropTypes.func
};
