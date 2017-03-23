import {Platform, PushNotificationIOS, AppState} from 'react-native'
import {Endpoint} from 'react-native-pjsip'
import RNCallKit from 'react-native-callkit';
import VoipPushNotification from 'react-native-voip-push-notification';
import uuid from 'uuid';

export const INIT = 'pjsip/INIT';
export const INIT_PN = 'pjsip/INIT_PN';
export const CHANGED_SETTINGS = 'pjsip/CHANGED_SETTINGS';
export const CHANGED_CONNECTIVITY = 'pjsip/CHANGED_CONNECTIVITY';
export const CHANGED_APP_STATE = 'pjsip/CHANGED_APP_STATE';

export const CALL_INITIATED = 'pjsip/CALL_INITIATED';
export const CALL_RECEIVED = 'pjsip/CALL_RECEIVED';
export const CALL_CHANGED = 'pjsip/CALL_CHANGED';
export const CALL_TERMINATED = 'pjsip/CALL_TERMINATED';
export const CALL_SCREEN_LOCKED = 'pjsip/CALL_SCREEN_LOCKED';

export const ACCOUNT_CREATED = 'pjsip/ACCOUNT_CREATED';
export const ACCOUNT_CHANGED = 'pjsip/ACCOUNT_CHANGED';
export const ACCOUNT_REGISTRATION_CHANGED = 'pjsip/ACCOUNT_REGISTRATION_CHANGED';
export const ACCOUNT_DELETED = 'pjsip/ACCOUNT_DELETED';

import * as Navigation from './navigation'

/**
 * Initialize PjSIP functionality.
 */
export function init() {
    return async function(dispatch, getState) {
        // Retrieving PjSip service state
        // It is possible that Endpoint instance already have registered accounts and active calls.
        // (because Javascript state is not persistent when User close application, e.g. application goes to background state)

        let endpoint = new Endpoint();
        let state = await endpoint.start();
        let {accounts, calls, settings : endpointSettings, connectivity} = state;

        // Subscribe to endpoint events
        endpoint.on("registration_changed", (account) => {dispatch(onAccountChanged(account))});
        endpoint.on("connectivity_changed", (available) => {dispatch(onConnectivityChanged(available))});
        endpoint.on("call_received", (call) => {dispatch(onCallReceived(call))});
        endpoint.on("call_changed", (call) => {dispatch(onCallChanged(call))});
        endpoint.on("call_terminated", (call) => {dispatch(onCallTerminated(call))});
        endpoint.on("call_screen_locked", (call) => {dispatch(onCallScreenLocked(call))});

        let accountMap = accounts.reduce((acc, cur) => { acc[cur.getId()] = cur; return acc; }, {});
        let callsMap = calls.reduce((acc, cur) => { acc[cur.getId()] = cur; return acc; }, {});

        dispatch({type: INIT, payload: {endpoint, endpointSettings, connectivity, accounts: accountMap, calls: callsMap}});

        if (Platform.OS === 'ios') {
            // PushNotifications
            dispatch(initPushNotifications());

            // CallKit
            dispatch(initCallKitIntegration());

            // Register / unregister when app in background or foreground
            AppState.addEventListener('change', (nextAppState) => {
                if (nextAppState == 'background' || nextAppState == 'active') {
                    let accounts = getState().pjsip.accounts;
                    for (let id in accounts) {
                        if (accounts.hasOwnProperty(id)) {
                            endpoint.registerAccount(accounts[id], nextAppState == 'active');
                        }
                    }

                    dispatch({type: CHANGED_APP_STATE, payload: {appState: nextAppState}});
                }
            });
        }
    }
}

/**
 * TODO: Description
 * @returns {Function}
 */
