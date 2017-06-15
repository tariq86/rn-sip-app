import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableHighlight, Image, View, Text, DrawerLayoutAndroid} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../modules/navigation'
import ConversationsViewport from './conversations/ConversationsViewport'
import HistoryViewport from './history/HistoryViewport'
import DialerViewport from './dialer/DialerViewport'
import SettingsViewport from './settings/SettingsViewport'

import NavigationPager from '../components/viewport/NavigationPager'
import ViewPager from '../components/Common/ViewPager'

import cs from '../assets/styles/containers'

// TODO: Move to containers!!!
class AppViewport extends Component {
  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab)
    } else {
      this.props.onDrawerClose()
    }
  }

  // TODO: Move to dedicated component
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


  // TODO: Use component for Viewport Navigation Bar where all entities are located.
  // TODO: Use animated view to make selected item transition.

  // TODO: Add logo

  // TODO: Add PhoneInput to Dialer and add line separator between dialer and keypad

  render() {
    const {tab, onTabSelect, onSelectedIndexChange} = this.props
    let tabIndex = 0

    switch (tab) {
      case 'dialer':
        tabIndex = 0
        break
      case 'conversations':
        tabIndex = 1
        break
      case 'history':
        tabIndex = 2
        break
      case 'settings':
        tabIndex = 3
        break
    }

    return (
      <View style={cs.max}>
        <View style={{height: 50, backgroundColor: '#3f5057', flexDirection: 'row'}}>
          <View style={{marginLeft:16, justifyContent: 'center', height: 50}}>
            <Image resizeMode="contain" style={{width: 42}} source={require('../assets/images/logo.png')}/>
          </View>
          <View style={{flex: 1, justifyContent:'flex-end'}}>
            <NavigationPager selection={tab} onChange={onTabSelect} />
          </View>
        </View>
        <ViewPager
          style={cs.max}
          count={4}
          selectedIndex={tabIndex}
          onSelectedIndexChange={onSelectedIndexChange}
        >
          <View style={cs.max}>
            <DialerViewport />
          </View>
          <View style={cs.max}>
            <ConversationsViewport />
          </View>
          <View style={cs.max}>
            <HistoryViewport />
          </View>
          <View style={cs.max}>
            <SettingsViewport />
          </View>
        </ViewPager>
      </View>
    )
  }
}

AppViewport.propTypes = {
  navigator: PropTypes.object,
  calls: PropTypes.object,
  tab: PropTypes.string,
  onCallSelect: PropTypes.func,
  onTabSelect: PropTypes.func,
  onDrawerClose: PropTypes.func
}

function mapStateToProps(store) {
  let tab = store.navigation.current.name;

  if (['conversations', 'dialer', 'history', 'settings'].indexOf(tab) == -1) {
    tab = store.navigation.previous.name;
  }

  return {
    tab,
    calls: store.pjsip.calls
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectedIndexChange: (index) => {
      switch (index) {
        case 0:
          dispatch(Navigation.goAndReplace({name: 'dialer'}))
          break;
        case 1:
          dispatch(Navigation.goAndReplace({name: 'conversations'}))
          break;
        case 2:
          dispatch(Navigation.goAndReplace({name: 'history'}))
          break;
        case 3:
          dispatch(Navigation.goAndReplace({name: 'settings'}))
          break;
      }
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(AppViewport)
