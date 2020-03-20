import { GET_ALL_ITEMS } from '../actions/types'

const initialState = {
  allItems: []
}

export default function restaurantReducer(state=initialState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS: return {
      ...state,
      allItems: action.payload
    }

    default: return state
  }
}