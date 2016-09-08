import {NetInfo, AppState, NativeModules} from 'react-native'
import * as Navigation from './navigation'
import {initAccounts, onAccountChanged, createAccount} from './accounts'
import {initCalls, onCallReceived, onCallChanged, onCallTerminated} from './calls'
import {Endpoint} from 'react-native-pjsip'

export const INITIALIZED = 'app/INITIALIZED';

/**
 * Action Creators
 */
export function init() {
    return async (dispatch, getState) => {
        // Retrieving PjSip service state
        // It is possible that Endpoint instance already have registered accounts and active calls.
        // (because Javascript state is not persistent when User close application, e.g. application goes to background state)

        let endpoint = new Endpoint();
        let state = await endpoint.start();
        let {accounts, calls} = state;

        // Subscribe to endpoint events
        endpoint.on("registration_changed", (account) => {
            dispatch(onAccountChanged(account));
        });
        endpoint.on("call_received", (call) => {
            dispatch(onCallReceived(call));
        });
        endpoint.on("call_changed", (call) => {
            dispatch(onCallChanged(call));
        });
        endpoint.on("call_terminated", (call) => {
            dispatch(onCallTerminated(call));
        });

        dispatch(initAccounts(accounts));
        dispatch(initCalls(calls));
        dispatch({type: INITIALIZED, payload: endpoint});

        dispatch(Navigation.goAndReplace({name: 'settings'}))
    }
}

/**
 * Reducer
 */

const initialState = {
    endpoint: null
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case INITIALIZED:
            return {...state,
                endpoint: action.payload
            };

        default:
            return state
    }
}