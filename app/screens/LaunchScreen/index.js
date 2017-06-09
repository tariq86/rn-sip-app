import React, {Component} from 'react'
import {
  View,
  Text
} from 'react-native'
import s from './styles'

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={s.container}>
        <Text style={s.logo}>
          Loading...
        </Text>
      </View>
    )
  }
}
