import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
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
    flex: 1,
    justifyContent: 'center'
  },
  modalContent: {
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#FFF",
    borderRadius: 8
  },
  modalHeader: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: "#E0E7EA"
  },
  modalTitle: {
    textAlign: 'center',
    flex: 1,
    fontSize: correctFontSizeForScreen(21)
  },
  modalSubmitTouchable: {
    backgroundColor: "#E7ECEF",
    borderTopWidth: 1,
    borderColor: "#E0E7EA",
    marginTop: 20,
    height: 50,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    // backgroundColor: "#bdced5",
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalSubmitText: {
    fontSize: correctFontSizeForScreen(13),
    color: "#000"
  },
  modalClose: {
    position: 'absolute',
    right: 20,
    padding: 8,
    top: 13,
    borderRadius: 12
  }
})
