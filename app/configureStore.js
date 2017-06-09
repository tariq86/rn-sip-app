import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './modules'

export default function configureStore(initialState) {
  const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
  return finalCreateStore(rootReducer, initialState)
}
