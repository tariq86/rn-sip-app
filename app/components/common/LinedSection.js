import React, { Component, PropTypes } from 'react';
import {
    Text,
    View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import s from '../../styles/common/LinedSection'

export default class LinedTextInput extends Component {
    render() {
        return (
            <LinearGradient colors={['#F8F8F8', '#EDF1F4']} style={s.gradient}>
                <Text style={s.text}>{this.props.title}</Text>
            </LinearGradient>
        )
    }
}

LinedTextInput.propTypes = {
    title: PropTypes.string
};



