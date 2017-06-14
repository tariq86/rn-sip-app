import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import HistoryViewport from './HistoryViewport'
import Header from '../../components/Header'
import cs from '../../assets/styles/containers'

const HistoryScreen = () => {
  return (
    <View style={cs.max}>
      <Header title="History" />
      <HistoryViewport />
    </View>
  )
}

HistoryScreen.propTypes = {

}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
