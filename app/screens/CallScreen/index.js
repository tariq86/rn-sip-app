import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Animated, View, Text, Dimensions} from 'react-native'
import * as Navigation from '../../modules/navigation'
import * as PjSip from '../../modules/pjsip'
import {connect} from 'react-redux'

import LinearGradient from 'react-native-linear-gradient'
import * as CallAnimation from './anim'
import CallState from '../../components/Call/CallState'
import CallInfo from '../../components/Call/CallInfo'
import CallAvatar from '../../components/Call/CallAvatar'
import CallControls from '../../components/Call/CallControls'
import CallActions from '../../components/Call/CallActions'
import CallParallelInfo from '../../components/Call/CallParallelInfo'
import TransferModal from '../../components/Call/TransferModal'
import DtmfModal from '../../components/Call/DtmfModal'
import DialerModal from '../../components/Call/DialerModal'
import IncomingCallModal from '../../components/Call/IncomingCallModal'

import s from './styles'
import cs from '../../assets/styles/containers'

class CallScreen extends Component {
  constructor(props) {
    super(props)

    const {height: screenHeight, width: screenWidth} = Dimensions.get('window')
    let call = this.props.call

    if (call instanceof Promise) {
      call.then(this.onInitializationResponse.bind(this), this.onInitializationError.bind(this))
      call = null
    }

    this.state = {
      call,
      incomingCall: null,

      isAddModalVisible: false,
      isRedirectModalVisible: false,
      isDtmfModalVisible: false,
      isTransferModalVisible: false,

      screenHeight,
      screenWidth,

      error: null,

      ...CallAnimation.calculateComponentsHeight(screenHeight)
    }

    if (call) {
      this.state = {
        ...this.state, ...CallAnimation.calculateInitialDimensions({
          ...this.state,
          totalCalls: Object.keys(props.calls).length
        }, call)
      }
    }

    this._onCallAnswer = this.onCallAnswer.bind(this)
    this._onCallHangup = this.onCallHangup.bind(this)
    this._onCallChatPress = this.onCallChatPress.bind(this)
    this._onCallMutePress = this.onCallMutePress.bind(this)
    this._onCallUnMutePress = this.onCallUnMutePress.bind(this)
    this._onCallSpeakerPress = this.onCallSpeakerPress.bind(this)
    this._onCallEarpiecePress = this.onCallEarpiecePress.bind(this)

    this._onCallHoldPress = this.onCallHoldPress.bind(this)
    this._onCallUnHoldPress = this.onCallUnHoldPress.bind(this)

    this._onCallDtmfPress = this.onCallDtmfPress.bind(this)
    this._onCallDtmfKeyPress = this.onCallDtmfKeyPress.bind(this)
    this._onCallDtmfModalClosePress = this.onCallDtmfModalClosePress.bind(this)

    this._onCallTransferPress = this.onCallTransferPress.bind(this)
    this._onCallTransferClosePress = this.onCallTransferClosePress.bind(this)
    this._onCallAttendantTransferPress = this.onCallAttendantTransferPress.bind(this)
    this._onCallBlindTransferPress = this.onCallBlindTransferPress.bind(this)

    this._onCallAddPress = this.onCallAddPress.bind(this)
    this._onCallAddClosePress = this.onCallAddClosePress.bind(this)
    this._onCallAddSubmitPress = this.onCallAddSubmitPress.bind(this)

    this._onCallRedirect = this.onCallRedirectPress.bind(this)
    this._onCallRedirectClosePress = this.onCallRedirectClosePress.bind(this)
    this._onCallRedirectSubmitPress = this.onCallRedirectSubmitPress.bind(this)

    this._onIncomingCallAnswer = this.onIncomingCallAnswer.bind(this)
    this._onIncomingCallDecline = this.onIncomingCallDecline.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // Remember latest state of current call, to be able display call information after removal from state
    if ((!this.state.call && nextProps.call && !(nextProps.call instanceof Promise)) ||
      (this.state.call && nextProps.calls.hasOwnProperty(this.state.call.getId()))) {
      const prevCall = this.state.call ? this.state.call : nextProps.call
      let call = nextProps.calls[prevCall.getId()]

      if (!call) {
        call = prevCall
      }

      const calls = Object.keys(nextProps.calls).map((key) => nextProps.calls[key])
      const init = !this.state.call && nextProps.call

      // Handle incoming call
      let incomingCall = this.state.incomingCall

      if (!incomingCall && calls.length > 1) {
        for (const c of calls) {
          if (c.getId() === call.getId()) {
            continue
          }

          if (c.getState() === "PJSIP_INV_STATE_INCOMING") {
            incomingCall = c
          }
        }
      } else if (incomingCall) {
        let exist = false

        for (const c of calls) {
          if (c.getId() === incomingCall.getId()) {
            exist = true
            break
          }
        }

        if (!exist) {
          incomingCall = null
        }
      }

      if (init) {
        this.setState({
          call, incomingCall, ...CallAnimation.calculateInitialDimensions({
            ...this.state,
            totalCalls: Object.keys(nextProps.calls).length
          }, call)
        })
      } else {
        CallAnimation.animateCallState({...this.state, totalCalls: calls.length}, call)
        this.setState({call, incomingCall})
      }

      if (call.getState() === "PJSIP_INV_STATE_DISCONNECTED") {
        this.props.onCallEnd && this.props.onCallEnd(call)
      }
    }
  }

