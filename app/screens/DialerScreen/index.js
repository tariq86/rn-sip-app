import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'
import * as Navigation from '../../modules/navigation'
import {makeCall} from '../../modules/pjsip'

import Header from '../../components/Header'
import KeypadWithActions from '../../components/Call/KeypadWithActions'

import {connect} from 'react-redux'

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
        style={{flex: 1}}
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
