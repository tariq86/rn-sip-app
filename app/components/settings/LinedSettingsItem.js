import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

// import s from '../../styles/common/LinedTextInput'

export default class LinedSettingsItem extends Component {

    render() {

        console.log("this.props.icon", this.props.icon);

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10}, this.props.style]}>

                <View style={{height: 48, width: 48, backgroundColor: "#333", alignItems: 'center', justifyContent: 'center'}}>
                    <Image icon={this.props.icon} />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{fontSize: 16, marginBottom: 2}} numberOfLines={1} ellipsizeMode="middle">
                        {this.props.title}
                    </Text>
                    <Text style={{fontSize: 10, color: "#979797", marginTop: 2}}>
                        {this.props.description}
                    </Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                    <Image source={require('../../assets/images/common/lined-goto.png')} />
                </View>
            </TouchableOpacity>
        )
    }
}

LinedSettingsItem.propTypes = {
    style: View.propTypes.style,
    icon: Image.propTypes.source,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func
};
