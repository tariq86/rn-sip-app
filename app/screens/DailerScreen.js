import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    Text,
    TextInput,
    Image,
    View
} from 'react-native'
import {connect} from 'react-redux'
import ButtonStyles from '../styles/common/ButtonStyles'
import {makeCall} from '../modules/calls'

class DailerScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phone: ''
        };

        this._onKeyPress = this.onKeyPress;
    }

    onCallPress() {
        if (this.state.phone) {
            this.props.dispatch(makeCall(this.state.phone));
        }
    }

    onKeyPress(key) {
        this.setState({
            phone: this.state.phone + key
        });
        // this.displayText.setProps();
    }

    renderKey(key) {
        return (
            <TouchableHighlight key={key} style={{  }} onPress={this.onKeyPress.bind(this, key)}>
                <View style={{ borderRadius: 64, width: 64, height: 64, borderColor: "#cdd6e0", borderWidth: 0.5, justifyContent: 'center' }}>
                    <Text style={{ color: "#2d547b", fontSize: 21, fontWeight: '200', textAlign: 'center' }}>
                        {key}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        let keys = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['*', '0', '#']
        ];

        let keypad = [];

        for (let row of keys) {
            let buttons = [];

            for (let key of row) {
                buttons.push(this.renderKey(key));
            }

            keypad.push((
                <View key={row.join("|")} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "stretch"}}>
                    {buttons}
                </View>
            ));
        }

        return (
            <View style={{padding: 20, flex: 1}}>

                <View style={{height: 64, backgroundColor: "#F9F9F9"}}>
                    <Text ref="displayText" style={{textAlign: "center", fontSize:21, color: "#424242"}}>{this.state.phone}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    {keypad}
                </View>

                <TouchableHighlight style={{marginTop: 15}} onPress={() => this.onCallPress()}>
                    <View style={ButtonStyles.actionButtonWithPadding}>
                        <Text style={ButtonStyles.text}>
                            Call
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

DailerScreen.propTypes = {
    dispatch: PropTypes.func,
    onPress: PropTypes.func,
    phone: PropTypes.string
};

// function mapStateToProps(state) {
//     const {accounts} = state;
//
//     return {
//         accounts: _.values(accounts.map)
//     }
// }

export default connect()(DailerScreen)
