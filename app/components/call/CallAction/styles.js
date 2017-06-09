import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  touchable: {
    height: 64,
    width: 64,
    borderRadius: 64,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableActive: {
    borderColor: '#FFF',
    backgroundColor: "#FFF"
  },
  touchableInactive: {
    borderColor: 'rgba(255, 255, 255, 1)'
  },
  image: {
    height: 28,
    width: 28
  },
  text: {
    paddingTop: 5,
    color: "#FFF"
  }
})
