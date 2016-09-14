import React, { Component, PropTypes } from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    Platform,
    StyleSheet
} from 'react-native'
import ItemWrapper from './header/ItemWrapper'
import styles from '../styles/components/HeaderStyles';

console.log("styles", styles);

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

export default Header;