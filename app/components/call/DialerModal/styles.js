import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff"
  },
  containerDarkStyle: {
    backgroundColor: "#3f5057"
  },
  touchableDarkStyle: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#52636a"
  },
  touchableStyle: {
    flex: 0.1,
    backgroundColor: "#E7ECEF",
    borderTopWidth: 1,
    borderColor: "#E0E7EA",
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableText: {
    fontSize: correctFontSizeForScreen(12)
  },
  touchableTextStyle: {
    color: "#000"
  },
  touchableTextDarkStyle: {
    color: "#FFF"
  }
})
