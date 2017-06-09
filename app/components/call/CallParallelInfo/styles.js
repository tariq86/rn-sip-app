import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  icon: {
    marginLeft: 16
  },
  description: {
    fontSize: 18,
    color: "#FFF",
    flex: 1,
    marginLeft: 26,
    marginRight: 16
  },
  duration: {
    textAlign: 'right',
    width: 70,
    fontSize: 16,
    color: "#FFF",
    padding: 0,
    margin: 0
  }
})
