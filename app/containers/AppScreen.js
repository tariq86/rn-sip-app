import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, StatusBar, Navigator} from 'react-native'
import {connect} from 'react-redux'

import * as Navigation from '../modules/navigation'
import CallScreen from '../screens/CallScreen'
import LaunchScreen from '../screens/LaunchScreen'
import AccountScreen from '../screens/AccountScreen'
import NetworkSettingsScreen from '../screens/NetworkSettingsScreen'
import MediaSettingsScreen from '../screens/MediaSettingsScreen'
import Viewport from './AppViewport'
import cs from '../assets/styles/containers'

class App extends Component {
  componentDidMount() {
    this.props.onNavigatorMount(this.navigatorView)
  }

  configureScene() {
    return Navigator.SceneConfigs.FadeAndroid
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'launch':
        return (<LaunchScreen />)
      case 'conversations':
      case 'contacts':
      case 'history':
      case 'settings':
      case 'dialer':
        return (
          <Viewport navigator={navigator}/>
        )
      case 'call':
        return (<CallScreen />)
      case 'account':
        return (<AccountScreen />)
      case 'network_settings':
        return (<NetworkSettingsScreen />)
      case 'media_settings':
        return (<MediaSettingsScreen />)
      default:
        return (<View />)
    }
  }

  render() {
    const {navigation} = this.props
    const full = navigation.current.name === "call"
    const barColor = "#36454b"
    const barStyle = "light-content"
    const route = navigation.current.name ? navigation.current : navigation.init

    return (
      <View style={cs.max}>
        <StatusBar
          backgroundColor={barColor}
          barStyle={barStyle}
          hidden={full}
        />
        <Navigator
          style={cs.max}
          ref={(c) => {
            this.navigatorView = c
          }}
          initialRoute={route}
          configureScene={this.configureScene}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    )
  }
}

App.propTypes = {
  navigation: PropTypes.object,
  onNavigatorMount: PropTypes.func.isRequired
}

function select(store) {
  return {
    navigation: store.navigation
  }
}

function actions(dispatch) {
  return {
    onNavigatorMount: (ref) => {
      dispatch(Navigation.ref(ref))
    }
  }
}

export default connect(select, actions)(App)
