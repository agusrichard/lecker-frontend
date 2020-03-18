import { 
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  CHECK_LOGIN_TOKEN,
  USER_LOGOUT,
  GET_USER_PROFILE
} from '../actions/types'


const initialState = {
  userData: {},
  loginToken: '',
  isUserAuthenticated: false,
  isLoggedIn: false,
  isLoading: false
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST: return {
      ...state,
      isLoading: !state.isLoading,
      isLoggedIn: !state.isLoggedIn
    }

    case USER_LOGIN_SUCCESS: return {
      ...state,
      isLoading: !state.isLoading,
      loginToken: action.payload,
      isUserAuthenticated: !state.isUserAuthenticated
    }

    case USER_LOGOUT: 
      return {
      ...state,
      userData: {},
      loginToken: '',
      isUserAuthenticated: false,
      isLoggedIn: false
    }

    case GET_USER_PROFILE: return {
      ...state,
      userData: action.payload
    }

    case CHECK_LOGIN_TOKEN: return {
      ...state,
      isUserAuthenticated: true
    }
    default: return state
  }
}