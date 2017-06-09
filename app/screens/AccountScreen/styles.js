import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../utils/scale'

export default StyleSheet.create({
  deleteButton: {
    height: 46,
    backgroundColor: "#E7ECEF",
    borderTopWidth: 1,
    borderColor: "#E0E7EA",
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButtonText: {
    color: "#000",
    fontSize: correctFontSizeForScreen(14)
  }
})
