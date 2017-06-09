import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Image} from 'react-native'

import s from './styles'

const CallAction = ({type, description, onPress}) => {
  let icon = null
  let toggle = false

  switch (type) {
    case 'chat':
      icon = require('../../../assets/images/call/action-chat.png')
      break
    case 'add':
      icon = require('../../../assets/images/call/action-add.png')
      break
    case 'earpiece':
      icon = require('../../../assets/images/call/action-speaker.png')
      break
    case 'speaker':
      icon = require('../../../assets/images/call/action-speaker-active.png')
      toggle = true
      break
    case 'merge':
      icon = require('../../../assets/images/call/action-merge.png')
      break
    case 'dtmf':
      icon = require('../../../assets/images/call/action-dtmf.png')
      break
    case 'mute':
      icon = require('../../../assets/images/call/action-mute.png')
      break
    case 'unmute':
      icon = require('../../../assets/images/call/action-mute-active.png')
      toggle = true
      break
    case 'hold':
      icon = require('../../../assets/images/call/action-hold.png')
      break
    case 'unhold':
      icon = require('../../../assets/images/call/action-hold-active.png')
      toggle = true
      break
    case 'park':
      icon = require('../../../assets/images/call/action-park.png')
      break
    case 'transfer':
      icon = require('../../../assets/images/call/action-transfer.png')
      break
    case 'record':
      icon = require('../../../assets/images/call/action-record.png')
      break
  }

  return (
    <View style={s.container}>
      <TouchableOpacity
        style={(toggle ? [s.touchable, s.touchableActive] : [s.touchable, s.touchableInactive])}
        onPress={onPress}
      >
        <Image resizeMode="contain" style={s.image} source={icon}/>
      </TouchableOpacity>
      <Text style={s.text}>{description}</Text>
    </View>
  )
}

CallAction.propTypes = {
  style: View.propTypes.style,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

export default CallAction
