import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E7EA',
    padding: 10
  },
  iconContainer: {
    height: 48,
    width: 48,
    backgroundColor: "#333",
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  },
  descriptionTitle: {
    fontSize: correctFontSizeForScreen(16),
    marginBottom: 2
  },
  descriptionText: {
    fontSize: correctFontSizeForScreen(11),
    color: "#979797",
    marginTop: 2
  },
  goContainer: {
    justifyContent: 'center'
  }
})
