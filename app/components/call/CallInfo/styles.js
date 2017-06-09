import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  remoteNameText: {
    fontSize: 28,
    color: "#FFF",
    marginLeft: 20,
    marginRight: 20
  },
  remoteNumberText: {
    fontSize: 16,
    color: "#FFF",
    marginLeft: 20,
    marginRight: 20
  }
})
