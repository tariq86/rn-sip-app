import {combineReducers} from 'redux'

import app from './app'
import accounts from './accounts'
import calls from './calls'
import navigation from './navigation'

const rootReducer = combineReducers({
    app,
    accounts,
    calls,
    navigation
});

export default rootReducer
