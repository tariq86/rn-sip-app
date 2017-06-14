import { expect } from 'chai'
import {calculateItemsOffset} from './styles'
import {NAVIGATION_TABS} from './index'


// TODO: Fix tests

describe('components > NavigationPager > styles', () => {
  describe('calculateItemsOffset', () => {
    const defaultInitialState = {
      dialer: {
        iconWidth: 36,
        textWidth: 100
      },
      conversations: {
        iconWidth: 36,
        textWidth: 50
      },
      history: {
        iconWidth: 36,
        textWidth: 100
      },
      settings: {
        iconWidth: 36,
        textWidth: 50
      }
    }
    const defaultOffset1 = 16
    const defaultOffset2 = 16 + 36 + 8
    const defaultOffset3 = 16 + 36 + 8 + 36 + 8
    const defaultOffset4 = 16 + 36 + 8 + 36 + 8 + 36 + 8

    it('should correctly set offsets without including textWidth', () => {
      expect(calculateItemsOffset(NAVIGATION_TABS, defaultInitialState, undefined)).to.be.deep.eq({
        dialer: {
          iconWidth: 36,
          textWidth: 100,
          offset: defaultOffset4
        },
        conversations: {
          iconWidth: 36,
          textWidth: 50,
          offset: defaultOffset3
        },
        history: {
          iconWidth: 36,
          textWidth: 100,
          offset: defaultOffset2
        },
        settings: {
          iconWidth: 36,
          textWidth: 50,
          offset: defaultOffset1
        }
      })
    })

    it('should correctly set offsets for first selection item', () => {
      expect(calculateItemsOffset(NAVIGATION_TABS, defaultInitialState, 'dialer')).to.be.deep.eq({
        dialer: {
          iconWidth: 36,
          textWidth: 100,
          offset: defaultOffset4 + 100
        },
        conversations: {
          iconWidth: 36,
          textWidth: 50,
          offset: defaultOffset3
        },
        history: {
          iconWidth: 36,
          textWidth: 100,
          offset: defaultOffset2
        },
        settings: {
          iconWidth: 36,
          textWidth: 50,
          offset: defaultOffset1
        }
      })
    })

    it('should correctly set offsets for last selection item', () => {
      expect(calculateItemsOffset(NAVIGATION_TABS, defaultInitialState, 'settings')).to.be.deep.eq({
        dialer: {
          iconWidth: 36,
          textWidth: 100,
          offset: defaultOffset4 + 50
        },
        conversations: {
          iconWidth: 36,
          textWidth: 50,
          offset: defaultOffset3 + 50
        },
        history: {
          iconWidth: 36,
          textWidth: 100,
          offset: defaultOffset2 + 50
        },
        settings: {
          iconWidth: 36,
          textWidth: 50,
          offset: defaultOffset1 + 50
        }
      })
    })

  })
})
