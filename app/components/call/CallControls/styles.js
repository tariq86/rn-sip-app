import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    height: 64,
    width: 64
  },
  buttonTouchable: {
    width: 64,
    height: 64,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 64
  },
  buttonRed: {
    backgroundColor: "#FF3B30"
  },
  buttonDisabled: {
    backgroundColor: "#B6B6B6"
  },
  buttonGreen: {
    backgroundColor: "#4CD964"
  },
  buttonYellow: {
    backgroundColor: "#EBAE00"
  }
})
