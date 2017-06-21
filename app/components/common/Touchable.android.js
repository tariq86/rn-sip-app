import React from 'react'
import PropTypes from 'prop-types'
import {TouchableNativeFeedback, View} from 'react-native'

const Touchable = (props) => {
  return (
    <TouchableNativeFeedback {...props}>
      <View style={props.style}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  )
}

Touchable.propTypes = {
  style: View.propTypes.style,
  children: PropTypes.node
}

export default Touchable;
