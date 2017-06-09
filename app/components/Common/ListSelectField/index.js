import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity, Text, Image} from 'react-native'

import ListCustomField from '../ListCustomField'
import s from './styles'

export default class ListSelectField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value
    }

    this._onOkPress = this.onOkPress.bind(this)
  }

  onOkPress() {
    this.props.onChange && this.props.onChange(this.state.value)
  }

  onOptionPress(option) {
    this.setState({
      value: option
    })
  }

  renderOptions(options) {
    const result = []

    for (const option of options) {
      result.push((
        <TouchableOpacity onPress={this.onOptionPress.bind(this, option)} key={option} style={s.optionTouchable}>
          <Text style={s.optionTitle}>{option}</Text>

          {
            this.state.value == option ?
              <View style={s.optionIconSelected}>
                <Image source={require('../../../assets/images/common/ok_white.png')}/>
              </View>
              :
              <View style={s.optionIcon}/>
          }
        </TouchableOpacity>
      ))
    }

    return result
  }

  render() {
    return (
      <ListCustomField
        value={this.props.value}
        placeholder={this.props.placeholder}
        title={this.props.title}
        onOkPress={this._onOkPress}
      >

        {this.renderOptions(this.props.options)}

      </ListCustomField>
    )
  }
}

ListSelectField.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func
}
