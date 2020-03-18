import { USER_LOGIN } from '../actions/types'

const initialState = {
  userData: [],
  isLoggedIn: false
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case USER_LOGIN: return {
      ...state,
      userData: action.payload,
      isLoggedIn: !state.isLoggedIn
    }
    default: return state
  }
}