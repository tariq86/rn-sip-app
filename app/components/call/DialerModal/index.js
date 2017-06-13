import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Modal} from 'react-native'
import KeypadWithActions from '../KeypadWithActions'

import s from './styles'
import cs from '../../../assets/styles/containers'

const DialerModal = ({theme, visible, actions, onRequestClose}) => {
  const containerStyles = theme === "dark" ? s.containerDarkStyle : s.containerStyle
  const contentStyles = theme === "dark" ? s.containerDarkStyle : s.containerStyle
  const touchableStyle = theme === "dark" ? s.touchableDarkStyle : s.touchableStyle
  const touchableTextStyle = theme === "dark" ? s.touchableTextDarkStyle : s.touchableTextStyle

  return (
    <Modal
      animationType={"fade"}
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={[cs.max, containerStyles]}>
        <KeypadWithActions
          style={[cs.max, contentStyles]}
          theme={theme}
          actions={actions}
        />
        <TouchableOpacity onPress={onRequestClose} style={touchableStyle}>
          <Text style={[s.touchableText, touchableTextStyle]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

DialerModal.propTypes = {
  visible: Modal.propTypes.visible,
  theme: PropTypes.string,
  actions: PropTypes.array.isRequired,
  onRequestClose: Modal.propTypes.onRequestClose
}
