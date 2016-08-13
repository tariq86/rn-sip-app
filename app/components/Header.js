import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet
} from 'react-native'
import ItemWrapper from './header/ItemWrapper'

export class Header extends Component {
    render() {
        const {leftItem, title, rightItem, foreground} = this.props;
        const titleColor = foreground === 'dark' ? F8Colors.darkText : 'white';
        const itemsColor = foreground === 'dark' ? F8Colors.lightText : 'white';

        const content = React.Children.count(this.props.children) === 0
            ? <Text style={[styles.titleText, {color: titleColor}]}>
            {title}
        </Text>
            : this.props.children;
        return (
            <View style={[styles.header, this.props.style]}>
                <View style={styles.leftItem}>
                    <ItemWrapper color={itemsColor} item={leftItem} />
                </View>
                <View
                    accessible={true}
                    accessibilityLabel={title}
                    accessibilityTraits="header"
                    style={styles.centerItem}>
                    {content}
                </View>
                <View style={styles.rightItem}>
                    <ItemWrapper color={itemsColor} item={rightItem} />
                </View>
            </View>
        );
    }
}

Header.propTypes = {
    leftItem: PropTypes.object,
    rightItem: PropTypes.object,
    extraItems: PropTypes.array,
    foreground: PropTypes.object,
    style: PropTypes.any,
    children: PropTypes.any
};



var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    header: {
        backgroundColor: '#3f5057',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 14,
    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerItem: {
        flex: 2,
        alignItems: 'center',
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemWrapper: {
        padding: 11,
    },
    itemText: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white',
    },
});

// const Header = Platform.OS === 'ios' ? F8HeaderIOS : F8HeaderAndroid;
Header.height = HEADER_HEIGHT;

export default Header;