import {
  HIDE_NAVIGATION,
  CLOSE_MOBILE_NAVIGATION,
  TOGGLE_MOBILE_NAVIGATION,
  TOGGLE_MOBILE_NAVIGATION_ACCOUNT,
} from './actions'

const INITIAL_STATE = {
  show: true,
  mobileOpen: false,
  mobileAccountOpen: false,
}

function menu(state = INITIAL_STATE, action) {
  switch (action.type) {
      case HIDE_NAVIGATION: {
          return {
              ...state,
              show: !action.payload,
          }
      }

      case CLOSE_MOBILE_NAVIGATION: {
          return {
              ...state,
              mobileOpen: false,
              mobileAccountOpen: false,
          }
      }

      case TOGGLE_MOBILE_NAVIGATION: {
          return {
              ...state,
              mobileOpen: !state.mobileOpen,
              mobileAccountOpen: false,
          }
      }

      case TOGGLE_MOBILE_NAVIGATION_ACCOUNT: {
          return {
              ...state,
              mobileOpen: false,
              mobileAccountOpen: !state.mobileAccountOpen,
          }
      }

      default:
          return state
  }
}

export default menu
