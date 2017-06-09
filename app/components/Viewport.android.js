import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableHighlight, Image, View, Text, DrawerLayoutAndroid} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../modules/navigation'
import ConversationsScreen from '../screens/ConversationsScreen'
import HistoryScreen from '../screens/HistoryScreen'
import SettingsScreen from '../screens/SettingsScreen'

class Viewport extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.drawer === "VISIBLE") {
      this._drawer.openDrawer()
    } else {
      this._drawer.closeDrawer()
    }
  }

  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab)
    } else {
      this.props.onDrawerClose()
    }
  }

  renderNavigationView() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>

        <View style={{flex: 0.3, backgroundColor: "#E7ECEF"}}/>

        <TouchableHighlight
          underlayColor="#E7ECEF"
          style={{marginTop: 10}}
          onPress={this.onTabSelect.bind(this, 'conversations')}
        >
          <View style={{height: 46, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{width: 36, marginLeft: 16}}
              source={require('../assets/images/toolbar/conversations-icon.png')}
            />
            <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>Conversations</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#E7ECEF"
          style={{marginTop: 10}}
          onPress={this.onTabSelect.bind(this, 'history')}
        >
          <View style={{height: 46, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{width: 36, marginLeft: 16}}
              source={require('../assets/images/toolbar/history-icon.png')}
            />
            <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>History</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#E7ECEF"
          style={{marginTop: 10}}
          onPress={this.onTabSelect.bind(this, 'settings')}
        >
          <View style={{height: 46, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{width: 36, marginLeft: 16}}
              source={require('../assets/images/toolbar/account-icon.png')}
            />
            <Text style={{fontSize: 16, color: "#939A9F", marginLeft: 16}}>Settings</Text>
          </View>
        </TouchableHighlight>


        <View style={{flex: 0.6}}/>
      </View>
    )
  }

  renderContent() {
    switch (this.props.tab) {
      case 'conversations':
        return <ConversationsScreen />
      case 'history':
        return <HistoryScreen />
      case 'settings':
        return <SettingsScreen />
    }
  }

  renderActiveCalls() {
    const calls = this.props.calls
    const result = []

    for (const id in calls) {
      if (calls.hasOwnProperty(id)) {
        const call = calls[id]

        result.push(
          (
            <TouchableHighlight key={call.getId()}
                                style={{
                                  height: 38,
                                  backgroundColor: "#4cda64",
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onPress={() => this.props.onCallSelect(call)}
            >
              <Text style={{color: "#FFF", fontSize: 14, paddingLeft: 10}}>{call.getRemoteUri()}</Text>
            </TouchableHighlight>
          )
        )
      }
    }

    return result
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={320}
        ref={(drawer) => {
          this._drawer = drawer
        }}
        onDrawerClose={this.props.onDrawerClose}
        style={{flex: 1}}
        renderNavigationView={this.renderNavigationView.bind(this)}
      >
        <View key={this.props.tab} style={{flex: 1}}>
          {this.renderActiveCalls()}
          {this.renderContent()}
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

Viewport.propTypes = {
  navigator: PropTypes.object,
  drawer: PropTypes.object,
  calls: PropTypes.object,
  tab: PropTypes.string,
  onCallSelect: PropTypes.func,
  onTabSelect: PropTypes.func,
  onDrawerClose: PropTypes.func
}

function select(store) {
  // Do not track tabs other then 'conversations', 'contacts', 'history' and 'settings'
  let tab = store.navigation.current.name

  if (['conversations', 'contacts', 'history', 'settings'].indexOf(tab) == -1) {
    tab = store.navigation.previous.name
  }

  return {
    tab: tab,
    drawer: store.navigation.drawer,
    calls: store.pjsip.calls
  }
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => {
      dispatch(Navigation.goAndReplace({name: tab}))
    },
    onCallSelect: (call) => {
      dispatch(Navigation.goTo({name: 'call', call}))
    },
    onDrawerClose: () => {
      dispatch(Navigation.closeDrawer())
    }
  }
}

export default connect(select, actions)(Viewport)
