import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {initAccounts, changeAccount} from './accounts'
import {initCalls, receiveCall, changeCall, terminateCall} from './calls'
import {Endpoint} from 'react-native-pjsip'

export const INITIALIZED = 'app/INITIALIZED';

/**
 * Action Creators
 */
export function init() {
    return async (dispatch, getState) => {
        console.log("App init");

        // Retrieving PjSip service state
        // It is possible that Endpoint instance already have registered accounts and active calls.
        // (because Javascript state is not persistent when User close application, e.g. application goes to background state)

        let endpoint = new Endpoint();
        // let state = await endpoint.start();
        // let {accounts, calls} = state;

        let accounts = [];
        let calls = [];

        // Subscribe to endpoint events
        endpoint.on("registration_changed", (account) => {
            dispatch(changeAccount(account));
        });
        endpoint.on("call_received", (call) => {
            dispatch(receiveCall(call));
        });
        endpoint.on("call_changed", (call) => {
            dispatch(changeCall(call));
        });
        endpoint.on("call_terminated", (call) => {
            dispatch(terminateCall(call));
        });

        dispatch(initAccounts(accounts));
        dispatch(initCalls(calls));
        dispatch({type: INITIALIZED, payload: endpoint});

        dispatch(Navigation.goAndReplace({name: 'conversations'}))
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