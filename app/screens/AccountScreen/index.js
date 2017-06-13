import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TouchableHighlight, View, Text, ScrollView} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'
import {createAccount, deleteAccount} from '../../modules/pjsip'

import Header from '../../components/Header'
import ListSection from '../../components/Common/ListSection'
import ListTextField from '../../components/Common/ListTextField'
import ListSelectField from '../../components/Common/ListSelectField'
import ListFieldSeparator from '../../components/Common/ListFieldSeparator'

import s from './styles'
import cs from '../../assets/styles/containers'


class AccountScreen extends Component {

  constructor(props) {
    super(props)

    if (this.props.account) {
      this.state = {
        addable: true,

        name: this.props.account.getName(),
        username: this.props.account.getUsername(),
        domain: this.props.account.getDomain(),
        password: this.props.account.getPassword(),

        proxy: this.props.account.getProxy(),
        transport: this.props.account.getTransport(),
        regServer: this.props.account.getRegServer(),
        regTimeout: this.props.account.getRegTimeout()
      }
    } else {
      this.state = {
        addable: false,

        name: "",
        username: "",
        domain: "",
        password: "",

        proxy: "",
        transport: "",
        regServer: "",
        regTimeout: ""
      }
    }

    this._onNameChanged = this.onFieldChanged.bind(this, "name")
    this._onUsernameChanged = this.onFieldChanged.bind(this, "username")
    this._onPasswordChanged = this.onFieldChanged.bind(this, "password")
    this._onDomainChanged = this.onFieldChanged.bind(this, "domain")
    this._onProxyChanged = this.onFieldChanged.bind(this, "proxy")
    this._onTransportChanged = this.onFieldChanged.bind(this, "transport")
    this._onRegServerChanged = this.onFieldChanged.bind(this, "regServer")
    this._onRegTimeoutChanged = this.onFieldChanged.bind(this, "regTimeout")
    this._onSubmitPress = this.onSubmitPress.bind(this)
    this._onDeletePress = this.onDeletePress.bind(this)
  }

  onFieldChanged(name, value) {
    const s = {...this.state, [name]: value}
    const addable = s.name.length > 0 && s.username.length > 0 && s.domain.length > 0 && s.password.length > 0

    this.setState({[name]: value, addable: addable})
  }

  onSubmitPress() {
    if (!this.state.addable) {
      return alert("Please fill all required fields.")
    }

    const credentials = {
      name: this.state.name,
      username: this.state.username,
      domain: this.state.domain,
      password: this.state.password,

      proxy: this.state.proxy,
      transport: this.state.transport,
      regServer: this.state.regServer,
      regTimeout: this.state.regTimeout
    }

    if (this.props.account) {
      this.props.onChangePress && this.props.onChangePress(credentials)
    } else {
      this.props.onCreatePress && this.props.onCreatePress(credentials)
    }
  }

  onDeletePress() {
    this.props.onDeletePress && this.props.onDeletePress(this.props.account)
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
      title: 'Create',
      icon: require('../../assets/images/header/ok_white.png'),
      layout: 'icon',
      onPress: this._onSubmitPress
    }

    return (
      <View style={cs.max}>
        <Header title={this.props.account ? this.props.account.getName() : "New account"} {...platformHeaderProps} />

        <ScrollView keyboardShouldPersistTaps='always' style={cs.max}>
          <ListSection title="General"/>
          <ListFieldSeparator />
          <ListTextField
            title="Full name"
            placeholder="Display name"
            value={this.state.name}
            onChange={this._onNameChanged}
          />
          <ListFieldSeparator />
          <ListTextField
            inputProps={{autoCapitalize: "none", autoCorrect: false}}
            title="Username"
            placeholder="Account name / Login" value={this.state.username}
            onChange={this._onUsernameChanged}
          />
          <ListFieldSeparator />
          <ListTextField
            inputProps={{autoCapitalize: "none", autoCorrect: false}}
            title="Server"
            placeholder="SIP server domain"
            value={this.state.domain}
            onChange={this._onDomainChanged}
          />
          <ListFieldSeparator />
          <ListTextField
            inputProps={{autoCapitalize: "none", autoCorrect: false, secureTextEntry: true}}
            title="Password"
            placeholder="Password to access your account" value={this.state.password}
            valueType="password"
            onChange={this._onPasswordChanged}
          />
          <ListFieldSeparator />
          <ListSection title="Advanced"/>
          <ListFieldSeparator />
          <ListTextField
            inputProps={{autoCapitalize: "none", autoCorrect: false}}
            title="Proxy"
            description="Proxy domain/ip and port"
            placeholder="Proxy domain/ip and port"
            value={this.state.proxy}
            onChange={this._onProxyChanged}
          />
          <ListFieldSeparator />
          <ListSelectField
            options={["UDP", "TCP", "TLS"]}
            title="Transport"
            placeholder="Connection transport UDP, TCP, TLS"
            value={this.state.transport}
            onChange={this._onTransportChanged}
          />
          <ListFieldSeparator />
          <ListTextField
            inputProps={{autoCapitalize: "none", autoCorrect: false}}
            title="Registry server / Realm"
            placeholder="URL to be put in the request URI for the registration"
            value={this.state.regServer}
            onChange={this._onRegServerChanged}
          />
          <ListFieldSeparator />
          <ListTextField
            inputProps={{autoCapitalize: "none", autoCorrect: false, keyboardType: "numeric"}}
            title="Registration Timeout"
            placeholder="Interval for registration, in seconds"
            value={this.state.regTimeout} onChange={this._onRegTimeoutChanged}
          />
        </ScrollView>
        {
          !this.props.account ? null :
            <TouchableHighlight
              style={s.deleteButton}
              onPress={this._onDeletePress}
            >
              <Text style={s.deleteButtonText}>Remove account</Text>
            </TouchableHighlight>
        }
      </View>
    )
  }

}

AccountScreen.propTypes = {
  account: PropTypes.shape({
    getName: PropTypes.func,
    getUsername: PropTypes.func,
    getDomain: PropTypes.func,
    getPassword: PropTypes.func,
    getProxy: PropTypes.func,
    getTransport: PropTypes.func,
    getRegServer: PropTypes.func,
    getRegTimeout: PropTypes.func
  }),
  onBackPress: PropTypes.func,
  onCreatePress: PropTypes.func,
  onChangePress: PropTypes.func,
  onDeletePress: PropTypes.func
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
    },
    onCreatePress: (configuration) => {
      dispatch(async () => {
        const account = await dispatch(createAccount(configuration))
        console.log("account", account)
        await dispatch(Navigation.goAndReplace({name: 'settings'}))
      })
    },
    onChangePress: (account, configuration) => {
      alert("Not implemented")
      dispatch(Navigation.goAndReplace({name: 'settings'}))
      // dispatch(replaceAccount(account, configuration));
    },
    onDeletePress: (account) => {
      dispatch(deleteAccount(account))
    }
  }
}

export default connect(select, actions)(AccountScreen)
