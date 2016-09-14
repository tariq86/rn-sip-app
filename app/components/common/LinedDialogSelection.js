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
// import s from '../../styles/common/LinedTextInput'
import LinedDialogField from './LinedDialogField'

// TODO: Move styles to dedicated file

export default class LinedDialogSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this._onOkPress = this.onOkPress.bind(this);
    }

    onOkPress() {
        this.props.onChange && this.props.onChange(this.state.value);
    }

    onOptionPress(option) {
        this.setState({
            value: option
        });
    }

    renderOptions(options) {
        let result = [];

        for (let option of options) {
            result.push((
                <TouchableOpacity onPress={this.onOptionPress.bind(this, option)} key={option} style={{padding: 20, flexDirection: 'row', borderBottomWidth: 1, borderColor: "#E0E7EA"}}>
                    <Text style={{flex: 1, fontSize: 15, color: "#000"}}>{option}</Text>

                    {
                        this.state.value == option ?
                        <View style={{height: 20, width: 20, borderRadius:20, borderColor: "#3F5057", backgroundColor: "#3F5057", borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../assets/images/common/ok_white.png')} />
                        </View>
                        :
                        <View style={{height: 20, width: 20, borderRadius:20, borderColor: "#3F5057", borderWidth: 1}} />
                    }
                </TouchableOpacity>
            ));
        }

        return result;
    }

    render() {
        return (
            <LinedDialogField
                value={this.props.value}
                placeholder={this.props.placeholder}
                title={this.props.title}
                onOkPress={this._onOkPress}>

                {this.renderOptions(this.props.options)}

            </LinedDialogField>
        )
    }
}

LinedDialogSelection.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func
};