  onInitializationResponse(call) {
    let state = {
      call: call
    }
    state = {
      ...state, ...CallAnimation.calculateInitialDimensions({
        ...this.state, ...state,
        totalCalls: Object.keys(this.props.calls).length
      }, call)
    }

    this.setState(state)
  }

  onInitializationError(reason) {
    this.setState({error: reason})
    this.props.onCallEnd && this.props.onCallEnd(this.state.call)
  }

  onCallHangup() {
    this.props.onCallHangup && this.props.onCallHangup(this.state.call)
  }

  onCallAnswer() {
    this.props.onCallAnswer && this.props.onCallAnswer(this.state.call)
  }

  onCallRedirect() {
    this.props.onCallRedirect && this.props.onCallRedirect(this.state.call)
  }

  onCallChatPress() {
    this.props.onCallChatPress && this.props.onCallChatPress(this.state.call)
  }

  onCallMutePress() {
    this.props.onCallMute && this.props.onCallMute(this.state.call)
  }

  onCallUnMutePress() {
    this.props.onCallUnMute && this.props.onCallUnMute(this.state.call)
  }

  onCallSpeakerPress() {
    this.props.onCallSpeaker && this.props.onCallSpeaker(this.state.call)
  }

  onCallEarpiecePress() {
    this.props.onCallEarpiece && this.props.onCallEarpiece(this.state.call)
  }

  onCallTransferPress() {
    // TODO: Put local call on hold while typing digits

    console.log("onCallTransferPress")
    this.setState({isTransferModalVisible: true})
  }

  onCallTransferClosePress() {
    this.setState({isTransferModalVisible: false})
  }

  onCallAttendantTransferPress(destinationCall) {
    this.setState({isTransferModalVisible: false})
    this.props.onCallAttendantTransfer && this.props.onCallAttendantTransfer(this.state.call, destinationCall)
  }

  onCallBlindTransferPress(value) {
    if (value.length > 0) {
      this.setState({isTransferModalVisible: false})
      this.props.onCallBlindTransfer && this.props.onCallBlindTransfer(this.state.call, value)
    }
  }

  onCallDtmfPress() {
    this.setState({isDtmfModalVisible: true})
  }

  onCallDtmfKeyPress(key) {
    this.props.onCallDtmf && this.props.onCallDtmf(this.state.call, key)
  }

  onCallDtmfModalClosePress() {
    this.setState({isDtmfModalVisible: false})
  }

  onCallHoldPress() {
    this.props.onCallHold && this.props.onCallHold(this.state.call)
  }

  onCallUnHoldPress() {
    this.props.onCallUnHold && this.props.onCallUnHold(this.state.call)
  }

  onCallAddPress() {
    // TODO: Put local call on hold while typing digits
    this.setState({isAddModalVisible: true})
  }

  onCallAddClosePress() {
    this.setState({isAddModalVisible: false})
  }

  onCallAddSubmitPress(destination) {
    this.setState({isAddModalVisible: false})
    this.props.onCallAdd && this.props.onCallAdd(this.state.call, destination)
  }

  onCallRedirectPress() {
    this.setState({isRedirectModalVisible: true})
  }

  onCallRedirectClosePress() {
    this.setState({isRedirectModalVisible: false})
  }

  onCallRedirectSubmitPress(destination) {
    if (destination.length > 0) {
      this.setState({isRedirectModalVisible: false})
      this.props.onCallRedirect && this.props.onCallRedirect(this.state.call, destination)
    }
  }

  onIncomingCallAnswer() {
    this.setState({incomingCall: null})
    this.props.onIncomingCallAnswer && this.props.onIncomingCallAnswer(this.state.incomingCall)
  }

  onIncomingCallDecline() {
    this.setState({incomingCall: null})
    this.props.onIncomingCallDecline && this.props.onIncomingCallDecline(this.state.incomingCall)
  }

