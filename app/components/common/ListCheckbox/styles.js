import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#E0E7EA', padding: 10},
  descriptionContainer: {flex: 1, justifyContent: 'center', marginRight: 10},
  descriptionTitle: {fontSize: correctFontSizeForScreen(16), marginBottom: 2, color: "#000"},
  descriptionText: {fontSize: correctFontSizeForScreen(11), color: "#979797", marginTop: 2},
  descriptionTextDisabled: {
    color: "#CCC"
  },
  checkboxSelected: {
    height: 22,
    width: 22,
    borderRadius: 3,
    backgroundColor: "#59ACFA",
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxDisabled: {
    backgroundColor: "#CCC"
  },
  checkbox: {
    height: 22,
    width: 22,
    borderRadius: 3,
    backgroundColor: "#3F5057"
  },
  checkboxHole: {
    backgroundColor: "#FFF",
    margin: 2,
    width: 18,
    height: 18
  }
})

