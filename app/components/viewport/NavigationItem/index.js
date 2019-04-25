import React, {Component} from 'react'
import {Animated} from 'react-native'
import Touchable from '../../common/Touchable'
import PropTypes from 'prop-types'
import s from './styles'

function getNameOfTab (tab) {
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
  
      this.props.onPress = this.props.onPress.bind(this)
    }
  
    componentDidUpdate(nextProps) {
      if (this.props.selected !== nextProps.selected) {
        Animated.timing(this.state.opacityValue, {toValue: nextProps.selected ? 1 : 0, duration: 300}).start()
      }
      if (this.props.offset !== nextProps.offset) {
        Animated.timing(this.state.offsetValue, {toValue: nextProps.offset, duration: 300}).start()
      }
    }
  
    onPress() {
      const {tab, onPress} = this.props
      onPress && onPress(tab)
    }
  
    render() {
      const {tab, onTextLayout} = this.props
  
      return (
        <Animated.View style={[s.container, {right: this.state.offsetValue}]}>
          <Touchable onPress={this.onPress} style={s.touchable} />
          <Animated.Text style={[s.text, {opacity: this.state.opacityValue}]} onLayout={onTextLayout} pointerEvents="none" numberOfLines={1}>
            {getNameOfTab(tab)}
          </Animated.Text>
        </Animated.View>
      )
    }
  }
  
  NavigationItem.propTypes = {
    tab: PropTypes.string,
    selected: PropTypes.bool,
    offset: PropTypes.number,
    onTextLayout: PropTypes.func,
    onPress: PropTypes.func
  }

  export default NavigationItem