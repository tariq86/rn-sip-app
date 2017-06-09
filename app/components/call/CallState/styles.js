import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: correctFontSizeForScreen(16),
    color: "#FFF",
    padding: 0,
    margin: 0
  }
})
