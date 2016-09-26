import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image
} from 'react-native'
import s from './styles';

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

        let icon = call.isHeld() ? require('../../../assets/images/call/icon-paused.png') : require('../../../assets/images/call/icon-active.png');

        return (
            <TouchableOpacity style={[s.container, this.props.style]} onPress={this._onPress}>
                <Image style={s.icon} source={icon} />
                <Text numberOfLines={1} style={s.description}>{description}</Text>
                <TextInput ref="status" underlineColorAndroid="transparent" numberOfLines={1} editable={false} style={s.duration} value={duration} />
            </TouchableOpacity>
        )

    }
}

CallParallelInfo.propTypes = {
    style: View.propTypes.style,
    call: PropTypes.object.isRequired,
    onPress: PropTypes.func
}