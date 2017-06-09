import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  contentBackground: {
    backgroundColor: "#FFF",
    padding: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: "#000",
    fontSize: correctFontSizeForScreen(22)
  },
  actionTouchable: {
    padding: 12,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    borderBottomWidth: 1,
    backgroundColor: "#4CD964"
  },
  actionGreen: {
    backgroundColor: "#4CD964"
  },
  actionRed: {
    backgroundColor: "#FF3B30"
  },
  actionText: {
    textAlign: 'center',
    flex: 1,
    fontSize: correctFontSizeForScreen(18),
    color: "#FFF"
  }
})
