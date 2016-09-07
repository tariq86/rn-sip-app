import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {
    OrderedMap,
    Record
} from 'immutable'


export const ACCOUNTS_INIT = 'accounts/INIT';
export const ACCOUNT_CREATED = 'accounts/ACCOUNT_CREATED';
export const ACCOUNT_CHANGED = 'accounts/ACCOUNT_CHANGED';
export const ACCOUNT_REGISTRATION_CHANGED = 'accounts/ACCOUNT_REGISTRATION_CHANGED';
export const ACCOUNT_DELETED = 'accounts/ACCOUNT_DELETED';

/**
 * Handles initialization event.
 *
 * @param {Account[]} accounts
 * @returns {Function}
 */
export function initAccounts(accounts) {
    return async function(dispatch, getState) {
        dispatch({type: ACCOUNTS_INIT, accounts});
    };
}

/**
 * Handle account change event.
 *
 * @param {Account} account
 * @returns {Function}
 */
export function changeAccount(account) {
    return async function(dispatch, getState) {
        dispatch({type: ACCOUNT_CHANGED, account});
    };
}

/**
 * Creates new account based on provided configuration.
 *
 * @param {Object} configuration
 * @returns {Function}
 */
export function createAccount(configuration) {

    console.log("createAccount", configuration);

    return async function(dispatch, getState) {
        let endpoint = getState()['app']['endpoint'];
        let account = await endpoint.createAccount({
            ...configuration
        });

        dispatch({type: ACCOUNT_CREATED, account});
        dispatch(Navigation.goTo({name: 'settings'}));
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
        let endpoint = getState()['app']['endpoint'];
        await endpoint.deleteAccount(account);

        // -----
        dispatch({type: ACCOUNT_DELETED, account});
        dispatch(Navigation.goTo({name: 'settings'}));
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
        case ACCOUNTS_INIT:
            return {
                ...state,
                isLoading: false,
                map: action.accounts.reduce(
                    (result, account) => {
                        return result.set(account.getId(), account);
                    },
                    state.map
                )
            };

        case ACCOUNT_CREATED:
        case ACCOUNT_CHANGED:
        case ACCOUNT_REGISTRATION_CHANGED:
            return {
                ...state,
                map: state.map.set(action.account.getId(), action.account)
            };

        case ACCOUNT_DELETED:
            return {
                ...state,
                map: state.map.delete(action.account.getId())
            };

        default:
            return state
    }
}
