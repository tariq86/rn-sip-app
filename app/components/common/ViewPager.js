'use strict';

const React = require('react');

const {
    View,
    StyleSheet,
    ScrollView,
    ViewPagerAndroid,
    Platform,
    } = require('react-native');

// TODO: Prettify code

//ViewPager.props = {
//    count: PropTypes.number;
//    selectedIndex: PropTypes.number;
//    onSelectedIndexChange: PropTypes.function(index: number) => void;
//    bounces?: boolean;
//    children?: any;
//    style?: any;
//};
//
//type State = {
//    width: number;
//height: number;
//selectedIndex: number;
//initialSelectedIndex: number;
//scrollingTo: ?number;
//};

class ViewPager extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            selectedIndex: this.props.selectedIndex,
            initialSelectedIndex: this.props.selectedIndex,
            scrollingTo: null,
        };
        this._handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
        this._adjustCardSize = this.adjustCardSize.bind(this);
    }

    render() {
        if (Platform.OS === 'ios') {
            return this.renderIOS();
        } else {
            return this.renderAndroid();
        }
    }

    renderIOS() {
        return (
            <ScrollView
                ref="scrollview"
                contentOffset={{
          x: this.state.width * this.state.initialSelectedIndex,
          y: 0,
        }}
                style={[styles.scrollview, this.props.style]}
                horizontal={true}
                pagingEnabled={true}
                bounces={!!this.props.bounces}
                scrollsToTop={false}
                onScroll={this._handleHorizontalScroll}
                scrollEventThrottle={100}
                removeClippedSubviews={true}
                automaticallyAdjustContentInsets={false}
                directionalLockEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onLayout={this._adjustCardSize}>
                {this.renderContent()}
            </ScrollView>
        );
    }

    renderAndroid() {
        return (
            <ViewPagerAndroid
                ref="scrollview"
                initialPage={this.state.initialSelectedIndex}
                onPageSelected={this._handleHorizontalScroll}
                style={styles.container}>
                {this.renderContent()}
            </ViewPagerAndroid>
        );
    }

    adjustCardSize(e: any) {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            if (Platform.OS === 'ios') {
                this.refs.scrollview.scrollTo({
                    x: nextProps.selectedIndex * this.state.width,
                    animated: true,
                });
                this.setState({scrollingTo: nextProps.selectedIndex});
            } else {
                this.refs.scrollview.setPage(nextProps.selectedIndex);
                this.setState({selectedIndex: nextProps.selectedIndex});
            }
        }
    }

    renderContent(): Array<ReactElement> {
        var {width, height} = this.state;
        var style = Platform.OS === 'ios' && styles.card;
        return React.Children.map(this.props.children, (child, i) => (
            <View style={[style, {width, height}]} key={'r_' + i}>
                {child}
            </View>
        ));
    }

    handleHorizontalScroll(e: any) {
        var selectedIndex = e.nativeEvent.position;
        if (selectedIndex === undefined) {
            selectedIndex = Math.round(
                e.nativeEvent.contentOffset.x / this.state.width
            );
        }
        if (selectedIndex < 0 || selectedIndex >= this.props.count) {
            return;
        }
        if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
            return;
        }
        if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
            this.setState({selectedIndex, scrollingTo: null});
            const {onSelectedIndexChange} = this.props;
            onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    card: {
        backgroundColor: 'transparent',
    }
});

module.exports = ViewPager;
