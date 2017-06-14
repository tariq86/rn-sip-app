import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Image, Dimensions} from 'react-native'
import {noop} from 'lodash'
import Keypad from '../Keypad'
import KeypadInputText from '../KeypadInputText'

import sk from '../Keypad/styles'
import s, {inputStyle, textStyle, keyUnderlayColor} from './styles'

export default class KeypadWithActions extends Component {

  constructor(props) {
    super(props)

    const {height, width} = Dimensions.get('window')
    const ratio = height / width

    this.state = {
      value: '',
      actionSize: false,
      heightRatio: ratio * ratio
    }

    this._onClearPress = this.onClearPress.bind(this)
    this._onBackspacePress = this.onBackspacePress.bind(this)
    this._onKeyPress = this.onKeyPress.bind(this)
    this._onDefineKeySize = this.onDefineKeySize.bind(this)
  }


  onBackspacePress() {
    this.setState({
      value: this.state.value.substr(0, this.state.value.length - 1)
    })
  }

  onClearPress() {
    this.setState({
      value: ''
    })
  }

  onKeyPress(key) {
    this.setState({
      value: this.state.value + key
    })
  }

  onDefineKeySize({width}) {
    this.setState({actionSize: width})
  }

  // TODO: Move to dedicated component
  renderActionKey(type, description, callback = noop) {
    let icon = null
    const actionTouchableStyle = this.props.theme === "dark" ? s.actionDarkTouchable : null
    const actionTextStyle = this.props.theme === "dark" ? s.actionDarkText : null

    switch (type) {
      case 'fax':
        icon = require('../../../assets/images/keypad/fax-icon.png')
        break
      case 'call':
        icon = require('../../../assets/images/keypad/call-icon.png')
        break
      case 'message':
        icon = require('../../../assets/images/keypad/message-icon.png')
        break
      case 'redirect':
        icon = require('../../../assets/images/call/action-redirect.png')
        break
      case 'attendant-transfer':
        icon = require('../../../assets/images/call/action-attendant-transfer-icon.png')
        break
      case 'blind-transfer':
        icon = require('../../../assets/images/call/action-blind-transfer.png')
        break
    }

    if (!this.state.actionSize) {
      return (
        <View key={"action" + type} style={{flex: 0.202}}/>
      )
    }

    const touchableStyles = [{
      width: this.state.actionSize - 10,
      height: this.state.actionSize - 10
    }, s.actionTouchable, actionTouchableStyle]

    if (type === 'call') {
      touchableStyles.push(s.actionGreenTouchable)
    }

    return (
      <View key={"action" + type} style={s.action}>
        <TouchableOpacity onPress={() => {callback(this.state.value)}} style={touchableStyles}>
          <Image source={icon}/>
        </TouchableOpacity>
        <Text style={[s.actionText, actionTextStyle]}>{description}</Text>
      </View>
    )
  }

  render() {
    const {theme} = this.props
    const {heightRatio} = this.state
    const actions = []

    if (this.props.actions.length === 3) {
      const a = this.props.actions
      actions.push(<View key='view-1' style={sk.outerLineOffset}/>)
      actions.push(this.renderActionKey(a[0]['icon'], a[0]['text'], a[0]['callback']))
      actions.push(<View key='view-2' style={sk.innerLineOffset}/>)
      actions.push(this.renderActionKey(a[1]['icon'], a[1]['text'], a[1]['callback']))
      actions.push(<View key='view-3' style={sk.innerLineOffset}/>)
      actions.push(this.renderActionKey(a[2]['icon'], a[2]['text'], a[2]['callback']))
      actions.push(<View key='view-4' style={sk.outerLineOffset}/>)
    } else {
      for (const action of this.props.actions) {
        actions.push(this.renderActionKey(action['icon'], action['text'], action['callback']))
      }
    }

    return (
      <View style={this.props.style}>
        <KeypadInputText
          style={inputStyle(heightRatio, theme)}
          textStyle={textStyle(theme)}
          value={this.state.value}
          onBackspacePress={this._onBackspacePress}
          onClearPress={this._onClearPress}
        />
        <View style={{flex: 0.02 * this.state.heightRatio}}/>
        <Keypad style={{flex: 0.75}}
                keyUnderlayColor={keyUnderlayColor(theme)}
                keyTextStyle={textStyle(theme)}
                onKeyPress={this._onKeyPress}
                onDefineKeySize={this._onDefineKeySize}
        />
        <View style={{flex: 0.02 * this.state.heightRatio}}/>
        <View style={s.actionsWrapper}>
          {actions}
        </View>
        <View style={{flex: 0.02 * this.state.heightRatio}}/>
      </View>
    )
  }
}

KeypadWithActions.propTypes = {
  style: View.propTypes.style,
  actions: PropTypes.array,
  theme: PropTypes.string
}
