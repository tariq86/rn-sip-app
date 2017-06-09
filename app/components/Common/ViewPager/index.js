import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, ScrollView, ViewPagerAndroid, Platform} from 'react-native'

import s from './styles'

export default class ViewPager extends Component {

  constructor(props: Props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
      initialSelectedIndex: this.props.selectedIndex,
      scrollingTo: null
    }

    this._handleHorizontalScroll = this.handleHorizontalScroll.bind(this)
    this._adjustCardSize = this.adjustCardSize.bind(this)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        this.scrollView.scrollTo({
          x: nextProps.selectedIndex * this.state.width,
          animated: true,
        })
        this.setState({scrollingTo: nextProps.selectedIndex})
      } else {
        this.scrollView.setPage(nextProps.selectedIndex)
        this.setState({selectedIndex: nextProps.selectedIndex})
      }
    }
  }

  handleHorizontalScroll(e: any) {
    var selectedIndex = e.nativeEvent.position
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
        e.nativeEvent.contentOffset.x / this.state.width
      )
    }
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return
    }
    if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
      return
    }
    if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
      this.setState({selectedIndex, scrollingTo: null})
      const {onSelectedIndexChange} = this.props
      onSelectedIndexChange && onSelectedIndexChange(selectedIndex)
    }
  }

  renderIOS() {
    return (
      <ScrollView
        ref={(c) => {
          this.scrollView = c
        }}
        contentOffset={{x: this.state.width * this.state.initialSelectedIndex, y: 0}}
        style={[s.scrollview, this.props.style]}
        horizontal
        pagingEnabled
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this._handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this._adjustCardSize}
      >
        {this.renderContent()}
      </ScrollView>
    )
  }

  renderAndroid() {
    return (
      <ViewPagerAndroid
        ref={(c) => {
          this.scrollView = c
        }}
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this._handleHorizontalScroll}
        style={s.container}
      >
        {this.renderContent()}
      </ViewPagerAndroid>
    )
  }

  adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }

  renderContent(): Array<ReactElement> {
    const {width, height} = this.state
    const style = Platform.OS === 'ios' && s.card

    return React.Children.map(this.props.children, (child, i) => (
      <View style={[style, {width, height}]} key={'r_' + i}>
        {child}
      </View>
    ))
  }

  render() {
    if (Platform.OS === 'ios') {
      return this.renderIOS()
    } else {
      return this.renderAndroid()
    }
  }
}

ViewPager.propTypes = {
  children: PropTypes.node,
  style: View.propTypes.style,
  count: PropTypes.number,
  selectedIndex: PropTypes.number,
  onSelectedIndexChange: PropTypes.func,
  bounces: PropTypes.bool
}
