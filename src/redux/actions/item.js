import axios from 'axios'

import { GET_ALL_ITEMS } from './types'

export const getAllItems = () => dispatch => {
    console.log('getAllItems')
    axios.get(process.env.REACT_APP_BASE_URL + '/items')
      .then(res => {
        console.log(res)
        dispatch({
          type: GET_ALL_ITEMS,
          payload: res.data.data
        })
      })
      .catch(err => console.log(err))
  }