import {NetInfo, AppState, Platform, NativeModules} from 'react-native'
import * as Navigation from './navigation'
import {initAccounts, onAccountChanged, createAccount} from './accounts'
import {initCalls, onCallReceived, onCallChanged, onCallTerminated, onCallScreenLocked} from './calls'
import {Endpoint} from 'react-native-pjsip'

export const INITIALIZED = 'app/INITIALIZED';
export const CHANGED_SETTINGS = 'app/CHANGED_SETTINGS';

/**
 * Action Creators
 */
export function init() {
    return async (dispatch, getState) => {
        // Retrieving PjSip service state
        // It is possible that Endpoint instance already have registered accounts and active calls.
        // (because Javascript state is not persistent when User close application, e.g. application goes to background state)

        let configuration = {
            ua: "PjApp by Vadim Ruban",
            foreground: true // Service will start working in foreground if at least one account exist and have network connection.
        };

        let endpoint = new Endpoint();
        let state = await endpoint.start(configuration);
        let {accounts, calls, settings : endpointSettings} = state;
        let {notificationIsFromForeground, notificationCallId} = state;

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
        endpoint.on("call_screen_locked", (call) => {
            dispatch(onCallScreenLocked(call));
        });

        dispatch(initAccounts(accounts));
        dispatch(initCalls(calls));
        dispatch({type: INITIALIZED, endpoint, endpointSettings, notificationIsFromForeground, notificationCallId});

        let route = {name: 'settings'};

        // Automatically show incoming call
        if (calls.length > 0) {
            for (let c of calls) {
                if (c.getState() == "PJSIP_INV_STATE_INCOMING") {
                    route = {name:'call', call: c};
                    break;
                }
            }
        }

        dispatch(Navigation.goAndReplace(route));
    }
}

export function changeNetworkSettings(configuration) {
    return async (dispatch, getState) => {
        let endpoint = getState().app.endpoint;
        await endpoint.changeNetworkConfiguration(configuration);

        let serviceConfiguration = {
            ...getState().app.endpointSettings.service,
            foreground: configuration.foreground
        };
        let settings = await endpoint.changeServiceConfiguration(serviceConfiguration);

        dispatch({type: CHANGED_SETTINGS, payload: settings});
        dispatch(Navigation.goAndReplace({name: 'settings'}));
    }
}

/**
 * Reducer
 */

const initialState = {
    notificationIsFromForeground: false,
    notificationCallId: null,
    endpointSettings: null,
    endpoint: null
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case INITIALIZED:
            return {...state,
                endpoint: action.endpoint,
                endpointSettings: action.endpointSettings,
                notificationIsFromForeground: action.notificationIsFromForeground,
                notificationCallId: action.notificationCallId,
            };
        case CHANGED_SETTINGS:
            return {...state,
                endpointSettings: action.payload
            };

        default:
            return state
    }
}