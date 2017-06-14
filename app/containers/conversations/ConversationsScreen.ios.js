import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'

import ConversationsViewport from './ConversationsViewport'
import Header from '../../components/Header'
import cs from '../../assets/styles/containers'

const ConversationsScreen = () => {
  return (
    <View style={cs.max}>
      <Header title="Conversations" />
      <ConversationsViewport />
    </View>
  )
}

ConversationsScreen.propTypes = {

}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsScreen)
