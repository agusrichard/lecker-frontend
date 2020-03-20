import { GET_ALL_RESTAURANTS } from '../actions/types'

const initialState = {
  allRestaurants: []
}

export default function restaurantReducer(state=initialState, action) {
  switch (action.type) {
    case GET_ALL_RESTAURANTS: return {
      ...state,
      allRestaurants: action.payload
    }

    default: return state
  }
}