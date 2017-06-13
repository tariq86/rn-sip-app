import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TextInput, View} from 'react-native'

import ListCustomField from '../ListCustomField'
import s from './styles'

export default class ListTextField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value
    }

    this._onTextChanged = this.onTextChanged.bind(this)
    this._onModalOkPress = this.onModalOkPress.bind(this)
    this._onSubmitPress = this.onSubmitPress.bind(this)
  }

  onModalOkPress() {
    this.props.onChange && this.props.onChange(this.state.value)
  }

  onTextChanged(value) {
    this.setState({
      value: value
    })
  }

  onSubmitPress() {
    this.fieldDialog && this.fieldDialog.close()
    this.props.onChange && this.props.onChange(this.state.value)
  }

  render() {
    return (
      <ListCustomField
        ref={(c) => {this.fieldDialog = c}}
        value={this.props.value}
        valueType={this.props.valueType}
        placeholder={this.props.placeholder}
        title={this.props.title}
        onOkPress={this._onModalOkPress}
      >
        <TextInput
          style={s.input}
          onSubmitEditing={this._onSubmitPress}
          autoFocus
          placeholderTextColor="#666"
          clearButtonMode='always'
          returnKeyType={'done'}
          placeholder={this.props.placeholder}
          value={this.state.value}
          underlineColorAndroid="transparent"
          numberOfLines={1}
          onChangeText={this._onTextChanged}
          {...this.props.inputProps}
        />

      </ListCustomField>
    )
  }
}

ListTextField.propTypes = {
  value: PropTypes.string.isRequired,
  valueType: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  style: View.propTypes.style,
  inputProps: PropTypes.object,
  onChange: PropTypes.func
}
