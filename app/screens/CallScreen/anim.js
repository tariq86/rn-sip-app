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
    buttonsHeight: 64
  }
}

export function calculateDimensionsForIncomingCall({screenHeight, infoHeight, stateHeight, actionsHeight, avatarHeight, buttonsHeight, totalCalls}) {
  const switchHeight = calculateCallSwitchHeight(totalCalls)
  const switchOffset = switchHeight > 0 ? 10 : 0
  const totals = switchOffset + switchHeight + infoHeight + stateHeight + actionsHeight + buttonsHeight
  const spaces = screenHeight - totals
  const space = spaces / 5

  const infoOffset = switchHeight + switchOffset + space
  const avatarOffset = infoOffset + infoHeight + space
  const stateOffset = avatarOffset + avatarHeight + space
  let buttonsOffset = stateOffset + stateHeight + space
  const buttonsFixedOffset = screenHeight - buttonsHeight - 56

  if (buttonsOffset < buttonsFixedOffset) {
    buttonsOffset = buttonsFixedOffset
  }

  const actionsOffset = stateOffset + stateHeight + space

  return {
    infoOffset: infoOffset,
    avatarOpacity: 1,
    avatarOffset: avatarOffset,
    stateOffset: stateOffset,
    actionsOpacity: 0,
    actionsOffset: actionsOffset,
    buttonsOffset: buttonsOffset
  }
}

function calculateCallSwitchHeight(totalCalls) {
  let height = (totalCalls - 1) * 42

  if (totalCalls > 2) {
    height = height + (totalCalls - 2) * 10
  }

  return height > 0 ? height + 10 : 0
}

export function calculateDimensionsForActiveCall({screenHeight, infoHeight, stateHeight, actionsHeight, buttonsHeight, totalCalls}) {
  const switchHeight = calculateCallSwitchHeight(totalCalls)
  const totals = switchHeight + infoHeight + stateHeight + actionsHeight + buttonsHeight
  const spaces = screenHeight - totals
  const space = spaces / 5

  const infoOffset = switchHeight + space
  const stateOffset = infoOffset + infoHeight + space
  const actionsOffset = stateOffset + stateHeight + space
  const buttonsOffset = actionsOffset + actionsHeight + space

  const avatarOffset = infoOffset + infoHeight + space

  return {
    infoOffset: infoOffset,
    avatarOpacity: 0,
    avatarOffset: avatarOffset,
    stateOffset: stateOffset,
    actionsOpacity: 1,
    actionsOffset: actionsOffset,
    buttonsOffset: buttonsOffset
  }
}

export function calculateDimensionsForTerminatedCall({screenHeight, infoHeight, stateHeight, buttonsHeight, totalCalls}) {
  const switchHeight = calculateCallSwitchHeight(totalCalls)
  const totals = switchHeight + infoHeight + stateHeight + buttonsHeight
  const spaces = screenHeight - totals
  const space = spaces / 4

  const infoOffset = switchHeight + space
  const stateOffset = infoOffset + infoHeight + space
  const buttonsOffset = stateOffset + stateHeight + space

  const avatarOffset = infoOffset + infoHeight + space
  const actionsOffset = stateOffset + stateHeight + space

  return {
    infoOffset: infoOffset,
    avatarOpacity: 0,
    avatarOffset: avatarOffset,
    stateOffset: stateOffset,
    actionsOpacity: 0,
    actionsOffset: actionsOffset,
    buttonsOffset: buttonsOffset
  }
}

export function calculateDimensionsForCall(props, call) {
  switch (call.getState()) {
    case 'PJSIP_INV_STATE_NULL':
    case 'PJSIP_INV_STATE_CALLING':
    case 'PJSIP_INV_STATE_EARLY':
    case 'PJSIP_INV_STATE_CONNECTING':
    case 'PJSIP_INV_STATE_CONFIRMED':
      return calculateDimensionsForActiveCall(props)
    case 'PJSIP_INV_STATE_INCOMING':
      return calculateDimensionsForIncomingCall(props)
    case 'PJSIP_INV_STATE_DISCONNECTED':
      return calculateDimensionsForTerminatedCall(props)
  }
}

export function calculateInitialDimensions(props, call) {
  const dim = calculateDimensionsForCall(props, call)

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
  const dim = calculateDimensionsForCall(props, call)
  const anim = Animated.parallel([
    Animated.timing(props.infoOffset, {toValue: dim.infoOffset}),
    Animated.timing(props.stateOffset, {toValue: dim.stateOffset}),

    Animated.timing(props.avatarOffset, {toValue: dim.avatarOffset}),
    Animated.timing(props.avatarOpacity, {toValue: dim.avatarOpacity}),

    Animated.timing(props.actionsOffset, {toValue: dim.actionsOffset}),
    Animated.timing(props.actionsOpacity, {toValue: dim.actionsOpacity}),

    Animated.timing(props.buttonsOffset, {toValue: dim.buttonsOffset})
  ])
  anim.start(callback)
}
