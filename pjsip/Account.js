'use strict';

import React, {
    DeviceEventEmitter,
    NativeModules,
    AppState,
} from 'react-native'
import {EventEmitter} from 'events'
import AccountRegistration from './AccountRegistration'
import Call from './Call'

/**
 * Class that represent pj_sip_account.
 *
 * Constructor data:
 *
 * Fields:
 * - getId
 * - getInfo
 * - ... public String getUri()
 * - ... public boolean getRegIsConfigured()
 * - ... public boolean getRegIsActive()
 * - ... public int getRegExpiresSec()
 * - ... public pjsip_status_code getRegStatus()
 * - ... public String getRegStatusText()
 * - ... public int getRegLastErr()
 * - ... public boolean getOnlineStatus()
 * - ... public String getOnlineStatusText()
 *
 * - getCalls
 *
 * makeCall
 *
 * modify
 * setRegistration
 * setOnlineStatus
 *
 * public void onIncomingCall(OnIncomingCallParam prm) {
 * public void onRegStarted(OnRegStartedParam prm) {
 * public void onRegState(OnRegStateParam prm) {
 * public void onIncomingSubscribe(OnIncomingSubscribeParam prm) {
 * public void onInstantMessage(OnInstantMessageParam prm) {
 * public void onInstantMessageStatus(OnInstantMessageStatusParam prm) {
 * public void onTypingIndication(OnTypingIndicationParam prm) {
 * public void onMwiInfo(OnMwiInfoParam prm) {
 *
 */
export default class Account extends EventEmitter {
    _id;
    _uri;
    _registration;

    constructor(data) {
        super();
        this._update(data);

        // Register for PjSip service events.
        DeviceEventEmitter.addListener('pjSipRegistrationChanged', this._onRegistrationChanged.bind(this));
        DeviceEventEmitter.addListener('pjSipCallReceived', this._onCallReceived.bind(this));
    }

    // TODO: Save & Get initial configuration

    getId() {
        return this._id;
    }

    getURI() {
        return this._uri;
    }

    /**
     * @returns {AccountRegistration}
     */
    getRegistration() {
        return this._registration;
    }

    /**
     * Make outgoing call to the specified URI.
     *
     * @param destination {String} Destination SIP URI.
     * @param headers {Object[]} Optional list of headers to be sent with outgoing INVITE.
     */
    makeCall(destination, headers = []) {
        let id = this._id;
        let self = this;

        return new Promise(function(resolve, reject) {
            NativeModules.PjSipModule.makeCall(id, destination, (successful, data) => {
                if (successful) {
                    resolve(new Call(self, data));
                } else {
                    reject(data);
                }
            });
        });
    }

    /**
     * Silently updates account with actual data from PjSip service.
     *
     * @param id {number}
     * @param uri {string}
     * @param registration {Object}
     * @private
     */
    _update({id, uri, registration}) {
        this._id = id;
        this._uri = uri;
        this._registration = new AccountRegistration(registration);
    }

    /**
     * @fires Account#registration_changed
     * @private
     * @param data {Object}
     */
    _onRegistrationChanged(data) {
        // Ignore events from different account
        if (data['id'] !== this._id) {
            return;
        }

        this._update(data);

        /**
         * Fires when registration status has changed.
         *
         * @event Account#registration_changed
         * @property {Account} account - Account instance.
         * @property {AccountRegistration} registration
         */
        this.emit("registration_changed", this, this._registration);
    }

    _onCallReceived(event) {
        console.log("_onCallReceived", arguments);
    }


    toJson() {
        return {
            id: this._id,
            uri: this._uri,
            registration: this._registration ? this._registration.toJson() : null
        }
    }

}