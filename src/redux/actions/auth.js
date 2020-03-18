import axios from 'axios'

import { 
  CHECK_LOGIN_TOKEN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  GET_USER_PROFILE
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
      const loginToken = res.data.data.token
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: loginToken
      })
      const config = { headers: { Authorization: `Bearer ${loginToken}` } }
      axios.get(process.env.REACT_APP_BASE_URL + '/users/profile', config)
        .then(res => {
          dispatch({
            type: GET_USER_PROFILE,
            payload: res.data.data.user
          })
        })
   })
    .catch(err => console.log(err))
}

export const userLogout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT
  })
}

export const getUserProfile = loginToken => dispatch => {
  console.log('getUserProfile')
  const config = { headers: { Authorization: `Bearer ${loginToken}` } }
  axios.get(process.env.REACT_APP_BASE_URL + '/users/profile', config)
    .then(res => {
      console.log(res)
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data.data.user
      })
    })
}