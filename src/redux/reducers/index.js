import { combineReducers } from 'redux'
import authReducer from './auth'
import userReducer from './user'
import restaurantReducer from './restaurant'
import itemReducer from './item'

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  restaurant: restaurantReducer,
  item: itemReducer
})