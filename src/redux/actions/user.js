import axios from 'axios'

import { GET_OWNED_RESTAURANT } from './types'

export const getOwnedRestaurant = loginToken => dispatch => {
  console.log('getOwnedRestaurant')
  const config = { headers: { Authorization: `Bearer ${loginToken}` } }
  axios.get(process.env.REACT_APP_BASE_URL + '/restaurants/owned', config)
    .then(res => {
      console.log(res)
      dispatch({
        type: GET_OWNED_RESTAURANT,
        payload: res.data.data.restaurants
      })
    })
    .catch(err => console.log(err))
}

