import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import DialerViewport from './DialerViewport'
import Header from '../../components/Header'
import cs from '../../assets/styles/containers'

const DialerScreen = () => {
  return (
    <View style={cs.max}>
      <Header title="Keypad" />
      <DialerViewport />
    </View>
  )
}

DialerScreen.propTypes = {

}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DialerScreen)
