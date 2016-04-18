'use strict';

import React, {
    DeviceEventEmitter,
    NativeModules,
    AppState,
} from 'react-native'
import {EventEmitter} from 'events'


export default class Call extends EventEmitter {
    _id;
    _callId;
    _localContact;
    _localUri;
    _remoteContact;
    _remoteUri;
    _state;
    _stateText;

    _connectDuration;
    _totalDuration;

    _remoteOfferer;
    _remoteAudioCount;
    _remoteVideoCount;
    _audioCount;
    _videoCount;

    _updateTime;

    _account;

    constructor(account, data) {
        super();

        console.log("Create call", data);

        this._account = account;
        this._update(data);

        DeviceEventEmitter.addListener('pjSipCallChanged', this._onChanged.bind(this));
        DeviceEventEmitter.addListener('pjSipCallTerminated', this._onTerminated.bind(this));
    }

    getId() {
        return this._id;
    }

    getCallId() {
        return this._callId;
    }

    /**
     * Returns a duration of call in seconds.
     *
     * @public
     * @returns {int}
     */
    getDuration() {
        var time = Math.round(new Date().getTime() / 1000);
        var offset = time - this._updateTime;

        console.log("getDuration", this._totalDuration, offset);

        return this._totalDuration + offset;
    };

    /**
     * Returns a duration in "MM:SS" format.
     *
     * @public
     * @returns {string}
     */
    getFormattedDuration() {
        var seconds = this.getDuration();
        if (isNaN(seconds)) {
            return "00:00";
        }
        var hours = parseInt( seconds / 3600 ) % 24;
        var minutes = parseInt( seconds / 60 ) % 60;
        var result = "";
        seconds = seconds % 60;

        if (hours > 0) {
            result += (hours < 10 ? "0" + hours : hours) + ":";
        }

        result += (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
        return result;
    };

    getAccount() {
        return this._account;
    }

    answer() {
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.answerCall(this._id, (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    hangup() {
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.hangupCall(this._id, (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    hold() {
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.holdCall(this._id, (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    unhold() {
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.unholdCall(this._id, (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    xfer(destination) {
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.xferCall(this._id, destination, (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    dtmf(digits) {
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.dtmfCall(this._id, digits, (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }

    /**
     * Silently updates call with actual data from PjSip service.
     *
     * @private
     */
    _update({id, callId, localContact, localUri, remoteContact, remoteUri,
            state, stateText, connectDuration, totalDuration,
            remoteOfferer, remoteAudioCount, remoteVideoCount, audioCount, videoCount}) {
        this._updateTime = Math.round(new Date().getTime() / 1000);

        this._id = id;
        this._callId = callId;
        this._localContact = localContact;
        this._localUri = localUri;
        this._remoteContact = remoteContact;
        this._remoteUri= remoteUri;
        this._state = state;
        this._stateText = stateText;
        this._connectDuration = connectDuration;
        this._totalDuration = totalDuration;
        this._remoteOfferer = remoteOfferer;
        this._remoteAudioCount = remoteAudioCount;
        this._remoteVideoCount = remoteVideoCount;
        this._audioCount = audioCount;
        this._videoCount = videoCount;
    }

    /**
     * @fires Call#changed
     * @private
     * @param data {Object}
     */
    _onChanged(data) {
        // Ignore events from different call
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
        this.emit("changed", this);
    }

    /**
     * @fires Call#terminated
     * @private
     * @param data {Object}
     */
    _onTerminated(data) {
        // Ignore events from different call
        if (data['id'] !== this._id) {
            return;
        }

        this._update(data);

        /**
         * Fires when call no longer available.
         *
         * @event Account#terminated
         * @property {Call} call - Call instance.
         */
        this.emit("terminated", this);
    }


    toJson() {
        return {
            id: this._id,
            callId: this._callId,
            localContact: this._localContact,
            localUri: this._localUri,
            remoteContact: this._remoteContact,
            remoteUri: this._remoteUri,
            state: this._state,
            stateText: this._stateText,

            connectDuration: this._connectDuration,
            totalDuration: this._totalDuration,

            remoteOfferer: this._remoteOfferer,
            remoteAudioCount: this._remoteAudioCount,
            remoteVideoCount: this._remoteVideoCount,
            audioCount: this._audioCount,
            videoCount: this._videoCount
        }
    }



    // getInfo
    // ... getId
    // ... getAccId
    // ... getLocalUri
    // ... getLocalContact
    // ... getRemoteUri
    // ... getRemoteContact
    // ... getCallIdString
    // ... getSetting
    // ... ... getAudioCount
    // ... ... getVideoCount
    // ... getState
    // ... getStateText
    // ... getLastStatusCode
    // ... getLastReason
    // ... getMedia
    // ... ... getIndex
    // ... ... getType
    // ... ... getDir
    // ... ... getStatus
    // ... ... getAudioConfSlot
    // ... ... getVideoIncomingWindowId
    // ... ... getVideoCapDev
    // ... getProvMedia
    // ... ... getIndex
    // ... ... getType
    // ... ... getDir
    // ... ... getStatus
    // ... ... getAudioConfSlot
    // ... ... getVideoIncomingWindowId
    // ... ... getVideoCapDev
    // ... getConnectDuration
    // ... getTotalDuration
    // ... getRemOfferer
    // ... getRemAudioCount
    // ... getRemVideoCount

    // getMedia

    // getMedTransportInfo


    // --------------------
    // Could be set to: retrieveStreamsStats()
    // --------------------

    // getStreamInfo (med_idx)
    // ... getType
    // ... getProto
    // ... getDir
    // ... getRemoteRtpAddress
    // ... getRemoteRtcpAddress
    // ... getTxPt
    // ... getRxPt
    // ... getCodecName
    // ... getCodecClockRate
    // getStreamStat (med_idx)
    // ... getRtcp
    // ... getJbuf


    // public void answer(CallOpParam prm) throws java.lang.Exception {
    // public void hangup(CallOpParam prm) throws java.lang.Exception {
    // public void hold(CallOpParam prm) throws java.lang.Exception {
    // public void unhold(CallOpParam prm) throws java.lang.Exception {

    // public void mute(CallOpParam prm) throws java.lang.Exception {
    // public void unmute(CallOpParam prm) throws java.lang.Exception {

    // public void reinvite(CallOpParam prm) throws java.lang.Exception {
    // public void update(CallOpParam prm) throws java.lang.Exception {

    // public void xfer(String dest, CallOpParam prm) throws java.lang.Exception {
    // public void dtmf(String digits) throws java.lang.Exception {

    // public void dump(String digits) throws java.lang.Exception {


}