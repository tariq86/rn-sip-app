import React, { Component, PropTypes } from 'react';
import {
    Text,
    View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
//import s from '../styles/components/AccountListStyles'

export default class LinedTextInput extends Component {
    render() {
        return (
            <LinearGradient colors={['#F8F8F8', '#EDF1F4']} style={{height: 22, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                <Text style={{color: '#3F5057', fontSize: 10  }}>{this.props.title}</Text>
            </LinearGradient>
        )
    }
}

LinedTextInput.propTypes = {
    title: PropTypes.string
};



