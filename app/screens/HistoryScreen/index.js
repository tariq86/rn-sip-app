import React from 'react'
import PropTypes from 'prop-types'
import {Image, View, Text, Platform} from 'react-native'
import {connect} from 'react-redux'

import * as Navigation from '../../modules/navigation'
import Header from '../../components/Header'

import cs from '../../assets/styles/containers'

const HistoryScreen = ({onHamburgerPress}) => {
  const platformHeaderProps = {}

  if (Platform.OS === 'android') {
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../assets/images/header/hamburger.png'),
      layout: 'icon',
      onPress: onHamburgerPress
    }
  }

  return (
    <View style={cs.max}>
      <Header title="History" {...platformHeaderProps} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: "#ECEFF1",
          justifyContent: 'center',
          paddingBottom: (Platform.OS === 'ios' ? 50 : 0)
        }}
      >
        <Text style={{fontSize: 42, marginTop: 26, color: "#666"}}>Bonjour!</Text>
        <Image resizeMode="contain" style={{width: 250}} source={require('../../assets/demo/oviraptor.png')}/>
      </View>
    </View>
  )
}

HistoryScreen.propTypes = {
  onHamburgerPress: PropTypes.func
}

function select(store) {
  return {}
}

function actions(dispatch) {
  return {
    onHamburgerPress: () => {
      dispatch(Navigation.openDrawer())
    }
  }
}

export default connect(select, actions)(HistoryScreen)
