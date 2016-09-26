import React, { Component, PropTypes } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native'

import colorify from '../../../utils/colorify';
import abbr from '../../../utils/abbr';

import s from './styles'

export default class ListAccountInfo extends Component {
    render() {
        let acc = this.props.account;
        let registration = acc.getRegistration();

        let accountColor = colorify(acc.getName());
        let presenceColor = registration.isActive() && registration.getStatusText() == "OK" ? "#34D023" : "#CCC";
        let status = registration.getStatusText();

        if (this.props.connectivity === false) {
            status = "No connectivity or Limited";
        }

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[s.container, this.props.style]}>
                <View style={[s.abbrContainer, {backgroundColor: accountColor}]}>
                    <Text style={s.abbrText}>{abbr(acc.getName())}</Text>
                    <View style={[s.abbrPresence, {backgroundColor: presenceColor}]} />
                </View>

                <View style={s.infoContainer}>
                    <Text style={s.infoTitle} numberOfLines={1} ellipsizeMode="middle">{acc.getURI()}</Text>
                    <Text style={s.infoStatus}>{status}</Text>
                </View>

                <View style={s.goContainer}>
                    <Image source={require('../../../assets/images/common/lined-goto.png')} />
                </View>
            </TouchableOpacity>
        )
    }
}

ListAccountInfo.propTypes = {
    style: View.propTypes.style,
    account: PropTypes.object,
    connectivity: PropTypes.bool,
    onPress: PropTypes.func
};
