import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {initAccounts} from './accounts'
import {initCalls} from './calls'
import {Endpoint} from '../../pjsip'

export const INITIALIZED = 'app/INITIALIZED';
export const CHANGE_NET_STATUS = 'app/CHANGE_NET_STATUS';
export const CHANGE_APP_STATE = 'app/CHANGE_APP_STATE';

/**
 * Action Creators
 */
export function init() {
    return async (dispatch, getState) => {
        console.log("App init");

        // Retrieving PjSip service state
        // It is possible that Endpoint instance already have registered accounts and active calls.
        // (because Javascript state is not persistent when User close application, e.g. application goes to background state)
        let state = await Endpoint.start();
        let {accounts, calls} = state;

        dispatch(initAccounts(accounts));
        dispatch(initCalls(calls));
        dispatch({type: INITIALIZED});

        dispatch(Navigation.goAndReplace({name: 'home'}))

    }
}

// function setupNetStatusListener() {
//     return dispatch => {
//         NetInfo.isConnected.addEventListener('change',
//             async status => {
//                 dispatch({type: CHANGE_NET_STATUS, payload: status});
//                 await dispatch(onNetStatusChangeFaye(status))
//             }
//         );
//     }
// }
//
// function setupAppStatusListener() {
//     return (dispatch, getState) => {
//         AppState.addEventListener('change', status => {
//             // TODO: Update drawer rooms state and messages in current room
//             // if app status changes from backgrount to active
//             dispatch({type: CHANGE_APP_STATE, payload: status})
//         })
//     }
// }


/**
 * Reducer
 */

const initialState = {
    online: false
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case INITIALIZED:
            // return {...state,
            //   online: action.netStatus
            // }
            return state;

        case CHANGE_NET_STATUS:
            return {...state,
                online: action.payload
            };

        case CHANGE_APP_STATE:
            return {...state,
                appState: action.payload
            };

        default:
            return state
    }
}
