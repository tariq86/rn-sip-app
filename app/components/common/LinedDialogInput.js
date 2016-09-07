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
import LinedDialogField from './LinedDialogField'

// TODO: Move styles to dedicated file

export default class LinedDialogInput extends Component {
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
            <LinedDialogField
                ref="dialog"
                value={this.props.value}
                valueType={this.props.valueType}
                placeholder={this.props.placeholder}
                title={this.props.title}
                onOkPress={this._onModalOkPress}
            >

                <TextInput
                    style={{height: 40, paddingLeft: 12, paddingRight: 12, marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 3, backgroundColor: "#F9F9F9"}}
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

            </LinedDialogField>
        )
    }
}

LinedDialogInput.propTypes = {
    value: PropTypes.string.isRequired,
    valueType: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    style: View.propTypes.style,
    inputProps: PropTypes.object,
    onChange: PropTypes.func
};
