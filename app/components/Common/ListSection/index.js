import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import s from './styles'

const ListSection = ({title}) => {
  return (
    <LinearGradient colors={['#F8F8F8', '#EDF1F4']} style={s.gradient}>
      <Text style={s.text}>{title}</Text>
    </LinearGradient>
  )
}

ListSection.propTypes = {
  title: PropTypes.string
}

export default ListSection
