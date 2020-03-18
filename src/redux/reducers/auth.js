import { 
  USER_LOGIN,
  CHECK_LOGIN_TOKEN,
  USER_LOGOUT
} from '../actions/types'


const initialState = {
  userData: {},
  loginToken: '',
  isUserAuthenticated: false,
  isLoggedIn: false
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case USER_LOGIN: return {
      ...state,
      userData: action.payload.userData,
      loginToken: action.payload.loginToken,
      isUserAuthenticated: true,
      isLoggedIn: !state.isLoggedIn
    }

    case USER_LOGOUT: 
      localStorage.removeItem('persist:root');
      return {
      ...state,
      userData: [],
      isUserAuthenticated: false,
      isLoggedIn: false
    }

    case CHECK_LOGIN_TOKEN: return {
      ...state,
      isUserAuthenticated: true
    }
    default: return state
  }
}