import { GET_OWNED_RESTAURANT } from '../actions/types'

const initialState = {
  ownedRestaurants: []
}

export default function userReducer(state=initialState, action) {
  switch (action.type) {
    case GET_OWNED_RESTAURANT: return {
      ...state,
      ownedRestaurants: action.payload
    }

    default: return state
  }
}