import {NetInfo, AppState} from 'react-native'
import * as Navigation from './navigation'
import {Endpoint} from '../../pjsip'
import _ from 'lodash'

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
            ...configuration,
            transport: "TCP"
        });

        // -----
        subscribe(account, dispatch);

        dispatch({type: ACCOUNT_CREATED, account});
        dispatch(Navigation.goTo({name: 'home'}));
    };
}

export function deleteAccount(account) {
    return async function(dispatch, getState) {
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

const initialState = {
    isLoading: true,
    map: {}
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case ACCOUNTS_INIT:
            let map = action.accounts.reduce(
                (result, account) => {result[account.getId()] = account; return result;},
                {}
            );

            return {
                ...state,
                isLoading: false,
                map: map
            };

        case ACCOUNT_CREATED:
        case ACCOUNT_CHANGED:
        case ACCOUNT_REGISTRATION_CHANGED:
            if (action.type == ACCOUNT_REGISTRATION_CHANGED) {
                console.log("fasdfasdfasdfasdf", action.account);
            }

            return {
                ...state,
                map: {
                    ...state.map,
                    [action.account.getId()]: action.account
                }
            };

        case ACCOUNT_DELETED:
            return {
                ...state,
                map: _.omit(state.map, action.account.getId())
            };

        default:
            return state
    }
}
