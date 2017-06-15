import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import {View, Text, Animated} from 'react-native'

import s, {calculateItemsOffset} from './styles'

export const NAVIGATION_TABS = [
  'dialer',
  'conversations',
  'history',
  'settings'
]

export function getNameOfTab (tab) {
  switch (tab) {
    case 'dialer':
      return 'Dialer'
    case 'conversations':
      return 'Conversations'
    case 'history':
      return 'History'
    case 'settings':
      return 'Settings'
  }
}

class NavigationItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offsetValue: new Animated.Value(props.offset),
      opacityValue: new Animated.Value(props.selected ? 1 : 0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      Animated.timing(this.state.opacityValue, {toValue: nextProps.selected ? 1 : 0, duration: 300}).start()
    }
    if (this.props.offset !== nextProps.offset) {
      Animated.timing(this.state.offsetValue, {toValue: nextProps.offset, duration: 300}).start()
    }
  }

  render() {
    const {tab, onTextLayout} = this.props

    return (
      <Animated.View style={{position: 'absolute', top: 7, right: this.state.offsetValue, flexDirection: 'row', height: 36}}>
        <View style={{width: 36, height: 36, borderRadius: 18, backgroundColor: "#FFF"}} />
        <Animated.Text style={{paddingLeft: 8, paddingTop: 8, fontSize: 14, fontWeight: 'bold', color: "#FFF", opacity: this.state.opacityValue}} onLayout={onTextLayout} pointerEvents="none" numberOfLines={1}>{getNameOfTab(tab)}</Animated.Text>
      </Animated.View>
    )
  }
}

NavigationItem.propTypes = {
  tab: PropTypes.string,
  selected: PropTypes.bool,
  offset: PropTypes.number,
  onTextLayout: PropTypes.func
}

const NavigationSeparator = () => {
  return (
    <View style={{position: 'absolute', right: 36 * 2 + 8 * 2 + 16, bottom: 0, overflow: 'hidden', flexDirection: 'row'}}>
      <View style={{width: 36, height: 2, borderRadius: 18, backgroundColor: "#FFF"}} />
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

  componentWillReceiveProps (nextProps) {
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
    const {selection, onChange} = this.props
    const {tabs} = this.state

    return (
      <View style={{height: 50, flex: 1, flexDirection: 'row'}}>
        {
          NAVIGATION_TABS.map((name) => {
            const {offset, onTextLayout} = tabs[name]
            const selected = name === selection

            return (
              <NavigationItem key={name} selected={selected} tab={name} offset={offset} onTextLayout={onTextLayout} />
            )
          })
        }
      </View>
    )
  }
}

NavigationPager.propTypes = {
  selection: PropTypes.string,
  onChange: PropTypes.func
}

export default NavigationPager
