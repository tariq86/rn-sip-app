import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  optionTouchable: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#E0E7EA"
  },
  optionTitle: {
    flex: 1,
    fontSize: correctFontSizeForScreen(15),
    color: "#000"
  },
  optionIcon: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderColor: "#3F5057",
    borderWidth: 1
  },
  optionIconSelected: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderColor: "#3F5057",
    backgroundColor: "#3F5057",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
