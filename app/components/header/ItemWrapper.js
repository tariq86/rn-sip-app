import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'

export default class ItemWrapper extends React.Component {
    render() {
        const {item, color} = this.props;
        if (!item) {
            return null;
        }

        let content;
        const {title, icon, layout, onPress} = item;

        if (layout !== 'icon' && title) {
            content = (
                <Text style={[styles.itemText, {color}]}>
                    {title.toUpperCase()}
                </Text>
            );
        } else if (icon) {
            content = <Image source={icon} />;
        }

        return (
            <TouchableOpacity
                accessibilityLabel={title}
                accessibilityTraits="button"
                onPress={onPress}
                style={styles.itemWrapper}>
                {content}
            </TouchableOpacity>
        );
    }
}

ItemWrapper.propTypes = {
    item: PropTypes.object,
    color: PropTypes.string,
    layout: PropTypes.string,
    onPress: PropTypes.func
};