  renderSimultaniousCalls() {
    const activeCall = this.state.call
    const result = []

    let i = 0
    for (const id in this.props.calls) {
      if (this.props.calls.hasOwnProperty(id) && id !== activeCall.getId()) {
        const call = this.props.calls[id]

        result.push((
          <CallParallelInfo
            key={"parallel-" + call.getId()}
            call={call}
            onPress={this.props.onCallSelect}
            style={{marginTop: i === 0 ? 0 : 5}}
          />
        ))
      }

      i++
    }

    return (
      <View style={{position: 'absolute', top: 5, width: this.state.screenWidth}}>
        {result}
      </View>
    )
  }

  renderError() {
    return (
      <LinearGradient colors={['#2a5743', '#14456f']} style={cs.max}>
        <View style={s.errorContainer}>
          <Text style={s.errorText}>{this.state.error}</Text>
        </View>
      </LinearGradient>
    )
  }

  renderCallWait() {
    return (
      <LinearGradient colors={['#2a5743', '#14456f']} style={cs.max}>
        <View style={s.initContainer}>
          <Text style={s.initText}>Please wait while call initialized</Text>
        </View>
      </LinearGradient>
    )
  }

  render() {
    const call = this.state.call
    const calls = this.props.calls

    if (this.state.error) {
      return this.renderError()
    }

    if (!call) {
      return this.renderCallWait()
    }

    if (this.props.isScreenLocked === true) {
      // TODO: Use overlay with absolute position for better performance
      return (
        <View style={{flex: 1, backgroundColor: "#000"}}/>
      )
    }

    return (
      <LinearGradient colors={['#2a5743', '#14456f']} style={cs.max}>
        <View style={cs.max}>
          {this.renderSimultaniousCalls()}

          <Animated.View
            style={{
              position: 'absolute',
              top: this.state.infoOffset,
              height: this.state.infoHeight,
              width: this.state.screenWidth
            }}
          >
            <CallInfo call={call}/>
          </Animated.View>

          <Animated.View
            style={{
              alignItems: 'center',
              position: 'absolute',
              top: this.state.avatarOffset,
              opacity: this.state.avatarOpacity,
              height: this.state.avatarHeight,
              width: this.state.screenWidth
            }}
          >
            <CallAvatar
              call={call}
              size={this.state.avatarHeight}
            />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: this.state.stateOffset,
              height: this.state.stateHeight,
              width: this.state.screenWidth
            }}
          >
            <CallState call={call}/>
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: this.state.actionsOffset,
              height: this.state.actionsHeight,
              opacity: this.state.actionsOpacity,
              flexDirection: 'row',
              width: this.state.screenWidth
            }}
          >
            <CallActions
              call={call}
              style={{flex: 0.7}}
              onAddPress={this._onCallAddPress}
              onChatPress={this._onCallChatPress}
              onMutePress={this._onCallMutePress}
              onUnMutePress={this._onCallUnMutePress}
              onSpeakerPress={this._onCallSpeakerPress}
              onEarpiecePress={this._onCallEarpiecePress}
              onTransferPress={this._onCallTransferPress}
              onDTMFPress={this._onCallDtmfPress}
              onHoldPress={this._onCallHoldPress}
              onUnHoldPress={this._onCallUnHoldPress}
            />
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: this.state.buttonsOffset,
              height: this.state.buttonsHeight,
              alignItems: 'center',
              width: this.state.screenWidth
            }}
          >
            <CallControls
              onAnswerPress={this._onCallAnswer}
              onHangupPress={this._onCallHangup}
              onRedirectPress={this._onCallRedirect}
              call={call}
            />
          </Animated.View>

          <DialerModal
            actions={[
              {icon: "call", text: "Call", callback: this._onCallAddSubmitPress}
            ]}
            visible={this.state.isAddModalVisible}
            onRequestClose={this._onCallAddClosePress}
          />

          <DialerModal
            actions={[
              {icon: "blind-transfer", text: "Redirect", callback: this._onCallRedirectSubmitPress}
            ]}
            theme="dark"
            visible={this.state.isRedirectModalVisible}
            onRequestClose={this._onCallRedirectClosePress}
          />

          <TransferModal
            call={call}
            calls={calls}
            visible={this.state.isTransferModalVisible}
            onRequestClose={this._onCallTransferClosePress}
            onBlindTransferPress={this._onCallBlindTransferPress}
            onAttendantTransferPress={this._onCallAttendantTransferPress}
          />

          <DtmfModal
            visible={this.state.isDtmfModalVisible}
            onRequestClose={this._onCallDtmfModalClosePress}
            onPress={this._onCallDtmfKeyPress}
          />

          <IncomingCallModal
            call={this.state.incomingCall}
            onAnswerPress={this._onIncomingCallAnswer}
            onDeclinePress={this._onIncomingCallDecline}
          />
        </View>
      </LinearGradient>
    )
  }
}

