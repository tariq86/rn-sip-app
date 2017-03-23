import React, { Component, PropTypes } from 'react';
import {View, StyleSheet} from 'react-native'
import * as Navigation from '../../modules/navigation'
import {makeCall} from '../../modules/pjsip'

import Header from '../../components/Header'
import KeypadWithActions from '../../components/Call/KeypadWithActions'

import {connect} from 'react-redux'

class DialerScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Header title="Набрать номер" />

                <KeypadWithActions
                    style={{flex: 1}}
                    actions={[
                        {icon: "call", text: "Call", callback: this.props.onCallPress}
                    ]}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 49.5
    }
});

function select(store) {
    return {

    };
}

function actions(dispatch) {
    return {
        onCallPress: (destination) => {
            if (destination) {
                dispatch(makeCall(destination));
            }
        },
        onCancelPress: () => {
            dispatch(Navigation.goBack());
        }
    };
}

export default connect(select, actions)(DialerScreen);