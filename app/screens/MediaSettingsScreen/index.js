import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, ScrollView} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'
import ListSection from '../../components/Common/ListSection'
import Header from '../../components/Header'

import cs from '../../assets/styles/containers'

const MediaSettingsScreen = ({onBackPress}) => {
  const platformHeaderProps = {}

  platformHeaderProps['leftItem'] = {
    title: 'Back',
    icon: require('../../assets/images/header/back_white.png'),
    layout: 'icon',
    onPress: onBackPress
  }
  platformHeaderProps['rightItem'] = {
    title: 'Save',
    icon: require('../../assets/images/header/ok_white.png'),
    layout: 'icon',
    onPress: () => {
      // TODO: Ability to same media settings.
    }
  }

  return (
    <View style={cs.max}>
      <Header title={"Media settings"} {...platformHeaderProps} />

      <ScrollView style={cs.max}>
        <ListSection title="General"/>
        <View style={{padding: 10}}>
          <Text>Not implemented</Text>
        </View>

        <ListSection title="Advanced"/>
        <View style={{padding: 10}}>
          <Text>Not implemented</Text>
        </View>
      </ScrollView>
    </View>
  )
}

MediaSettingsScreen.propTypes = {
  onBackPress: PropTypes.func.isRequired
}

function select(store) {
  return {
    account: store.navigation.current.account
  }
}

function actions(dispatch) {
  return {
    onBackPress: () => {
      dispatch(Navigation.goBack())
    }
  }
}

export default connect(select, actions)(MediaSettingsScreen)
