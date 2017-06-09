import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E7EA',
    padding: 10
  },
  abbrContainer: {
    height: 48,
    width: 48,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  abbrText: {
    color: "#FFF"
  },
  abbrPresence: {
    borderWidth: 3,
    borderColor: "#FFF",
    width: 18,
    height: 18,
    borderRadius: 12,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  },
  infoTitle: {
    fontSize: correctFontSizeForScreen(16),
    marginBottom: 2
  },
  infoStatus: {
    fontSize: correctFontSizeForScreen(11),
    color: "#979797",
    marginTop: 2
  },
  goContainer: {
    justifyContent: 'center'
  }
})
