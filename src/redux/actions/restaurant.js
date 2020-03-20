import axios from 'axios'

import { GET_ALL_RESTAURANTS } from './types'

export const getAllRestaurants = () => dispatch => {
    console.log('getAllRestaurants')
    axios.get(process.env.REACT_APP_BASE_URL + '/restaurants')
      .then(res => {
        console.log(res)
        dispatch({
          type: GET_ALL_RESTAURANTS,
          payload: res.data.data
        })
      })
      .catch(err => console.log(err))
  }