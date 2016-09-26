import React, { Component, PropTypes } from 'react';
import {View, Text} from 'react-native'

import HeaderItem from './Item'
import s from './styles';

export default class Header extends Component {
    render() {
        const {leftItem, title, rightItem, foreground} = this.props;
        const titleColor = foreground === 'dark' ? F8Colors.darkText : 'white';
        const itemsColor = foreground === 'dark' ? F8Colors.lightText : 'white';

        const content = React.Children.count(this.props.children) === 0
            ? <Text style={[s.titleText, {color: titleColor}]}>
            {title}
        </Text>
            : this.props.children;
        return (
            <View style={[s.header, this.props.style]}>
                <View style={s.leftItem}>
                    <HeaderItem color={itemsColor} item={leftItem} />
                </View>
                <View
                    accessible={true}
                    accessibilityLabel={title}
                    accessibilityTraits="header"
                    style={s.centerItem}>
                    {content}
                </View>
                <View style={s.rightItem}>
                    <HeaderItem color={itemsColor} item={rightItem} />
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