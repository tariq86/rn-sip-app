'use strict';

import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image
} from 'react-native'

// import s from '../../styles/components/call/KeypadInputTextStyles';

export default class CallParallelInfo extends Component {

    constructor(props) {
        super(props);

        let timer = setInterval(() => {this.onTick()}, 1000);

        this.state = {
            timer: timer
        };

        this._onPress = this.onPress.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    onTick() {
        if (this.props.call.getState() == "PJSIP_INV_STATE_CONFIRMED") {
            this.refs.status.setNativeProps({ text: this.props.call.getFormattedConnectDuration() });
        }
    }

    onPress() {
        this.props.onPress && this.props.onPress(this.props.call);
    }

    render() {
        let call = this.props.call;
        let description = call.getRemoteFormattedNumber();
        let duration = "";

        if (call.getState() == 'PJSIP_INV_STATE_CONFIRMED') {
            duration = call.getFormattedConnectDuration();
        }

        let icon = call.isHeld() ? require('../../assets/images/call/icon-paused.png') : require('../../assets/images/call/icon-active.png');

        return (
            <TouchableOpacity style={[{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.1)", padding: 5, paddingLeft: 16, paddingRight: 16}, this.props.style]} onPress={this._onPress}>
                <Image style={{marginLeft: 16}} source={icon} />
                <Text numberOfLines={1} style={{fontSize: 18, color: "#FFF", flex: 1, marginLeft: 26, marginRight: 16}}>{description}</Text>
                <TextInput ref="status" underlineColorAndroid="transparent" numberOfLines={1} editable={false} style={{textAlign: 'right', width: 70, fontSize: 16, color: "#FFF", padding: 0, margin: 0}} value={duration} />
            </TouchableOpacity>
        )

    }
}

CallParallelInfo.propTypes = {
    style: View.propTypes.style,
    call: PropTypes.object.isRequired,
    onPress: PropTypes.func
}