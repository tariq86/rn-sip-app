'use strict';

import React, {
    DeviceEventEmitter,
    NativeModules,
} from 'react-native';
import Call from './Call'
import Account from './Account'

export default class Endpoint {
    id;

    constructor() {
        // TODO: Maybe put here initialization ?
    }

    /**
     * @returns {Promise}
     */
    static start() {
        return new Promise(function(resolve, reject) {
            NativeModules.PjSipModule.start((successful, data) => {
                if (successful) {
                    let accounts = [];
                    let calls = []; // TODO: Calls

                    if (data.hasOwnProperty('accounts')) {
                        for (let d of data['accounts']) {
                            accounts.push(new Account(d));
                        }
                    }
                    if (data.hasOwnProperty('calls')) {
                        for (let d of data['calls']) {
                            for (let account of accounts) {
                                if (account.getId() == d['accountId']) {
                                    calls.push(new Call(account, d));
                                    break;
                                }
                            }
                        }
                    }

                    resolve({
                        accounts,
                        calls
                    });
                } else {
                    reject(data);
                }
            });
        });
    }

    /**
     * @param {AccountConfig|Object} configuration
     * @returns {Promise}
     */
    static createAccount(configuration) {
        return new Promise(function(resolve, reject) {
            NativeModules.PjSipModule.createAccount(configuration, (successful, data) => {
                if (successful) {
                    resolve(new Account(data));
                } else {
                    reject(data);
                }
            });
        });
    }

    /**
     * @param {Account} account
     * @returns {Promise}
     */
    static deleteAccount(account) {
        return new Promise(function(resolve, reject) {
            NativeModules.PjSipModule.deleteAccount(account.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    static changeCodecs() {
        throw new Error("Not implemeneted");
    }

    // setUaConfig(UaConfig value)
    // setMaxCalls
    // setUserAgent
    // setNatTypeInSdp

    // setLogConfig(LogConfig value)
    // setLevel

    //
}