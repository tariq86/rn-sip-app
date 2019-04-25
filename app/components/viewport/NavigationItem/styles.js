/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 7,
        flexDirection: 'row',
        height: 36
    },
    text: {
        paddingLeft: 8,
        paddingTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: "#FFF",
    },
    touchable: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFF"
    }
})
