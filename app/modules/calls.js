import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {Endpoint} from '../../pjsip'

export const CALLS_INIT = 'calls/INIT';

/**
 * Action Creators
 */
export function initCalls(calls) {
    return async function(dispatch, getState) {
        // -----
        // accounts.forEach((call) => subscribe(call, dispatch));

        // -----
        dispatch({type: CALLS_INIT, payload: calls});
    };
}
export function makeCall(destination, account) {

}

/**
 * Reducer
 */

const initialState = {
    list: []
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case CALLS_INIT:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state
    }
}
