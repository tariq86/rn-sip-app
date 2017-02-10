import React, { Component, PropTypes } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native'

import s from './styles'

export default class ListConfigurationInfo extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[s.container, this.props.style]}>
                <View style={s.iconContainer}>
                    <Image icon={this.props.icon} />
                </View>

                <View style={s.descriptionContainer}>
                    <Text style={s.descriptionTitle} numberOfLines={1} ellipsizeMode="middle">
                        {this.props.title}
                    </Text>
                    <Text style={s.descriptionText}>
                        {this.props.description}
                    </Text>
                </View>

                <View style={s.goContainer}>
                    <Image source={require('../../../assets/images/common/lined-goto.png')} />
                </View>
            </TouchableOpacity>
        )
    }
}

ListConfigurationInfo.propTypes = {
    style: View.propTypes.style,
    icon: Image.propTypes.source,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func
};
