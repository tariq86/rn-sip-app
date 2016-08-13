'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet,
    TabBarIOS
} from 'react-native'
import * as Navigation from '../../modules/navigation'

import {connect} from 'react-redux'

class DialerScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phone: ''
        };

        this._onKeyPress = this.onKeyPress;
    }

    onKeyPress(key) {
        this.setState({
            phone: this.state.phone + key
        });
    }

    onActionPress(type) {
        console.log("Action", type);
    }

    onCancelPress() {
        this.props.onCancelPress();
    }

    renderKey(key) {
        return (
            <TouchableHighlight style={styles.keyTouchable} key={key} onPress={this.onKeyPress.bind(this, key)}>
                <View style={styles.keyButton}>
                    <Text style={styles.keyButtonText}>
                        {key}
                    </Text>
                    <Text style={styles.keyButtonSubText}>
                        ABC
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderActionKey(type, ...desc) {
        return (
            <TouchableHighlight onPress={this.onActionPress.bind(this, type)}>
                <View style={styles.actionButtonWrapper}>
                    <View style={styles.actionButton} />
                    {
                        desc.map(function(d, i) {
                            return (
                                <Text key={i} style={styles.actionButtonDesc}>
                                    {d}
                                </Text>
                            )
                        })
                    }
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

        let desc = [
            ['', 'ABC', 'DEF'],
            ['GHI', 'JKL', 'MNO'],
            ['PQRS', 'TUV', 'WXYZ'],
            ['', '+', '']
        ];

        let keypad = [];

        for (let row of keys) {
            let buttons = [];

            for (let key of row) {
                buttons.push(this.renderKey(key));
            }

            keypad.push((
                <View key={row.join("|")} style={styles.keysRow}>
                    {buttons}
                </View>
            ));
        }

        return (
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <View style={this.state.phone.length > 0 ? styles.inputAdd : styles.inputAddHidden} />
                    <Text ellipsizeMode="head" style={styles.inputText}>{this.state.phone}</Text>
                    <View style={this.state.phone.length > 0 ? styles.inputClean : styles.inputCleanHidden} />
                </View>

                <View style={{justifyContent: 'space-around', flex: 1}}>
                    <View style={styles.keysWrapper}>
                        {keypad}
                    </View>

                    <View style={styles.actionsWrapper}>
                        <View style={styles.actionsRow}>
                            {this.renderActionKey('sms', "Отправить", 'СМС')}
                            {this.renderActionKey('call', "Совершить", 'звонок')}
                            {this.renderActionKey('chat', "Отправить", 'факс')}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
        backgroundColor: '#3f5057'
    },

    inputContainer: {
        backgroundColor: '#3c4b51',
        height: 84,
        paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        flexWrap: 'nowrap'
    },
    inputText: {
        flex: 1,
        textAlign: "center",
        fontSize: 28,
        color: "#FFF",
        fontWeight: '200'
    },
    inputAdd: {
        width: 12,
        height: 12,
        backgroundColor: "#CCC"
    },
    inputAddHidden: {
        width: 12,
        height: 12,
        backfaceVisibility: 'hidden'
    },
    inputClean: {
        width: 12,
        height: 12,
        backgroundColor: "#424242"
    },
    inputCleanHidden: {
        width: 12,
        height: 12,
        backfaceVisibility: 'hidden'
    },





    keysRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
        marginTop: 12
    },
    keysWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24
    },
    keyTouchable: {

    },
    keyButton: {
        width: 48 + 24,
        height: 48
    },
    keyButtonText: {
        fontSize: 28,
        color: "#FFF",
        fontWeight: '200',
        textAlign: "center"
    },
    keyButtonSubText: {
        fontSize: 8,
        color: "#FFF",
        fontWeight: '200',
        textAlign: "center"
    },



    actionsWrapper: {
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: 6,
        marginBottom: 6
    },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
    },
    actionButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        borderRadius: 48,
        width: 48,
        height: 48,
        backgroundColor: '#52636b',
        justifyContent: 'center'
    },
    actionButtonDesc: {
        color: "#FFF", fontSize: 10, fontWeight: '200', textAlign: 'center'
    },


    callButton: {
        borderRadius: 64, width: 64, height: 64, backgroundColor: "#4cd964", borderWidth: 0.5, justifyContent: 'center'
    },
    callButtonSubText: {
        color: "#FFF", fontSize: 14, fontWeight: '200', textAlign: 'center'
    },




    //cancelTouchable: {
    //    marginTop: 15,
    //    marginBottom: 15
    //},
    //cancelWrapper: {
    //    justifyContent: 'center'
    //},
    //cancelButton: {
    //    paddingTop: 12,
    //    paddingBottom: 12,
    //    paddingLeft: 12,
    //    paddingRight: 12
    //},
    //cancelText: {
    //    color: "#FFF", fontSize: 14, fontWeight: '200', textAlign: 'center'
    //}



});

//CallScreen.propTypes = {
//    dispatch: PropTypes.func,
//    onPress: PropTypes.func,
//    phone: PropTypes.string
//};

// function mapStateToProps(state) {
//     const {accounts} = state;
//
//     return {
//         accounts: _.values(accounts.map)
//     }
// }

DialerScreen.props = {

}

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onCancelPress: () => {
            dispatch(Navigation.goBack())
        }
    };
}

export default connect(select, actions)(DialerScreen);