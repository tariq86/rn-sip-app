import React, { Component, PropTypes } from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import colorify from '../../utils/colorify';
import abbr from '../../utils/abbr';

// import s from '../../styles/common/LinedTextInput'

export default class LinedAccountInfo extends Component {
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

    render() {
        let acc = this.props.account;
        let registration = acc.getRegistration();

        let accountColor = colorify(acc.getName());
        let presenceColor = registration.getStatus() == "OK" ? "#34D023" : "#CCC";

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10}, this.props.style]}>

                <View style={{backgroundColor: accountColor, height: 48, width: 48, borderRadius: 48, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFF"}}>{abbr(acc.getName())}</Text>
                    <View style={{backgroundColor: presenceColor, borderWidth: 3, borderColor: "#FFF",  width: 18, height: 18, borderRadius: 12, position:'absolute', right: 0, bottom: 0}} />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{fontSize: 16, marginBottom: 2}} numberOfLines={1} ellipsizeMode="middle">
                        {
                            acc.getURI()
                        }
                    </Text>
                    <Text style={{fontSize: 10, color: "#979797", marginTop: 2}}>
                        {
                            registration.getStatusText()
                        }
                    </Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                    <Image source={require('../../assets/images/common/lined-goto.png')} />
                </View>
            </TouchableOpacity>
        )
    }
}

// TODO: Add account registraition and detials as props

LinedAccountInfo.propTypes = {
    style: View.propTypes.style,
    account: PropTypes.object,
    onPress: PropTypes.func
};