function initPushNotifications() {
    return async function(dispatch, getState) {

        console.log("initPushNotifications", 1);

        /**
         * Fires when received VoIP PushNotification.
         * We should re-register active accounts if application in background.
         */
        VoipPushNotification.addEventListener('notification', (notification) => {

            // -----
            let {endpoint, accounts} = getState().pjsip;
            for (let id in accounts) {
                if (accounts.hasOwnProperty(id)) {
                    endpoint.registerAccount(accounts[id], true);
                }
            }
            // -----
        });

        // -----
        let voipReject = null;
        let voipToken = new Promise((resolve, reject) => {
            voipReject = reject;
            VoipPushNotification.addEventListener('register', (token) => {
                resolve(token);
            });

            VoipPushNotification.requestPermissions();
        });
        let imToken = new Promise((resolve, reject) => {
            PushNotificationIOS.addEventListener('register', (token) => {
                resolve(token);
            });
            PushNotificationIOS.addEventListener('registrationError', (error) => {
                reject(error);
                voipReject(error);
            });

            PushNotificationIOS.requestPermissions();
        });

        let tokens = {voip: null, im: null};

        try {
            tokens['voip'] = await voipToken;
        } catch (e) {
            console.log("Failed to obtain VoIP token", e);
        }

        try {
            tokens['im'] = await imToken;
        } catch (e) {
            console.log("Failed to obtain IM token", e);
        }

        dispatch({type: INIT_PN, payload: {tokens}});

        return tokens;
    }
}

/**
 * CallKit doesn't support multiple calls (as far as I know),
 * That why activeCall reference exists (apply all actions to it).
 *
 * @returns {Function}
 */
function initCallKitIntegration() {
    return async function(dispatch, getState) {
        let activeCall = null;
        let incomingCall = null;
        let uuids = {};

        RNCallKit.setup({appName: 'React Native PjSip'});

        let {endpoint} = getState().pjsip;

        endpoint.on("call_received", (call) => {
            if (incomingCall != null) {
                dispatch(declineCall(call)); // Decline call when more that one calls are ringing
            }

            incomingCall = call.getId();

            if (!uuids.hasOwnProperty(call.getCallId())) {
                uuids[call.getCallId()] = uuid.v1();
            }

            RNCallKit.displayIncomingCall(uuids[call.getCallId()], call.getRemoteFormattedNumber());
        });
        endpoint.on("call_changed", (call) => {
            if (call.getId() === incomingCall && call.getState() != 'PJSIP_INV_STATE_INCOMING') {
                incomingCall = null;
            } else if (activeCall === null) {
                activeCall = call.getId();


                if (!uuids.hasOwnProperty(call.getCallId())) {
                    uuids[call.getCallId()] = uuid.v1();
                }

                RNCallKit.startCall(uuids[call.getCallId()], call.getRemoteFormattedNumber());
            }
        });
        endpoint.on("call_terminated", (call) => {
            let {appState} = getState().pjsip;

            // Send unregistry when application was in background
            if (appState == 'background' && activeCall == call.getCallId()) {
                let {endpoint, accounts} = getState().pjsip;
                for (let id in accounts) {
                    if (accounts.hasOwnProperty(id)) {
                        endpoint.registerAccount(accounts[id], false);
                    }
                }
            }

            if (activeCall == call.getId()) {
                activeCall = null;
            }
            if (incomingCall == call.getId()) {
                incomingCall = null;
            }


            if (!uuids.hasOwnProperty(call.getCallId())) {
                uuids[call.getCallId()] = uuid.v1();
            }

            RNCallKit.endCall(uuids[call.getCallId()]);

            delete uuids[call.getCallId()];
        });


        // -------------------------
        // -------------------------
        // -------------------------

        // TODO: Other actions like DTMF

        RNCallKit.addEventListener('answerCall', () => {
            console.log("JS RNCallKit", "answerCall", incomingCall);

            let {calls} = getState().pjsip;
            let call = null;

            if (incomingCall !== null) {
                call = calls[incomingCall];
            }

            if (call) {
                dispatch(answerCall(call));
            }
        });

        RNCallKit.addEventListener('endCall', () => {
            console.log("JS RNCallKit", "endCall", activeCall, incomingCall);

            let {calls} = getState().pjsip;
            let call = null;

            if (activeCall !== null) {
                call = calls[activeCall];
            } else if (incomingCall !== null) {
                call = calls[incomingCall];
            }

            if (!call) {
                for (let id in calls) {
                    if (calls.hasOwnProperty(id)) {
                        call = calls[id];
                        break;
                    }
                }
            }

            if (call) {
                dispatch(hangupCall(call));
            }
        });

        RNCallKit.addEventListener('didActivateAudioSession', () => {
            let {endpoint} = getState().pjsip;
            endpoint.activateAudioSession();
        });

        RNCallKit.addEventListener('didReceiveStartCallAction', () => {
            let {endpoint} = getState().pjsip;
            endpoint.deactivateAudioSession();
        });
    };
}

