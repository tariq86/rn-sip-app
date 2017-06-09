import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import s from './styles'

const ListConfigurationInfo = ({style, icon, title, description, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[s.container, style]}>
      <View style={s.iconContainer}>
        <Image icon={icon}/>
      </View>

      <View style={s.descriptionContainer}>
        <Text style={s.descriptionTitle} numberOfLines={1} ellipsizeMode="middle">
          {title}
        </Text>
        <Text style={s.descriptionText}>
          {description}
        </Text>
      </View>

      <View style={s.goContainer}>
        <Image source={require('../../../assets/images/common/lined-goto.png')}/>
      </View>
    </TouchableOpacity>
  )
}

ListConfigurationInfo.propTypes = {
  style: View.propTypes.style,
  icon: Image.propTypes.source,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

export default ListConfigurationInfo
