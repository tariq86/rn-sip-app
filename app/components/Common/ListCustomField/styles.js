import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E7EA',
    padding: 10
  },
  listContent: {
    flex: 1
  },
  listTitle: {
    fontSize: correctFontSizeForScreen(15),
    color: "#000"
  },
  listPlaceholder: {
    fontSize: correctFontSizeForScreen(11),
    color: "#666"
  },
  listIconContainer: {
    justifyContent: 'center'
  },
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1
  },
  modalContent: {
    margin: 30,
    marginTop: 70,
    backgroundColor: "#FFF",
    borderRadius: 8
  },
  modalHeader: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#E0E7EA"
  },
  modalTitle: {
    textAlign: 'center',
    flex: 1,
    fontSize: correctFontSizeForScreen(18)
  },
  modalSubmitTouchable: {
    margin: 20,
    height: 40,
    borderRadius: 3,
    flex: 0.5,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#4ea1ef",
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalSubmitText: {
    fontSize: correctFontSizeForScreen(13),
    color: "#FFF"
  }
})
