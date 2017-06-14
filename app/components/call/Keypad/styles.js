import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default styles = StyleSheet.create({
  row: {
    flex: 0.127,
    flexDirection: "row"
  },
  outerLineOffset: {
    flex: 0.106
  },
  innerLineOffset: {
    flex: 0.09
  },
  keyWrapper: {
    flex: 0.202,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  keyTouchable: {
    borderRadius: 100,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  keyDigitText: {
    fontSize: correctFontSizeForScreen(28),
    color: "#000",
    fontWeight: '200',
    textAlign: "center"
  },
  keyLettersText: {
    fontSize: correctFontSizeForScreen(9),
    color: "#000",
    fontWeight: '200',
    textAlign: "center"
  },
  keyDigitWrapper: {
    backgroundColor: 'transparent'
  }
})

