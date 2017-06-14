import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableHighlight, View, Text, Dimensions} from 'react-native'

import s from './styles'
import Touchable from '../../Common/Touchable'

export default class Keypad extends Component {
  constructor(props) {
    super(props)

    const {height, width} = Dimensions.get('window')
    const ratio = height / width

    this.state = {
      keySize: 0,
      heightRatio: ratio * ratio
    }
  }

  onKeyPress(key) {
    this.props.onKeyPress && this.props.onKeyPress(key)
  }

  onLayoutKey(event) {
    const {width, height} = event.nativeEvent.layout
    this.setState({keySize: height})

    this.props.onDefineKeySize && this.props.onDefineKeySize({width, height})
  }

  renderKey(digit, letters) {
    const props = {}


    if (digit === '1') {
      props['onLayout'] = (event) => this.onLayoutKey(event)
    }

    return (
      <View {...props} key={digit} style={s.keyWrapper}>

        {
          /* Show key only when we know it's width to render square touchable */
          !this.state.keySize ? null :
            <Touchable
              style={[s.keyTouchable, {width: this.state.keySize}, this.props.keyStyle]}
              onPress={this.onKeyPress.bind(this, digit)}
            >
              <View style={s.keyDigitWrapper}>
                <Text style={[s.keyDigitText, this.props.keyTextStyle]}>{digit}</Text>
                <Text style={[s.keyLettersText, this.props.keyTextStyle]}>{letters}</Text>
              </View>
            </Touchable>
        }
      </View>
    )
  }

  render() {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '0', '#']
    ]

    const desc = [
      ['', 'ABC', 'DEF'],
      ['GHI', 'JKL', 'MNO'],
      ['PQRS', 'TUV', 'WXYZ'],
      ['', '+', '']
    ]

    const keypad = []

    for (let i = 0; i < keys.length; i++) {
      keypad.push((
        <View key={keys[i].join("|")} style={s.row}>
          <View style={s.outerLineOffset}/>
          {this.renderKey(keys[i][0], desc[i][0])}
          <View style={s.innerLineOffset}/>
          {this.renderKey(keys[i][1], desc[i][1])}
          <View style={s.innerLineOffset}/>
          {this.renderKey(keys[i][2], desc[i][2])}
          <View style={s.outerLineOffset}/>
        </View>
      ))

      if (i !== keys.length - 1) {
        keypad.push((
          <View key={"split" + i} style={{flex: 0.006 * this.state.heightRatio}}/>
        ))
      }
    }

    return (
      <View style={this.props.style}>
        {keypad}
      </View>
    )
  }
}

Keypad.propTypes = {
  style: View.propTypes.style,
  keyStyle: View.propTypes.style,
  keyUnderlayColor: PropTypes.any,
  keyTextStyle: Text.propTypes.style,
  onKeyPress: PropTypes.func,
  onDefineKeySize: PropTypes.func
}
