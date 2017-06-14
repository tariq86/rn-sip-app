import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Platform} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'

import Header from '../../components/Header'
import SettingsViewport from './SettingsViewport'
import cs from '../../assets/styles/containers'

const SettingsScreen = ({onNewAccountPress}) => {
  const platformHeaderProps = {
    rightItem: {
      title: 'Create',
      icon: require('../../assets/images/header/add_white.png'),
      layout: 'icon',
      onPress: onNewAccountPress
    }
  }

  return (
    <View style={cs.max}>
      <Header title="Settings" {...platformHeaderProps} />
      <SettingsViewport />
    </View>
  )
}

SettingsScreen.propTypes = {
  onNewAccountPress: PropTypes.func
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onNewAccountPress: () => {
      dispatch(Navigation.goTo({name: 'account'}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