CallScreen.propTypes = {
  call: PropTypes.object,
  calls: PropTypes.object,
  isScreenLocked: PropTypes.bool,
  onCallEnd: PropTypes.func.isRequired,
  onCallAnswer: PropTypes.func.isRequired,
  onCallHangup: PropTypes.func.isRequired,
  onCallChatPress: PropTypes.func.isRequired,
  onCallSelect: PropTypes.func.isRequired,
  onCallMute: PropTypes.func.isRequired,
  onCallUnMute: PropTypes.func.isRequired,
  onCallSpeaker: PropTypes.func.isRequired,
  onCallEarpiece: PropTypes.func.isRequired,
  onCallHold: PropTypes.func.isRequired,
  onCallUnHold: PropTypes.func.isRequired,
  onCallDtmf: PropTypes.func.isRequired,
  onCallDtmfKey: PropTypes.func.isRequired,
  onCallDtmfModalClose: PropTypes.func.isRequired,
  onCallTransfer: PropTypes.func.isRequired,
  onCallTransferClose: PropTypes.func.isRequired,
  onCallAttendantTransfer: PropTypes.func.isRequired,
  onCallBlindTransfer: PropTypes.func.isRequired,
  onCallAdd: PropTypes.func.isRequired,
  onCallAddClose: PropTypes.func.isRequired,
  onCallAddSubmit: PropTypes.func.isRequired,
  onCallRedirect: PropTypes.func.isRequired,
  onCallRedirectClose: PropTypes.func.isRequired,
  onCallRedirectSubmit: PropTypes.func.isRequired,
  onIncomingCallAnswer: PropTypes.func.isRequired,
  onIncomingCallDecline: PropTypes.func.isRequired
}

function select(store) {
  return {
    calls: store.pjsip.calls,
    call: store.navigation.current.call,
    isScreenLocked: store.pjsip.isScreenLocked,
    isFromForeground: store.app.foreground
  }
}

function actions(dispatch, getState) {
  return {
    onCallEnd(call) {
      setTimeout(() => {
        dispatch(
          async function (dispatch, getState) {
            const calls = getState().pjsip.calls
            const route = getState().navigation.current
            const doDirectRoute = () => {
              // Return to previous screen once call end.
              return dispatch(Navigation.goBack())
            }
            const doRoute = (call) => {
              if (calls.hasOwnProperty(call.getId())) {
                return
              }

              // Open active call once current call ends.
              for (const id in calls) {
                if (calls.hasOwnProperty(id)) {
                  return dispatch(Navigation.goAndReplace({name: 'call', call: calls[id]}))
                }
              }

              // Return to previous screen once call end.
              return dispatch(Navigation.goBack())
            }

            if (route.name !== 'call') {
              return
            }

            if (route.call instanceof Promise) {
              route.call.then(doRoute, doDirectRoute)
            } else {
              doRoute(route.call)
            }
          }
        )
      }, 3000)
    },
    onCallHold(call) {
      dispatch(PjSip.holdCall(call))
    },
    onCallUnHold(call) {
      dispatch(PjSip.unholdCall(call))
    },
    onCallMute(call) {
      dispatch(PjSip.muteCall(call))
    },
    onCallUnMute(call) {
      dispatch(PjSip.unmuteCall(call))
    },
    onCallSpeaker(call) {
      dispatch(PjSip.useSpeaker(call))
    },
    onCallEarpiece(call) {
      dispatch(PjSip.useEarpiece(call))
    },
    onCallDtmf(call, key) {
      dispatch(PjSip.dtmfCall(call, key))
    },
    onCallBlindTransfer(call, destination) {
      dispatch(PjSip.xferCall(call, destination))
    },
    onCallAttendantTransfer(call, destinationCall) {
      dispatch(PjSip.xferReplacesCall(call, destinationCall))
    },
    onCallRedirect(call, destination) {
      dispatch(PjSip.redirectCall(call, destination))
    },
    onCallHangup(call) {
      dispatch(PjSip.hangupCall(call))
    },
    onCallAnswer(call) {
      dispatch(PjSip.answerCall(call))
    },
    onCallSelect: (call) => {
      dispatch(Navigation.goAndReplace({name: 'call', call}))
    },
    onCallAdd: (call, destination) => {
      dispatch(PjSip.makeCall(destination))
    },
    onIncomingCallAnswer(call) {
      dispatch(PjSip.answerCall(call))
      dispatch(Navigation.goAndReplace({name: 'call', call}))
    },
    onIncomingCallDecline(call) {
      dispatch(PjSip.declineCall(call))
    }
  }
}

export default connect(select, actions)(CallScreen)
