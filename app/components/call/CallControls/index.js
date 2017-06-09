import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, Dimensions, Animated, View, Image} from 'react-native'
import s from './styles'

export default class CallControls extends Component {

  constructor(props) {
    super(props)

    const call = props.call
    const {height: screenHeight, width: screenWidth} = Dimensions.get('window')
    const answerable = call.getState() == "PJSIP_INV_STATE_INCOMING"

    const space = (screenWidth - 64 * 3) / 4
    let hangupOffset = space
    const answerOffset = hangupOffset + 64 + space
    const transferOffset = answerOffset + 64 + space

    if (!answerable) {
      hangupOffset = answerOffset
    }

    this.state = {
      screenWidth,
      screenHeight,
      answerable,
      answerOpacity: new Animated.Value(answerable ? 1 : 0),
      answerOffset,
      hangupOffset: new Animated.Value(hangupOffset),
      transferOpacity: new Animated.Value(answerable ? 1 : 0),
      transferOffset
    }

    this._onHangupPress = this.onHangupPress.bind(this)
    this._onAnswerPress = this.onAnswerPress.bind(this)
    this._onRedirectPress = this.onRedirectPress.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const call = nextProps.call

    if (call.getState() != 'PJSIP_INV_STATE_INCOMING') {
      Animated.parallel([
        Animated.timing(this.state.hangupOffset, {toValue: this.state.answerOffset})
      ]).start()

      this.setState({
        answerable: false
      })
    }
  }

  onHangupPress() {
    if (this.props.call.getState() != "PJSIP_INV_STATE_DISCONNECTED") {
      this.props.onHangupPress && this.props.onHangupPress()
    }
  }

  onAnswerPress() {
    if (this.props.call.getState() == "PJSIP_INV_STATE_INCOMING") {
      this.props.onAnswerPress && this.props.onAnswerPress()
    }
  }

  onRedirectPress() {
    if (this.props.call.getState() == "PJSIP_INV_STATE_INCOMING") {
      this.props.onRedirectPress && this.props.onRedirectPress()
    }
  }

  render() {
    const call = this.props.call

    return (
      <View style={[s.container, {width: this.state.screenWidth}]}>
        <Animated.View style={[{left: this.state.hangupOffset}, s.buttonContainer]}>
          <TouchableOpacity
            onPress={this._onHangupPress}
            style={[s.buttonTouchable, (call.getState() == "PJSIP_INV_STATE_DISCONNECTED" ? s.buttonDisabled : s.buttonRed)]}
          >
            <Image source={require('../../../assets/images/call/action-hangup.png')}/>
          </TouchableOpacity>
        </Animated.View>

        {
          this.state.answerable && (
            <Animated.View
              style={[{left: this.state.answerOffset, opacity: this.state.answerOpacity}, s.buttonContainer]}
            >
              <TouchableOpacity onPress={this._onAnswerPress} style={[s.buttonTouchable, s.buttonGreen]}>
                <Image source={require('../../../assets/images/call/action-answer.png')}/>
              </TouchableOpacity>
            </Animated.View>
          )
        }

        {
          this.state.answerable && (
            <Animated.View
              style={[{left: this.state.transferOffset, opacity: this.state.transferOpacity}, s.buttonContainer]}
            >
              <TouchableOpacity onPress={this._onRedirectPress} style={[s.buttonTouchable, s.buttonYellow]}>
                <Image source={require('../../../assets/images/call/action-redirect.png')}/>
              </TouchableOpacity>
            </Animated.View>
          )
        }
      </View>
    )

  }
}

CallControls.propTypes = {
  call: PropTypes.object.isRequired,
  onAnswerPress: PropTypes.func,
  onHangupPress: PropTypes.func,
  onRedirectPress: PropTypes.func
}
