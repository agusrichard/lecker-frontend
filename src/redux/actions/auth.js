import axios from 'axios'

import { 
  CHECK_LOGIN_TOKEN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from './types'


export const checkLoginToken = loginToken => dispatch => {
  axios.post(process.env.REACT_APP_BASE_URL + '/auth/check-token', { loginToken })
    .then(res => {
      dispatch({
        type: CHECK_LOGIN_TOKEN
      })
    })
    .catch(err => console.log(err))
}

export const userLogin = userData => dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST })
  axios.post(process.env.REACT_APP_BASE_URL + '/auth/login', userData)
   .then(res => {
     dispatch({
       type: USER_LOGIN_SUCCESS,
       payload: res.data.data.token
     })
   })
    .catch(err => console.log(err))
}

export const userLogout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT
  })
}