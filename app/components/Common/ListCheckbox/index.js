import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity, Text, Image} from 'react-native'

import s from './styles'

export default class ListCheckbox extends Component {
  constructor(props) {
    super(props)

    this._onPress = this.onPress.bind(this)
  }

  onPress() {
    if (this.props.disabled) {
      return
    }

    this.props.onChange && this.props.onChange(!this.props.value)
  }

  render() {
    const disabled = this.props.disabled

    return (
      <TouchableOpacity onPress={this._onPress} style={[s.container, this.props.style]}>

        <View style={s.descriptionContainer}>
          <Text
            style={[s.descriptionTitle, (disabled ? s.descriptionTextDisabled : null)]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {this.props.title}
          </Text>
          <Text style={[s.descriptionText, (disabled ? s.descriptionTextDisabled : null)]}>
            {this.props.description}
          </Text>
        </View>

        {
          this.props.value ?
            <View style={[s.checkboxSelected, (disabled ? s.checkboxDisabled : null)]}>
              <Image source={require('../../../assets/images/common/ok_small.png')}/>
            </View>
            :
            <View style={[s.checkbox, (disabled ? s.checkboxDisabled : null)]}>
              <View style={s.checkboxHole}/>
            </View>
        }
      </TouchableOpacity>
    )
  }
}

ListCheckbox.propTypes = {
  value: PropTypes.bool.isRequired,
  style: View.propTypes.style,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  onChange: PropTypes.func
}
