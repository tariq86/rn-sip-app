import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {Endpoint} from '../../pjsip'
import {OrderedMap, Record} from 'immutable';

export const CALLS_INIT = 'calls/INIT';
export const CALL_CREATED = 'calls/CALL_CREATED';
export const CALL_CHANGED = 'calls/CALL_CHANGED';
export const CALL_TERMINATED = 'calls/CALL_TERMINATED';

/**
 * Action Creators
 */
export function initCalls(calls) {
    return async function(dispatch, getState) {
        // -----
        calls.forEach((call) => subscribe(call, dispatch));

        // -----
        dispatch({type: CALLS_INIT, calls});
    };
}

export function makeCall(destination, account = null) {
    return async function(dispatch, getState) {
        // Use "default" account if none provided
        if (account == null) {
            account = getState().accounts.map.first();
            if (account) {
                account = account.get('ref');
            }
        }

        if (!account) {
            throw new Error("At least one account should be available to make a call.");
        }

        // -----
        // TODO: Use account getHost property (not realm)!
        console.log("Before account.makeCall");
        let call = await account.makeCall("sip:" + destination + "@192.168.31.85");
        console.log("After account.makeCall");

        // -----
        subscribe(call, dispatch);

        // -----
        dispatch({type: CALL_CREATED, call});

        // -----
        var record = getState().calls.map.get(call.getId());
        dispatch(Navigation.goTo({name: 'call', call: record}));

        console.log("End account.makeCall");
    };
}

function subscribe(call, dispatch) {
    call.addListener("changed", (c) => dispatch({type: CALL_CHANGED, call: c}));
    call.addListener("terminated", (c) => dispatch({type: CALL_TERMINATED, call: c}));
}

/**
 * Records
 */

var CallRecord = Record({
    id: -1,
    callId: null,
    localContact: null,
    localUri: null,
    remoteContact: null,
    remoteUri: null,

    state: null,
    stateText: null,

    connectDuration: 0,
    totalDuration: 0,

    remoteOfferer: false,
    remoteAudioCount: 0,
    remoteVideoCount: 0,
    audioCount: 0,
    videoCount: 0,
    ref: null
});

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
                        return result.set(call.getId(), new CallRecord({
                            ...call.toJson(),
                            ref: call
                        }));
                    },
                    state.map
                )
            };
        case CALL_CREATED:
        case CALL_CHANGED:
            return {
                ...state,
                map: state.map.set(action.call.getId(), new CallRecord({
                    ...action.call.toJson(),
                    ref: action.call
                }))
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
