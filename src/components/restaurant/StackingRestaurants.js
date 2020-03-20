import React from 'react'

import RestaurantCard from './RestaurantCard'

export default function StackingRestaurants(props) {
  const listOfRestaurants = props.listOfRestaurants

  let rendered = listOfRestaurants.map(restaurant => (
    <div className="col-md-5 list-col">
      <RestaurantCard restaurant={restaurant} />
    </div>
  ))

  let newRendered = []
  for (let i = 0; i < rendered.length; i+=2) {
    let inside = []
    for (let j = i; j < (i + 2); j++) {
      inside.push(rendered[j] ? rendered[j] : null)
    }
    newRendered.push(inside)
  }

  return newRendered.map(pair => (
    <div className="row d-flex justify-content-center restaurant-row">
      {pair[0]}
      {pair[1]}
    </div>
  ))
}