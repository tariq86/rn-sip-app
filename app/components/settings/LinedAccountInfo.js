import React, { Component, PropTypes } from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

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
        return (
            <View style={[{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10}, this.props.style]}>

                <View style={{backgroundColor: "#DAA2E5", height: 48, width: 48, borderRadius: 48, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: "#FFF"}}>CR</Text>
                    <View style={{backgroundColor: '#34D023', borderWidth: 3, borderColor: "#FFF",  width: 18, height: 18, borderRadius: 12, position:'absolute', right: 0, bottom: 0}}></View>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{fontSize: 16, marginBottom: 2}}>1000@carusto.com</Text>
                    <Text style={{fontSize: 9, color: "#979797", marginTop: 2}}>Disabled</Text>
                </View>

                <View style={{justifyContent: 'center'}}>
                    <Image source={require('../../assets/images/common/lined-goto.png')} />
                </View>
            </View>
        )
    }
}

// TODO: Add account registraition and detials as props

LinedAccountInfo.propTypes = {
    style: View.propTypes.style,
    onPress: PropTypes.func
};