/**
 * Destroy current Endpoint instance
 * @returns {Function}
 */
export function destroy() {
    return async function(dispatch, getState) {
        // Remove accounts
        let {endpoint, accounts} = getState().pjsip;

        for (let id in accounts) {
            if (accounts.hasOwnProperty(id)) {
                endpoint.deleteAccount(accounts[id]);
            }
        }

        endpoint.removeAllListeners();
    }
}

// ========================================
// Actions
// ========================================

/**
 * Creates new account based on provided configuration.
 *
 * @param {Object} configuration
 * @returns {Function}
 */
export function createAccount(configuration) {
    return async function(dispatch, getState) {
        let {endpoint, tokens} = getState().pjsip;


        console.log("createAccount tokens", endpoint, tokens);

        let contactUriParams = Platform.select({
            ios: [
                ";app-id=com.carusto.mobile.app",
                (tokens['voip'] ? `;pn-voip-tok=${tokens['voip']}` : ""),
                (tokens['im'] ? `;pn-im-tok=${tokens['im']}` : "")
            ].join(""),
            android: `;im-type=sip`,
        });

        console.log("createAccount 1", configuration);
        console.log("createAccount 2", contactUriParams);

        let account = await endpoint.createAccount({
            ...configuration,
            contactUriParams
        });

        console.log("createAccount 3");

        dispatch({type: ACCOUNT_CREATED, payload: {account}});

        return account;
    };
}

/**
 * Replaces existing account with new configuration (e.g. remove and recreate account)
 *
 * @param {Account} account
 * @param {Object} configuration
 * @returns {Function}
 */
export function replaceAccount(account, configuration) {
    return async function(dispatch, getState) {
        throw new Error("Not implemented");
    };
}

/**
 * Action to delete account.
 *
 * @param {Account} account
 * @returns {Function}
 */
export function deleteAccount(account) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        await endpoint.deleteAccount(account);

        // -----
        dispatch({type: ACCOUNT_DELETED, payload: {account}});
        dispatch(Navigation.goTo({name: 'settings'})); // TODO: Remove this
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
        let {accounts} = getState().pjsip;

        // Use "default" account if none provided
        if (account == null) {
            for (let id in accounts) {
                if (accounts.hasOwnProperty(id)) {
                    account = accounts[id];
                    break;
                }
            }
        }

        if (!account) {
            dispatch(Navigation.goTo({name: 'call', call: Promise.reject("At least one account should be available to make a call.")})); // TODO: Move to another place
            return;
        }

        // -----
        let endpoint = getState().pjsip.endpoint;

        // TODO: Do not deactivateAudioSession if iOS version is not compatible with CallKit
        if (Platform.OS === 'ios') {
            endpoint.deactivateAudioSession();
        }

        let call = endpoint.makeCall(account, destination);

        // -----
        dispatch(Navigation.goTo({name: 'call', call})); // TODO: Move to another place
    };
}

export function hangupCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.hangupCall(call);
    };
}

export function declineCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.declineCall(call);
    };
}

export function answerCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.answerCall(call);
    };
}

export function muteCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.muteCall(call);
    };
}

export function unmuteCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.unMuteCall(call);
    };
}

export function holdCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.holdCall(call);
    };
}

export function unholdCall(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.unholdCall(call);
    };
}

export function useSpeaker(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.useSpeaker(call);
    };
}

export function useEarpiece(call) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.useEarpiece(call);
    };
}

export function dtmfCall(call, key) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.dtmfCall(call, key);
    };
}

