import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1
  },
  contentBackground: {
    margin: 30,
    flex: 0.7,
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
    fontSize: correctFontSizeForScreen(18)
  },
  keypadInput: {
    flex: 0.20
  },
  keypad: {
    flex: 1,
    borderColor: "#E0E7EA",
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 30
  }
})
