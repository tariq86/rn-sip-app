import {Platform, BackAndroid} from 'react-native'
import React, { Component } from 'react';
import {Provider} from 'react-redux'
import configureStore from './configureStore'

import MainScreen from './screens/MainScreen'

const store = configureStore();

// ========================================
// Bootstrap
// ========================================

import * as App from './modules/app'
import * as Navigation from './modules/navigation'

store.dispatch(async (dispatch, getState) => {
    await dispatch(App.init());

    // Render
    let route = {name: 'settings'};
    let {calls, accounts} = getState().pjsip;

    for (let id in accounts) {
        if (accounts.hasOwnProperty(id)) {
            route = {name: 'conversations'};
            break;
        }
    }

    for (let id in calls) {
        if (calls.hasOwnProperty(id)) {
            let call = calls[id];
            if (call.getState() == "PJSIP_INV_STATE_INCOMING") {
                route = {name: 'call', call};
                break;
            }
        }
    }

    dispatch(Navigation.goAndReplace(route));

    // Hooks
    if (Platform.OS === 'android') {
        BackAndroid.addEventListener('hardwareBackPress', function() {
            let prev = getState().navigation.previous.name;

            if (prev) {
                dispatch(Navigation.goBack());
                return true;
            }

            return false;
        });
    }
});

// ========================================
// Render
// ========================================

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainScreen />
            </Provider>
        )
    }
}

export default Root
