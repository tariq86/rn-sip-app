import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {OrderedMap, Record} from 'immutable';

export const CALLS_INIT = 'calls/INIT';
export const CALL_INITIATED = 'calls/CALL_INITIATED';
export const CALL_RECEIVED = 'calls/CALL_RECEIVED';
export const CALL_CHANGED = 'calls/CALL_CHANGED';
export const CALL_TERMINATED = 'calls/CALL_TERMINATED';

/**
 * Handles initialization event.
 *
 * @param {Call[]} calls
 * @returns {Function}
 */
export function initCalls(calls) {
    return async function(dispatch, getState) {
        dispatch({type: CALLS_INIT, calls});
    };
}

/**
 * Handles incoming call event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallReceived(call) {
    return async function(dispatch, getState) {
        dispatch({type: CALL_RECEIVED, call});
        dispatch(Navigation.goTo({name: 'call', call}));
    };
}

/**
 * Handles call change event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallChanged(call) {
    return async function(dispatch, getState) {
        dispatch({type: CALL_CHANGED, call});
    };
}

/**
 * Handles call change event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallTerminated(call) {
    return async function(dispatch, getState) {
        dispatch({type: CALL_CHANGED, call});
        dispatch({type: CALL_TERMINATED, call});
    };
}

/**
 * Initiate new outgoing call.
 *
 * @param {String} destination
 * @param {Account} account
 * @returns {Function}
 */
export function makeCall(destination, account = null) {
    return async function(dispatch, getState) {
        // Use "default" account if none provided
        if (account == null) {
            account = getState().accounts.map.first();
        }

        if (!account) {
            throw new Error("At least one account should be available to make a call.");
        }

        // -----
        let endpoint = getState()['app']['endpoint'];
        let call = endpoint.makeCall(account, destination);

        // -----
        dispatch(Navigation.goTo({name: 'call', call}));
    };
}

/**
 * Hangups active call.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function hangupCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.hangupCall(call);
    };
}

export function answerCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.answerCall(call);
    };
}

export function muteCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.muteCall(call);
    };
}

export function unmuteCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.unMuteCall(call);
    };
}

export function holdCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.holdCall(call);
    };
}

export function unholdCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.unholdCall(call);
    };
}

export function useSpeaker(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.useSpeaker(call);
    };
}

export function useEarpiece(call) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.useEarpiece(call);
    };
}

export function dtmfCall(call, key) {
    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        endpoint.dtmfCall(call, key);
    };
}

export function redirectCall(call, destination) { redirectCall
    return async function(dispatch, getState) {
        let account = getState().accounts.map.get(call.getAccountId());
        let endpoint = getState()['app']['endpoint'];
        endpoint.redirectCall(account, call, destination);
    };
}

export function xferCall(call, destination) {
    return async function(dispatch, getState) {
        let account = getState().accounts.map.get(call.getAccountId());
        let endpoint = getState()['app']['endpoint'];
        endpoint.xferCall(account, call, destination);
    };
}

/**
 * Reducer
 */

const initialState = {
    isLoading: true,
    map: new OrderedMap()
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case CALLS_INIT:
            return {
                ...state,
                isLoading: false,
                map: action.calls.reduce(
                    (result, call) => {
                        return result.set(call.getId(), call);
                    },
                    state.map
                )
            };
        case CALL_INITIATED:
        case CALL_RECEIVED:
        case CALL_CHANGED:
            return {
                ...state,
                map: state.map.set(action.call.getId(), action.call)
            };

        case CALL_TERMINATED:
            return {
                ...state,
                map: state.map.delete(action.call.getId())
            };

        default:
            return state
    }
}
