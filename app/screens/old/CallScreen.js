import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    Text,
    TextInput,
    Image,
    View
} from 'react-native'
import {connect} from 'react-redux'
import ButtonStyles from '../../styles/common/ButtonStyles'
import {
    hangupCall,
    muteCall,
    unmuteCall,
    holdCall,
    unholdCall,
    enableSpeaker,
    disableSpeaker,
    enableVideo,
    disableVideo,
    makeTransfer,
    sendDTMF
} from '../../modules/calls'

class CallScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            duration: props.call.getFormattedDuration()
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            duration: this.props.call.getFormattedDuration()
        });
    }

    render() {
        const {dispatch, call} = this.props;


        return (
            <View style={{flex: 1, alignItems: 'stretch', padding: 20}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20}}>
                    <View style={{borderRadius:96, width: 96, height: 96, backgroundColor: "#cacaca"}} />
                    <View style={{marginTop: 20, alignItems: 'center'}}>
                        <Text style={{fontSize: 21, color: "#424242", fontWeight: 'bold'}}>{call.get('remoteUri')}</Text>
                        <Text ref="durationText" style={{fontSize: 16, color: "#666", marginTop: 5}}>{this.state.duration}</Text>
                        <Text style={{fontSize: 12, color: "#999", marginTop: 2}}>{call.get('state')}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableHighlight onPress={() => dispatch(muteCall(call))}>
                        <View style={{width: 84, backgroundColor: "#CCC", alignItems: 'center'}}>
                            <View style={{ width: 28, height: 28, backgroundColor: "#d1d1d1", borderRadius: 28 }} />
                            <Text>Mute</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => dispatch(enableSpeaker(call))}>
                        <View style={{width: 84, backgroundColor: "#CCC", alignItems: 'center'}}>
                            <View style={{ width: 28, height: 28, backgroundColor: "#d1d1d1", borderRadius: 28 }} />
                            <Text>Speaker</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => dispatch(enableVideo(call))}>
                        <View style={{width: 84, backgroundColor: "#CCC", alignItems: 'center'}}>
                            <View style={{ width: 28, height: 28, backgroundColor: "#d1d1d1", borderRadius: 28 }} />
                            <Text>Video</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableHighlight>
                        <View style={{width: 84, backgroundColor: "#CCC", alignItems: 'center'}}>
                            <View style={{ width: 28, height: 28, backgroundColor: "#d1d1d1", borderRadius: 28 }} />
                            <Text>Transfer</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => holdCall(call)}>
                        <View style={{width: 84, backgroundColor: "#CCC", alignItems: 'center'}}>
                            <View style={{ width: 28, height: 28, backgroundColor: "#d1d1d1", borderRadius: 28 }} />
                            <Text>Hold</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <View style={{width: 84, backgroundColor: "#CCC", alignItems: 'center'}}>
                            <View style={{ width: 28, height: 28, backgroundColor: "#d1d1d1", borderRadius: 28 }} />
                            <Text>Keyboard</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight style={{marginTop: 40}} onPress={() => dispatch(hangupCall(call))}>
                    <View style={ButtonStyles.actionButtonWithPadding}>
                        <Text pointerEvents="none" style={ButtonStyles.text}>
                            Hangup
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

CallScreen.propTypes = {
    dispatch: PropTypes.func,
    call: PropTypes.object
};


function mapStateToProps(state) {
    const {current} = state.navigation;
    return {
        call: current.call
    }
}

export default connect(mapStateToProps)(CallScreen)