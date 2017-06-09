import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Image} from 'react-native'

import s from './styles'

const KeypadInputText = ({style, textStyle, value, editable, onBackspacePress, onClearPress}) => {
  return (
    <View style={[s.container, style]}>
      <Text
        numberOfLines={1} ellipsizeMode="head"
        style={[s.text, (editable === false ? s.textNotEditable : null), textStyle]}
      >
        {value}
      </Text>

      {
        !value || value.length === 0 || editable === false ? null :
          <TouchableOpacity
            onPress={onBackspacePress}
            onLongPress={onClearPress}
            style={s.clearTouchable}
          >
            <Image source={require('../../../assets/images/keypad/input-back.png')}/>
          </TouchableOpacity>
      }
    </View>
  )
}

KeypadInputText.propTypes = {
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onBackspacePress: PropTypes.func,
  onClearPress: PropTypes.func
}

export default KeypadInputText
