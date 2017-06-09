import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  gradient: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6
  },
  text: {
    color: '#3F5057',
    fontSize: correctFontSizeForScreen(13)
  }
})
