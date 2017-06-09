import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1
  },
  contentBackground: {
    margin: 30,
    marginTop: 70,
    backgroundColor: "#FFF",
    borderRadius: 8
  },
  titleContainer: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#E0E7EA"
  },
  titleText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18
  },
  optionTouchable: {
    padding: 20,
    flexDirection: 'row',
    borderColor: "#E0E7EA",
    borderBottomWidth: 1
  },
  optionTouchableLast: {
    borderBottomWidth: 0
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#000"
  }
})

