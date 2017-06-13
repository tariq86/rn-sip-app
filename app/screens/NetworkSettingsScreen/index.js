import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {changeNetworkSettings} from '../../modules/app'
import * as Navigation from '../../modules/navigation'

import Header from '../../components/Header'
import ListSection from '../../components/Common/ListSection'
import ListCheckbox from '../../components/Common/ListCheckbox'

import cs from '../../assets/styles/containers'

class MediaSettingsScreen extends Component {

  constructor(props) {
    super(props)

    const s = this.props.settings.network
    const foreground = this.props.settings.service.foreground

    // We should disable network configuration (useWifi, use3g, useGprs, useEdge, useOtherNetworks) when useAnyway is TRUE.
    // Also we can't enable use mobile data while Wifi is not enabled

    const wifiDisabled = s.useAnyway
    const mobileDisabled = s.useAnyway || (!wifiDisabled && !s.useWifi)

    this.state = {
      foreground,
      useAnyway: s.useAnyway,
      useWifi: s.useWifi,
      use3g: s.use3g,
      useGprs: s.useGprs,
      useEdge: s.useEdge,
      useOtherNetworks: s.useOtherNetworks,
      useInRoaming: s.useInRoaming,
      wifiDisabled,
      mobileDisabled
    }

    this._onForegroundChange = this.onBooleanChanged.bind(this, "foreground")

    this._onAnywayChange = this.onBooleanChanged.bind(this, "useAnyway")
    this._onWifiChange = this.onBooleanChanged.bind(this, "useWifi")
    this._on3gChange = this.onBooleanChanged.bind(this, "use3g")
    this._onGprsChange = this.onBooleanChanged.bind(this, "useGprs")
    this._onEdgeChange = this.onBooleanChanged.bind(this, "useEdge")
    this._onOtherNetworksChange = this.onBooleanChanged.bind(this, "useOtherNetworks")
    this._onInRoamingChange = this.onBooleanChanged.bind(this, "useInRoaming")

    this._onSavePress = this.onSavePress.bind(this)
  }

  onSavePress() {
    const configuration = {
      foreground: this.state.foreground,
      useAnyway: this.state.useAnyway,
      useWifi: this.state.useWifi,
      use3g: this.state.use3g,
      useGprs: this.state.useGprs,
      useEdge: this.state.useEdge,
      useOtherNetworks: this.state.useOtherNetworks,
      useInRoaming: this.state.useInRoaming
    }

    this.props.onSavePress && this.props.onSavePress(configuration)
  }

  onBooleanChanged(property, value) {
    const newState = {...this.state, [property]: value}
    const wifiDisabled = newState.useAnyway
    const mobileDisabled = newState.useAnyway || (!wifiDisabled && !newState.useWifi)

    this.setState({...newState, wifiDisabled, mobileDisabled})
  }

  render() {
    const platformHeaderProps = {}

    platformHeaderProps['leftItem'] = {
      title: 'Back',
      icon: require('../../assets/images/header/back_white.png'),
      layout: 'icon',
      onPress: this.props.onBackPress
    }
    platformHeaderProps['rightItem'] = {
      title: 'Save',
      icon: require('../../assets/images/header/ok_white.png'),
      layout: 'icon',
      onPress: this._onSavePress
    }

    return (
      <View style={cs.max}>
        <Header title={"Network settings"} {...platformHeaderProps} />

        <ScrollView style={cs.max}>
          <ListSection title="Connectivity settings"/>

          <ListCheckbox
            onChange={this._onAnywayChange}
            value={this.state.useAnyway}
            title="Always connect"
            description="Try to connect if any connection type available"
          />
          <ListCheckbox
            disabled={this.state.wifiDisabled}
            onChange={this._onWifiChange}
            value={this.state.useWifi}
            title="Use WiFi"
            description="Use WiFi for incoming and outgoing calls"
          />
          <ListCheckbox
            disabled={this.state.mobileDisabled}
            onChange={this._on3gChange}
            value={this.state.use3g}
            title="Use 3g (and better)"
            description="Your carrier MUST allow to use this option. Note that mobile carrier may also bill extra charge for data usage."
          />
          <ListCheckbox
            disabled={this.state.mobileDisabled}
            onChange={this._onGprsChange}
            value={this.state.useGprs}
            title="Use GPRS"
            description="Your carrier MUST allow to use this option. Note that mobile carrier may also bill extra charge for data usage."
          />
          <ListCheckbox
            disabled={this.state.mobileDisabled} onChange={this._onEdgeChange} value={this.state.useEdge}
            title="Use EDGE"
            description="Your carrier MUST allow to use this option. Note that mobile carrier may also bill extra charge for data usage."
          />
          <ListCheckbox
            disabled={this.state.useAnyway}
            onChange={this._onOtherNetworksChange}
            value={this.state.useOtherNetworks} title="Use other networks"
            description="Use other then WiFi or mobile data connection types"
          />
          <ListCheckbox
            onChange={this._onInRoamingChange}
            value={this.state.useInRoaming} title="Use in roaming"
            description="When application detects a roaming situation."
          />

          <ListSection title="Background connection"/>

          <ListCheckbox
            onChange={this._onForegroundChange}
            value={this.state.foreground}
            title="Run in background"
            description="Disable this if you do not want incoming calls, it will improve battery life significantly"
          />

          <ListSection title="Nat traversal"/>

          <ListCheckbox
            value={false}
            title="Enable ICE"
            description="Turn on ICE feature"
          />
          <ListCheckbox
            value={false}
            title="Enable STUN"
            description="Turn on STUN feature"
          />
        </ScrollView>
      </View>
    )
  }
}

MediaSettingsScreen.propTypes = {
  settings: PropTypes.shape({
    network: PropTypes.object,
    service: PropTypes.shape({
      foreground: PropTypes.bool
    })
  }),
  onBackPress: PropTypes.func,
  onSavePress: PropTypes.func
}

function select(store) {
  return {
    settings: store.app.endpointSettings
  }
}

function actions(dispatch) {
  return {
    onBackPress: () => {
      dispatch(Navigation.goBack())
    },
    onSavePress: (configuration) => {
      dispatch(changeNetworkSettings(configuration))
    }
  }
}

export default connect(select, actions)(MediaSettingsScreen)
