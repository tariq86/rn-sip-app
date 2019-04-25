import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import NavigationItem from '../NavigationItem'

import s, {calculateItemsOffset} from './styles'

export const NAVIGATION_TABS = [
  'dialer',
  'conversations',
  'history',
  'settings'
]

export const NavigationSeparator = () => {
  return (
    <View style={s.separatorOuter}>
      <View style={s.separatorInner} />
    </View>
  )
}

class NavigationPager extends Component {

  constructor(props) {
    super(props)

    const tabsInitialState = NAVIGATION_TABS.reduce((acc, name) => {
      acc[name] = {
        textWidth: 0,
        onTextLayout: this.onTextLayout.bind(this, name)
      }
      return acc
    }, {})
    const tabsState = calculateItemsOffset(NAVIGATION_TABS, tabsInitialState, props.selection)

    this.state = {
      ready: false,
      tabs: tabsState
    }
  }

  componentDidUpdate (nextProps) {
    if (this.state.ready && this.props.selection !== nextProps.selection) {
      const tabsState = calculateItemsOffset(NAVIGATION_TABS, this.state.tabs, nextProps.selection)
      this.setState({tabs: tabsState})
    }
  }

  onTextLayout(name, event) {
    if (this.state.ready) {
      return
    }

    const {width} = event.nativeEvent.layout
    let ready = true
    let tabs = {
      ...this.state.tabs,
      [name]: {
        ...this.state.tabs[name],
        textWidth: width
      }
    }

    for (const name of NAVIGATION_TABS) {
      if (!tabs[name].textWidth) {
         ready = false
      }
    }

    if (ready) {
      tabs = calculateItemsOffset(NAVIGATION_TABS, tabs, this.props.selection)
    }

    this.setState({ready, tabs})
  }

  render() {
    const {selection, onPress} = this.props
    const {tabs} = this.state

    return (
      <View style={s.container}>
        {
          NAVIGATION_TABS.map((name) => {
            const {offset, onTextLayout} = tabs[name]
            const selected = name === selection

            return (
              <NavigationItem key={name} selected={selected} tab={name} offset={offset} onPress={onPress} onTextLayout={onTextLayout} />
            )
          })
        }
      </View>
    )
  }
}

NavigationPager.propTypes = {
  selection: PropTypes.string,
  onPress: PropTypes.func
}

export default NavigationPager
