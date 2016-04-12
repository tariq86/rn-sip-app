import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {Endpoint} from '../../pjsip'
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
 * Actions
 */

export function initAccounts(accounts) {
    return async function(dispatch, getState) {
        // -----
        accounts.forEach((account) => subscribe(account, dispatch));

        // -----
        dispatch({type: ACCOUNTS_INIT, accounts});
    };
}
export function createAccount(configuration) {
    return async function(dispatch, getState) {
        // -----
        let account = await Endpoint.createAccount({
            ...configuration // ,
            // transport: "TCP"
        });

        // -----
        subscribe(account, dispatch);

        dispatch({type: ACCOUNT_CREATED, account});
        dispatch(Navigation.goTo({name: 'home'}));
    };
}

/**
 * Action to delete account.
 *
 * @param {AccountRecord} record
 * @returns {Function}
 */
export function deleteAccount(record) {
    return async function(dispatch, getState) {
        let account = record.get('ref');

        // -----
        await Endpoint.deleteAccount(account);

        // -----
        // TODO: Unsubscribe

        dispatch({type: ACCOUNT_DELETED, account});
        dispatch(Navigation.goTo({name: 'home'}));
    };
}

function subscribe(account, dispatch) {
    account.addListener(
        "registration_changed",
        (account, registration) => {
            dispatch({type: ACCOUNT_REGISTRATION_CHANGED, account, registration})
        }
    );
}

/**
 * Reducer
 */

var AccountRecord = Record({
    id: -1,
    uri: null,
    registration: null,
    ref: null // Original link to account
});


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
                        return result.set(account.getId(), new AccountRecord({
                            ...account.toJson(),
                            ref: account
                        }));
                    },
                    state.map
                )
            };

        case ACCOUNT_CREATED:
        case ACCOUNT_CHANGED:
        case ACCOUNT_REGISTRATION_CHANGED:
            return {
                ...state,
                map: state.map.set(action.account.getId(), new AccountRecord({
                    ...action.account.toJson(),
                    ref: action.account
                }))
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
