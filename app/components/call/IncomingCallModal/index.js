import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Modal} from 'react-native'

import s from './styles'

const IncomingCallModal = ({call, onAnswerPress, onDeclinePress}) => {
  if (!call) {
    return null
  }

  return (
    <Modal
      animationType={"fade"}
      transparent
      visible
      onRequestClose={onDeclinePress}
    >
      <View style={s.modalBackground}>
        <View style={s.contentBackground}>
          <View style={s.titleContainer}>
            <Text style={s.titleText}>{call.getRemoteFormattedNumber()} is calling</Text>
          </View>

          <TouchableOpacity onPress={onAnswerPress} style={[s.actionTouchable, s.actionGreen]}>
            <Text style={s.actionText}>Answer</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
            <Text style={s.actionText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

IncomingCallModal.propTypes = {
  call: PropTypes.object,
  onAnswerPress: PropTypes.func,
  onDeclinePress: PropTypes.func
}

export default IncomingCallModal
