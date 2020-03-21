import axios from 'axios'

import { GET_OWNED_RESTAURANT, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from './types'

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

export const addItemToCart = (itemId, name, quantity, price, total) => dispatch => {
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: { itemId, name, quantity, price, total }
  })
}

export const removeItemFromCart = (itemId) => dispatch => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: itemId
  })
}
