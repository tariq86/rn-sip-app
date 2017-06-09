import {Platform, StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../utils/scale'

export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0
export const HEADER_HEIGHT = Platform.OS === 'ios' ? 42 + STATUS_BAR_HEIGHT : 50 + STATUS_BAR_HEIGHT

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: '#3f5057',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: correctFontSizeForScreen(18),
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
})

export default styles
