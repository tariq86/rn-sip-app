import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, Text, Image} from 'react-native'

import s from './styles'

const ItemWrapper = ({item, color}) => {
  if (!item) {
    return null
  }

  let content
  const {title, icon, layout, onPress} = item

  if (layout !== 'icon' && title) {
    content = (
      <Text style={[s.itemText, {color}]}>
        {title.toUpperCase()}
      </Text>
    )
  } else if (icon) {
    content = <Image source={icon}/>
  }

  return (
    <TouchableOpacity
      accessibilityLabel={title}
      accessibilityTraits="button"
      onPress={onPress}
      style={s.itemWrapper}
    >
      {content}
    </TouchableOpacity>
  )
}

ItemWrapper.propTypes = {
  item: PropTypes.object,
  color: PropTypes.string,
  layout: PropTypes.string,
  onPress: PropTypes.func
}

export default ItemWrapper
