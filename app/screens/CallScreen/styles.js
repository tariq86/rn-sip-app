import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../utils/scale'

export default StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  errorText: {
    color: "#FFF"
  },
  initContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initText: {
    color: "#FFF"
  }
})
