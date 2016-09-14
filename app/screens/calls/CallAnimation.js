import {Animated} from 'react-native'

/**
 * @param height Screen height
 */
export function calculateComponentsHeight(height) {


    return {
        infoHeight: height * 0.12,
        avatarHeight: height * 0.3,
        stateHeight: height * 0.08,
        actionsHeight: height * 0.4,
        buttonsHeight: height * 0.22
    }
}

export function calculateDimensionsForIncomingCall({screenHeight, infoHeight, stateHeight, actionsHeight, avatarHeight, buttonsHeight, totalCalls}) {
    let switchHeight = calculateCallSwitchHeight(totalCalls);
    let switchOffset = switchHeight > 0 ? 10 : 0;
    let totals = switchOffset + switchHeight + infoHeight + stateHeight + actionsHeight + buttonsHeight;
    let spaces = screenHeight - totals;
    let space = spaces / 4;

    let infoOffset = switchHeight + switchOffset + space;
    let avatarOffset = infoOffset + infoHeight + space;
    let stateOffset = avatarOffset + avatarHeight + space;

    return {
        infoOffset: infoOffset,
        avatarOpacity: 1,
        avatarOffset: avatarOffset,
        stateOffset: stateOffset,
        actionsOpacity: 0,
        actionsOffset: screenHeight
    }
}

function calculateCallSwitchHeight(totalCalls) {
    let height = (totalCalls - 1) * 52;
    return height > 0 ? height + 10 : 0;
}

export function calculateDimensionsForActiveCall({screenHeight, infoHeight, stateHeight, actionsHeight, buttonsHeight, totalCalls}) {
    let switchHeight = calculateCallSwitchHeight(totalCalls);
    let totals = switchHeight + infoHeight + stateHeight + actionsHeight + buttonsHeight;
    let spaces = screenHeight - totals;
    let space = spaces / 4;

    let infoOffset = switchHeight + space;
    let stateOffset = infoOffset + infoHeight + space;
    let actionsOffset = stateOffset + stateHeight + space;

    return {
        infoOffset: infoOffset,
        avatarOpacity: 0,
        avatarOffset: screenHeight,
        stateOffset: stateOffset,
        actionsOpacity: 1,
        actionsOffset: actionsOffset
    }
}

export function calculateDimensionsForTerminatedCall({screenHeight, infoHeight, stateHeight, buttonsHeight, totalCalls}) {
    let switchHeight = calculateCallSwitchHeight(totalCalls);
    let totals = switchHeight + infoHeight + stateHeight + buttonsHeight;
    let spaces = screenHeight - totals;
    let space = spaces / 3;

    let infoOffset = switchHeight + space;
    let stateOffset = infoOffset + infoHeight + space;

    return {
        infoOffset: infoOffset,
        avatarOpacity: 0,
        avatarOffset: screenHeight,
        stateOffset: stateOffset,
        actionsOpacity: 0,
        actionsOffset: screenHeight
    }
}

export function calculateDimensionsForCall(props, call) {
    switch (call.getState()) {
        case 'PJSIP_INV_STATE_NULL':
        case 'PJSIP_INV_STATE_CALLING':
        case 'PJSIP_INV_STATE_EARLY':
        case 'PJSIP_INV_STATE_CONNECTING':
        case 'PJSIP_INV_STATE_CONFIRMED':
            return calculateDimensionsForActiveCall(props);
        case 'PJSIP_INV_STATE_INCOMING':
            return calculateDimensionsForIncomingCall(props);
        case 'PJSIP_INV_STATE_DISCONNECTED':
            return calculateDimensionsForTerminatedCall(props);
    }
}

export function calculateInitialDimensions(props, call) {
    let dim = calculateDimensionsForCall(props, call);

    return {
        infoOffset: new Animated.Value(dim.infoOffset),
        avatarOpacity: new Animated.Value(dim.avatarOpacity),
        avatarOffset: new Animated.Value(dim.avatarOffset),
        stateOffset: new Animated.Value(dim.stateOffset),
        actionsOpacity: new Animated.Value(dim.actionsOpacity),
        actionsOffset: new Animated.Value(dim.actionsOffset),
        buttonsOpacity: new Animated.Value(dim.buttonsOpacity),
        buttonsOffset: new Animated.Value(dim.buttonsOffset)
    }
}

export function animateCallState(props, call, callback) {
    let dim = calculateDimensionsForCall(props, call);
    let anim = Animated.parallel([
        Animated.timing(props.infoOffset, {toValue: dim.infoOffset}),
        Animated.timing(props.stateOffset, {toValue: dim.stateOffset}),

        Animated.timing(props.avatarOffset, {toValue: dim.avatarOffset}),
        Animated.timing(props.avatarOpacity, {toValue: dim.avatarOpacity}),

        Animated.timing(props.actionsOffset, {toValue: dim.actionsOffset}),
        Animated.timing(props.actionsOpacity, {toValue: dim.actionsOpacity})
    ]);
    anim.start(callback);
}