export function redirectCall(call, destination) {
    return async function(dispatch, getState) {
        let {endpoint, accounts} = getState().pjsip;
        endpoint.redirectCall(accounts[call.getAccountId()], call, destination);
    };
}

export function xferCall(call, destination) {
    return async function(dispatch, getState) {
        let {endpoint, accounts} = getState().pjsip;
        endpoint.xferCall(accounts[call.getAccountId()], call, destination);
    };
}

export function xferReplacesCall(call, destinationCall) {
    return async function(dispatch, getState) {
        let endpoint = getState().pjsip.endpoint;
        endpoint.xferReplacesCall(call, destinationCall);
    };
}

export function changeNetworkSettings(configuration) {
    return async (dispatch, getState) => {
        let endpoint = getState().pjsip.endpoint;
        await endpoint.changeNetworkConfiguration(configuration);

        let serviceConfiguration = {
            ...getState().pjsip.endpointSettings.service,
            foreground: configuration.foreground
        };
        let settings = await endpoint.changeServiceConfiguration(serviceConfiguration);

        dispatch({type: CHANGED_SETTINGS, payload: settings});
        dispatch(Navigation.goAndReplace({name: 'settings'}));
    }
}

// ========================================
// Handlers
// ========================================

/**
 * Handle account change event.
 *
 * @param {Account} account
 */
export function onAccountChanged(account) {
    return {type: ACCOUNT_CHANGED, payload: {account}};
}

/**
 * Handles incoming call event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallReceived(call) {
    return async function(dispatch, getState) {
        let state = getState();
        if (state.navigation.current.name != 'call' && state.pjsip.appState == 'active') {
            dispatch(Navigation.goTo({name: 'call', call})); // TODO: Move to another place
        }

        dispatch({type: CALL_RECEIVED, call});
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
 * Handles screen lock event.
 *
 * @param bool lock
 * @returns {Function}
 */
export function onCallScreenLocked(lock) {
    return async function(dispatch, getState) {
        dispatch({type: CALL_SCREEN_LOCKED, lock});
    };
}

function onConnectivityChanged(available) {
    return async function(dispatch, getState) {
        if (available) {
            dispatch(Stomp.connect());
        } else {
            dispatch(Stomp.disconnect());
        }

        dispatch({type: CHANGED_CONNECTIVITY, payload: available});
    };
}

// ========================================
// Reducer
// ========================================

const initialState = {
    endpoint: null,
    endpointSettings: null,
    connectivity: true,
    isScreenLocked: false,

    appState: 'active', // Application state (need to know whether send UNREGISTER for CallKit incoming call)

    tokens: {
        voip: null,
        im: null
    },

    accounts: {},
    calls: {},
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                ...action.payload
            };

        case INIT_PN:
            return {
                ...state,
                ...action.payload
            };

        case CALL_INITIATED:
        case CALL_RECEIVED:
        case CALL_CHANGED:
            let call = action.call;

            return {
                ...state,
                calls: {
                    ...state.calls,
                    [call.getId()]: call
                }
            };

        case CALL_TERMINATED:
            let calls = {...state.calls};
            delete calls[action.call.getId()];

            return {
                ...state,
                calls
            };

        case CALL_SCREEN_LOCKED:
            return {
                ...state,
                isScreenLocked: action.lock
            };

        case CHANGED_SETTINGS: {
            return {
                ...state,
                endpointSettings: {
                    ...state.endpointSettings,
                    ...action.payload
                }
            }
        }

        case CHANGED_CONNECTIVITY:
            return {
                ...state,
                connectivity: action.payload
            };

        case CHANGED_APP_STATE:
            return {
                ...state,
                ...action.payload
            };

        case ACCOUNT_CREATED:
        case ACCOUNT_CHANGED:
        case ACCOUNT_REGISTRATION_CHANGED: {
            let account = action.payload.account;

            return {
                ...state,
                accounts: {
                    ...state.accounts,
                    [account.getId()]: account
                }
            };
        }
        case ACCOUNT_DELETED: {
            let account = action.payload.account;
            let accounts = {...state.accounts};

            delete accounts[account.getId()];

            return {
                ...state,
                accounts
            };
        }
        default:
            return state
    }
}
