import {
  FIND_NAME_START,
  FIND_NAME_SUCCESS,
  FIND_NAME_NOTFOUND,
  FIND_NAME_CLEAR,
} from './actions'

const INITIAL_STATE = {
  searching: false,
  showNotFound: false,
  searchResult: {},
}

function monuments(state = INITIAL_STATE, action) {
  switch (action.type) {
      case FIND_NAME_START:
          return {
              ...state,
              searching: true,
              searchResult: {},
              showNotFound: false,
          }
      case FIND_NAME_NOTFOUND:
          return {
              ...state,
              searching: false,
              searchResult: {},
              showNotFound: true,
          }
      case FIND_NAME_SUCCESS:
          return {
              ...state,
              searchResult: action.data,
              searching: false,
              showNotFound: false,
          }
      case FIND_NAME_CLEAR:
          return {
              ...INITIAL_STATE,
          }
      default:
          return state
  }
}

export default monuments
