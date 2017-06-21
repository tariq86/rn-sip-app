import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'

import s from './styles'

const CallAvatar = ({size}) => {
  const finalSize = size - 20

  return (
    <View style={[s.circle, {borderRadius: finalSize, height: finalSize, width: finalSize}]}>
      <Text style={s.abbr}>Avatar</Text>
    </View>
  )
}

CallAvatar.propTypes = {
  call: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

export default CallAvatar
