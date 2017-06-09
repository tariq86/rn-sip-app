import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Image, Modal} from 'react-native'

import Keypad from '../Keypad'
import KeypadInputText from '../KeypadInputText'

import s from './styles'

export default class DtmfModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    }

    this._onKeyPress = this.onKeyPress.bind(this)
  }

  onKeyPress(key) {
    this.setState({value: this.state.value + key})
    this.props.onPress && this.props.onPress(key)
  }

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={s.modalBackground}>
          <View style={s.contentBackground}>
            <View style={s.titleContainer}>
              <Text style={s.titleText}>DTMF</Text>
              <TouchableOpacity onPress={this.props.onRequestClose}>
                <Image source={require('../../../assets/images/modal/close-icon.png')}/>
              </TouchableOpacity>
            </View>

            <KeypadInputText style={s.keypadInput} value={this.state.value} editable={false}/>

            <Keypad onKeyPress={this._onKeyPress} style={s.keypad}/>
          </View>
        </View>
      </Modal>
    )
  }
}

DtmfModal.propTypes = {
  visible: Modal.propTypes.visible,
  onPress: PropTypes.func,
  onRequestClose: Modal.propTypes.onRequestClose
}
