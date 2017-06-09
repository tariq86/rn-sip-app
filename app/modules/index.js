import {combineReducers} from 'redux'

import app from './app'
import pjsip from './pjsip'
import navigation from './navigation'

const appReducer = combineReducers({
  navigation,
  app,
  pjsip,
})

const rootReducer = (state, action) => {
  if (action.type === 'app/DESTROY') {
    state = {
      navigation: state.navigation
    }
  }

  return appReducer(state, action)
}

export default rootReducer
