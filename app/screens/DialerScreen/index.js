import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {View, StyleSheet} from 'react-native'
import * as Navigation from '../../modules/navigation'
import {makeCall} from '../../modules/pjsip'

import Header from '../../components/Header'
import KeypadWithActions from '../../components/Call/KeypadWithActions'

import cs from '../../assets/styles/containers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 49.5
  }
})

const DialerScreen = ({onCallPress}) => {
  return (
    <View style={styles.container}>
      <Header title="Keypad"/>
      <KeypadWithActions
        style={cs.max}
        actions={[
          {icon: "call", text: "Call", callback: onCallPress}
        ]}
      />
    </View>
  )
}

DialerScreen.propTypes = {
  onCallPress: PropTypes.func.isRequired
}


function select() {
  return {}
}

function actions(dispatch) {
  return {
    onCallPress: (destination) => {
      if (destination) {
        dispatch(makeCall(destination))
      }
    }
  }
}

export default connect(select, actions)(DialerScreen)
