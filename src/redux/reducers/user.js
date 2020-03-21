import { GET_OWNED_RESTAURANT, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from '../actions/types'

const initialState = {
  itemsInCart: [],
  ownedRestaurants: []
}

export default function userReducer(state=initialState, action) {
  console.log('userReducer')
  console.log(state.itemsInCart)
  switch (action.type) {
    case GET_OWNED_RESTAURANT: return {
      ...state,
      ownedRestaurants: action.payload
    }

    case ADD_ITEM_TO_CART: return {
      ...state,
      itemsInCart: state.itemsInCart !== undefined ? [...state.itemsInCart, action.payload] : [action.payload]
    }

    case REMOVE_ITEM_FROM_CART: return {
      ...state,
      itemsInCart: state.itemsInCart !== undefined ? state.itemsInCart.filter(element => element.itemId !== action.payload) : []
    }

    default: return state
  }
}