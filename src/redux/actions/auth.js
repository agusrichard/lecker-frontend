import axios from 'axios'

import { 
  CHECK_LOGIN_TOKEN,
  USER_LOGIN,
  USER_LOGOUT
} from './types'


export const checkLoginToken = loginToken => dispatch => {
  console.log(loginToken)
  axios.post(process.env.REACT_APP_BASE_URL + '/auth/check-token', { loginToken })
    .then(res => {
      dispatch({
        type: CHECK_LOGIN_TOKEN
      })
    })
    .catch(err => console.log(err))
}

export const userLogin = userData => dispatch => {
  console.log(userData)
  axios.post(process.env.REACT_APP_BASE_URL + '/auth/login', userData)
    .then(res => {
      const loginToken = res.data.data.token
      const config = { headers: { Authorization: `Bearer ${loginToken}` } };
      axios.get(process.env.REACT_APP_BASE_URL + '/users/profile', config)
        .then(res => {
          console.log(res)
          dispatch({
            type: USER_LOGIN,
            payload: { loginToken: loginToken, userData: res.data.data.user }
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