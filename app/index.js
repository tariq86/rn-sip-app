import {Platform, BackAndroid} from 'react-native'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import AppScreen from './containers/AppScreen'

const store = configureStore()

// ========================================
// Bootstrap
// ========================================

import * as App from './modules/app'
import * as Navigation from './modules/navigation'

store.dispatch(async (dispatch, getState) => {
  await dispatch(App.init())

  // Render
  let route = {name: 'settings'}
  const {calls, accounts} = getState().pjsip

  for (const id in accounts) {
    if (accounts.hasOwnProperty(id)) {
      route = {name: 'dialer'}
      break
    }
  }

  for (const id in calls) {
    if (calls.hasOwnProperty(id)) {
      const call = calls[id]
      if (call.getState() === "PJSIP_INV_STATE_INCOMING") {
        route = {name: 'call', call}
        break
      }
    }
  }

  dispatch(Navigation.goAndReplace(route))

  // Hooks
  if (Platform.OS === 'android') {
    BackAndroid.addEventListener('hardwareBackPress', function () {
      const prev = getState().navigation.previous.name

      if (prev) {
        dispatch(Navigation.goBack())
        return true
      }

      return false
    })
  }
})

// ========================================
// Render
// ========================================

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppScreen />
      </Provider>
    )
  }
}
