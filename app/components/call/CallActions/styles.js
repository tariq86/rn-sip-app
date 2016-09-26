import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale';

export default StyleSheet.create({
    switchContainer: {
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    switchIndicator: {
        width: 8,
        height: 8,
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: 8
    },
    switchActive: {
        backgroundColor: "#FFF"
    }
});