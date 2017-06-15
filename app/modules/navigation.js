const REF = 'navigation/REF'

const NAVIGATE_TO = 'navigation/NAVIGATE_TO'
const NAVIGATE_BACK = 'navigation/NAVIGATE_BACK'
const NAVIGATE_REPLACE = 'navigation/NAVIGATE_REPLACE'
const NAVIGATE_RESET = 'navigation/NAVIGATE_RESET'
const NAVIGATE_RESET_WITH_STACK = 'navigation/NAVIGATE_RESET_WITH_STACK'
const OPEN_DRAWER = 'navigation/OPEN_DRAWER'
const CLOSE_DRAWER = 'navigation/CLOSE_DRAWER'

export function ref(nav) {
  return dispatch => {
    dispatch({type: REF, payload: nav})
  }
}

export function goTo(route) {
  return async (dispatch, getState) => {
    const ref = getState().navigation.ref
    if (ref) {
      ref.push(route)
    }

    dispatch({type: NAVIGATE_TO, route})
  }
}

export function goBack() {
  return (dispatch, getState) => {
    const ref = getState().navigation.ref
    if (ref) {
      ref.pop()
    }

    setTimeout(function () {
      dispatch({type: NAVIGATE_BACK})
    }, 500)
  }
}

export function goAndReplace(route) {
  return (dispatch, getState) => {
    const ref = getState().navigation.ref
    const tab = getState().navigation.current.name

    const same = ['conversations', 'dialer', 'history', 'settings'].indexOf(route.name) !== -1 &&
      ['conversations', 'dialer', 'history', 'settings'].indexOf(tab) !== -1

    if (ref && !same) {
      ref.replace(route)
    }

    dispatch({type: NAVIGATE_REPLACE, route})
  }
}

export function openDrawer() {
  return (dispatch, getState) => {
    dispatch({type: OPEN_DRAWER})
  }
}

export function closeDrawer() {
  return (dispatch, getState) => {
    dispatch({type: CLOSE_DRAWER})
  }
}

const initialState = {
  ref: null,

  init: {name: 'launch'},
  current: {},
  previous: {},
  history: [],
  drawer: false
}

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case REF:
      return {
        ...state,
        ref: action.payload
      }

    case NAVIGATE_TO:
      return {
        ...state,
        current: action.route,
        previous: state.current,
        history: state.history.concat(state.current),
        drawer: false
      }

    case NAVIGATE_BACK: {
      const {history} = state
      const newHistory = [].concat(history)
      newHistory.pop()

      return {
        ...state,
        current: state.previous,
        previous: newHistory.length > 0 ? newHistory[newHistory.length - 1] : {},
        history: newHistory,
        drawer: false
      }
    }

    case NAVIGATE_RESET:
      return {
        ...state,
        current: action.route,
        previous: {},
        history: [].concat(action.route),
        drawer: false
      }

    case NAVIGATE_REPLACE: {
      const newHistory = [].concat(state.history)
      newHistory[state.history.length - 1] = action.route
      return {
        ...state,
        current: action.route,
        history: newHistory,
        drawer: false
      }
    }

    case NAVIGATE_RESET_WITH_STACK:
      return {
        ...state,
        current: action.stack[action.stack.length - 1],
        previous: action.stack.length === 1 ? {} : action.stack[action.stack.length - 2],
        history: action.stack,
        drawer: false
      }

    case OPEN_DRAWER:
      return {
        ...state,
        drawer: "VISIBLE"
      }

    case CLOSE_DRAWER:
      return {
        ...state,
        drawer: false
      }

    default:
      return state
  }
}
