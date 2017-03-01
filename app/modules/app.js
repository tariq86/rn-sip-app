import {NetInfo, AppState, Platform, NativeModules, BackAndroid} from 'react-native'
import * as Navigation from './navigation'
import {initAccounts, onAccountChanged, createAccount} from './accounts'
import {initCalls, onCallReceived, onCallChanged, onCallTerminated, onCallScreenLocked} from './calls'
import {Endpoint} from 'react-native-pjsip'

export const INITIALIZED = 'app/INITIALIZED';
export const CHANGED_SETTINGS = 'app/CHANGED_SETTINGS';
export const CHANGED_CONNECTIVITY = 'app/CHANGED_CONNECTIVITY';

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
        let {accounts, calls, settings : endpointSettings, connectivity : endpointConnectivity} = state;

        // TODO: Show slider of active call when notificationIsFromForeground is true.
        // let {notificationIsFromForeground} = state;

        // Subscribe to endpoint events
        endpoint.on("registration_changed", (account) => {
            dispatch(onAccountChanged(account));
        });
        endpoint.on("connectivity_changed", (available) => {
            dispatch(onConnectivityChanged(available));
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
        dispatch({type: INITIALIZED, endpoint, endpointSettings, endpointConnectivity});

        if (accounts.length == 0) {
            dispatch(createAccount(
                {"name":"Vadim","username":"1000","domain":"dev.carusto.com","password":"reruda","proxy":"","transport":"","regServer":"","regTimeout":""}
            ));
        }

        let route = {name: 'settings'};

        // Show selected call
        if (state.hasOwnProperty("notificationCallId")) {
            for (let c of calls) {
                if (c.getId() == state['notificationCallId']) {
                    route = {name:'call', call: c};
                    break;
                }
            }
        } else if (calls.length > 0) {
            for (let c of calls) {
                if (c.getState() == "PJSIP_INV_STATE_INCOMING") {
                    route = {name:'call', call: c};
                    break;
                }
            }
        }

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', function() {
                let prev = getState().navigation.prevision.name;

                if (prev) {
                    dispatch(Navigation.goBack());
                    return true;
                }

                return false;
            });
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

function onConnectivityChanged(available) {
    return async function(dispatch, getState) {
        dispatch({type: CHANGED_CONNECTIVITY, payload: available});
    };
}

/**
 * Reducer
 */

const initialState = {
    notificationIsFromForeground: false,
    endpointSettings: null,
    endpointConnectivity: false,
    endpoint: null
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case INITIALIZED:
            return {...state,
                endpoint: action.endpoint,
                endpointSettings: action.endpointSettings,
                endpointConnectivity: action.endpointConnectivity,
                notificationIsFromForeground: action.notificationIsFromForeground,
                notificationCallId: action.notificationCallId
            };
        case CHANGED_SETTINGS:
            return {...state,
                endpointSettings: action.payload
            };
        case CHANGED_CONNECTIVITY:
            return {...state,
                endpointConnectivity: action.payload
            };
        default:
            return state
    }
}