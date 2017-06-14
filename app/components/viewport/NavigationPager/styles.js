import {StyleSheet} from 'react-native'

export const SPACE_WIDTH = 8
export const INITIAL_OFFSET = 16
export const ICON_WIDTH = 36
export const HEADER_COLOR = '#3f5057'

export function calculateItemsOffset(tabs, state, selection) {
  const emptyState = {...state}
  const rtabs = [...tabs].reverse()
  rtabs.forEach((name) => (emptyState[name].offset = 0))

  for (let i = 0; i < rtabs.length; i++) {
    const name = rtabs[i]
    let offset = i > 0 ? emptyState[rtabs[i-1]].offset + ICON_WIDTH + SPACE_WIDTH : INITIAL_OFFSET

    if (i > 0) {
      offset += emptyState[rtabs[i-1]].textWidth
    }

    if (name !== selection) {


      offset -= emptyState[name].textWidth
    }

    emptyState[name].offset = offset
  }

  return emptyState
}

export default StyleSheet.create({
  container: {

  }
})
