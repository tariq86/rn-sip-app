import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity, Text, Modal, Image, KeyboardAvoidingView} from 'react-native'

import Touchable from '../Touchable'
import s from './styles'

export default class ListCustomField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      text: this.props.value
    }

    this._onModalOpenPress = this.onModalOpenPress.bind(this)
    this._onModalClosePress = this.onModalClosePress.bind(this)
    this._onModalOkPress = this.onModalOkPress.bind(this)
  }

  close() {
    this.setState({
      active: false
    })
  }

  onModalOpenPress() {
    this.setState({
      active: true
    })
  }

  onModalClosePress() {
    this.setState({
      active: false
    })
    this.props.onClosePress && this.props.onClosePress()
  }

  onModalOkPress() {
    this.setState({
      active: false
    })
    this.props.onOkPress && this.props.onOkPress()
  }

  render() {
    let value = this.props.value
    const empty = !this.props.value || this.props.value.length === 0

    if (this.props.valueType === 'password') {
      value = "*".repeat(value.length)
    }

    return (
      <View>
        <Touchable style={s.listContainer} onPress={this._onModalOpenPress}>
          <View style={s.listContent}>
            <Text style={(empty ? s.listTitle : s.listPlaceholder)}>{this.props.title}</Text>
            <Text style={(empty ? s.listPlaceholder : s.listTitle)}>
              {
                this.props.value && this.props.value.length > 0 ? value : this.props.placeholder
              }
            </Text>
          </View>
          <View style={s.listIconContainer}>
            <Image source={require('../../../assets/images/common/lined-goto.png')}/>
          </View>
        </Touchable>

        <Modal
          animationType={"fade"}
          transparent
          visible={this.state.active}
          onRequestClose={this._onModalClosePress}
        >
          <View style={s.modalBackground} onStartShouldSetResponderCapture={this.onHandleCapture}>
            <KeyboardAvoidingView behavior='position'>
              <View style={s.modalContent}>
                <View style={s.modalHeader}>
                  <Text style={s.modalTitle}>{this.props.title}</Text>
                  <Touchable style={s.modalClose} onPress={this._onModalClosePress}>
                    <Image source={require('../../../assets/images/modal/close-icon.png')}/>
                  </Touchable>
                </View>

                {this.props.children}

                <Touchable onPress={this._onModalOkPress} style={s.modalSubmitTouchable}>
                    <Text style={s.modalSubmitText}>SAVE</Text>
                </Touchable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    )
  }
}

ListCustomField.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
  valueType: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  onClosePress: PropTypes.func,
  onOkPress: PropTypes.func
}
