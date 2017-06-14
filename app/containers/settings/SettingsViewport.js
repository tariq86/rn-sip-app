import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, Platform} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'

import ListAccountInfo from '../../components/Settings/ListAccountInfo'
import ListConfigurationInfo from '../../components/Settings/ListConfigurationInfo'
import ListSection from '../../components/Common/ListSection'
import Header from '../../components/Header'

import cs from '../../assets/styles/containers'

class SettingsScreen extends Component {

  // TODO: Use dedicated component for that!
  renderAccounts(accounts) {
    const result = []

    for (const id in accounts) {
      if (accounts.hasOwnProperty(id)) {
        const acc = accounts[id]
        result.push((
          <ListAccountInfo
            key={acc.getId()}
            account={acc}
            connectivity={this.props.connectivity}
            onPress={this.props.onAccountPress && this.props.onAccountPress.bind(this, acc)}
          />
        ))
      }
    }

    if (result.length === 0) {
      return (
        <View style={{height: 56, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, color: "#CCC"}}>No accounts available</Text>
        </View>
      )
    }

    return result
  }

  render() {
    // TODO: Add icon for network and media configuration.
    // TODO: Use array to return elements without additional View
    return (
      <View style={cs.max}>
        <ListSection title="Accounts"/>
        {this.renderAccounts(this.props.accounts)}
        <ListSection title="Advanced"/>
        <ListConfigurationInfo
          onPress={this.props.onNetworkSettingsPress}
          title="Network"
          description="How application can be connected to the network"
        />
        <ListConfigurationInfo
          onPress={this.props.onMediaSettingsPress}
          title="Media"
          description="Codecs and in-call sound behaviour"
        />
      </View>
    )
  }

}

SettingsScreen.propTypes = {
  connectivity: PropTypes.bool,
  accounts: PropTypes.object,
  onAccountPress: PropTypes.func,
  onNetworkSettingsPress: PropTypes.func,
  onMediaSettingsPress: PropTypes.func
}

function mapStateToProps(store) {
  return {
    accounts: store.pjsip.accounts,
    connectivity: store.app.endpointConnectivity
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAccountPress: (account) => {
      dispatch(Navigation.goTo({name: 'account', account: account}))
    },
    onNetworkSettingsPress: () => {
      dispatch(Navigation.goTo({name: 'network_settings'}))
    },
    onMediaSettingsPress: () => {
      dispatch(Navigation.goTo({name: 'media_settings'}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
