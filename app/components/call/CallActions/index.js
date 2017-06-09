import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'

import s from './styles'
import ViewPager from '../../Common/ViewPager'
import CallAction from '../CallAction'

export default class CallActions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      actionsIndex: 0
    }

    this._onAddPress = this.onAddPress.bind(this)
    this._onChatPress = this.onChatPress.bind(this)
    this._onMutePress = this.onMutePress.bind(this)
    this._onParkPress = this.onParkPress.bind(this)
    this._onMergePress = this.onMergePress.bind(this)
    this._onSpeakerPress = this.onSpeakerPress.bind(this)
    this._onTransferPress = this.onTransferPress.bind(this)
    this._onHoldPress = this.onHoldPress.bind(this)
    this._onDTMFPress = this.onDTMFPress.bind(this)
    this._onSelectedIndexChange = this.onSelectedIndexChange.bind(this)
  }

  onAddPress() {
    this.props.onAddPress && this.props.onAddPress(this.state.call)
  }

  onParkPress() {
    this.props.onParkPress && this.props.onParkPress(this.state.call)
  }

  onMergePress() {
    this.props.onMergePress && this.props.onMergePress(this.state.call)
  }

  onChatPress() {
    this.props.onChatPress && this.props.onChatPress(this.state.call)
  }

  onMutePress() {
    if (this.props.call.isMuted()) {
      this.props.onUnMutePress && this.props.onUnMutePress(this.state.call)
    } else {
      this.props.onMutePress && this.props.onMutePress(this.state.call)
    }
  }

  onSpeakerPress() {
    if (this.props.call.isSpeaker()) {
      this.props.onEarpiecePress && this.props.onEarpiecePress(this.state.call)
    } else {
      this.props.onSpeakerPress && this.props.onSpeakerPress(this.state.call)
    }
  }

  onTransferPress() {
    this.props.onTransferPress && this.props.onTransferPress(this.state.call)
  }

  onHoldPress() {
    if (this.props.call.isHeld()) {
      this.props.onUnHoldPress && this.props.onUnHoldPress(this.state.call)
    } else {
      this.props.onHoldPress && this.props.onHoldPress(this.state.call)
    }
  }

  onDTMFPress() {
    this.props.onDTMFPress && this.props.onDTMFPress(this.state.call)
  }

  onSelectedIndexChange(index) {
    this.setState({
      actionsIndex: index
    })
  }

  render() {
    const held = this.props.call.isHeld()
    const muted = this.props.call.isMuted()
    const speaker = this.props.call.isSpeaker()

    return (
      <View {...this.props.style}>
        <ViewPager
          style={{flex: 1}}
          count={2}
          selectedIndex={this.state.actionsIndex}
          onSelectedIndexChange={this._onSelectedIndexChange}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.15}}/>
            <View style={{flex: 0.7}}>
              <View style={{flexDirection: 'row'}}>
                <CallAction type="add" description="add" onPress={this._onAddPress}/>
                <View style={{flex: 0.3}}/>
                <CallAction
                  type={muted ? "unmute" : "mute"}
                  description={muted ? "unmute" : "mute"}
                  onPress={this._onMutePress}
                />
                <View style={{flex: 0.3}}/>
                <CallAction
                  type={speaker ? "speaker" : "earpiece"}
                  description="speaker"
                  onPress={this._onSpeakerPress}
                />
              </View>

              <View style={{flexDirection: 'row', marginTop: 30}}>
                <CallAction type="transfer" description="transfer" onPress={this._onTransferPress}/>
                <View style={{flex: 0.3}}/>
                <CallAction
                  type={held ? "unhold" : "hold"}
                  description={held ? "unhold" : "hold"}
                  onPress={this._onHoldPress}
                />
                <View style={{flex: 0.3}}/>
                <CallAction type="dtmf" description="dtmf" onPress={this._onDTMFPress}/>
              </View>
            </View>
            <View style={{flex: 0.15}}/>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.15}}/>
            <View style={{flex: 0.7}}>
              <View style={{flexDirection: 'row'}}>
                <CallAction type="park" description="park" onPress={this._onParkPress}/>
                <View style={{flex: 0.3}}/>
                <CallAction type="merge" description="merge" onPress={this._onMergePress}/>
                <View style={{flex: 0.3}}/>
                <CallAction type="record" description="record" onPress={this._onRecordPress}/>
              </View>
              <View style={{flexDirection: 'row', marginTop: 30}}>
                <CallAction type="chat" description="chat" onPress={this._onChatPress}/>
                <View style={{flex: 0.3}}/>
                <View style={{width: 64}}/>
                <View style={{flex: 0.3}}/>
                <View style={{width: 64}}/>
              </View>
            </View>
            <View style={{flex: 0.15}}/>
          </View>
        </ViewPager>
        <View style={s.switchContainer}>
          <View style={[{marginRight: 5}, s.switchIndicator, (this.state.actionsIndex === 0 ? s.switchActive : null)]}/>
          <View style={[{marginLeft: 5}, s.switchIndicator, (this.state.actionsIndex === 1 ? s.switchActive : null)]}/>
        </View>
      </View>
    )
  }
}

CallActions.propTypes = {
  style: View.propTypes.style,
  call: PropTypes.object.isRequired,
  onAddPress: PropTypes.func,
  onChatPress: PropTypes.func,
  onMutePress: PropTypes.func,
  onUnMutePress: PropTypes.func,
  onParkPress: PropTypes.func,
  onMergePress: PropTypes.func,
  onSpeakerPress: PropTypes.func,
  onEarpiecePress: PropTypes.func,
  onTransferPress: PropTypes.func,
  onHoldPress: PropTypes.func,
  onUnHoldPress: PropTypes.func,
  onDTMFPress: PropTypes.func,
  onSelectedIndexChange: PropTypes.func
}
