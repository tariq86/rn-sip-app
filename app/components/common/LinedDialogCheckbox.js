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

export default class LinedDialogCheckbox extends Component {
    constructor(props) {
        super(props);

        this._onPress = this.onPress.bind(this);
    }

    onPress() {
        if (this.props.disabled) {
            return;
        }

        this.props.onChange && this.props.onChange(!this.props.value);
    }

    render() {
        let disabled = this.props.disabled;

        return (
            <TouchableOpacity onPress={this._onPress} style={[{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10}, this.props.style]}>

                <View style={{ flex: 1, justifyContent: 'center', marginRight: 10 }}>
                    <Text style={{fontSize: 16, marginBottom: 2, color: disabled ? "#CCC" : "#000"}} numberOfLines={1} ellipsizeMode="middle">
                        {this.props.title}
                    </Text>
                    <Text style={{fontSize: 10, color: disabled ? "#CCC" : "#979797", marginTop: 2}}>
                        {this.props.description}
                    </Text>
                </View>

                {
                    this.props.value ?
                        <View style={{height: 22, width: 22, borderRadius: 3, backgroundColor: disabled ? "#CCC" : "#59ACFA", alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={require('../../assets/images/common/ok_small.png')} />
                        </View>
                        :
                        <View style={{height: 22, width: 22, borderRadius: 3, backgroundColor: disabled ? "#CCC" : "#3F5057"}}>
                            <View style={{backgroundColor: "#FFF", margin: 2, width: 18, height: 18}} />
                        </View>
                }
            </TouchableOpacity>
        )
    }
}

LinedDialogCheckbox.propTypes = {
    value: PropTypes.bool.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    description: PropTypes.string,
    onChange: PropTypes.func
};
