import React from 'react'
import { Link } from 'react-router-dom'
import RestaurantImage from '../assets/images/restaurant-image.jpg'

function RestaurantCard(props) {
  return (
    <div class="card h-100">
      <img class="card-img-top img-fluid" src={ props.item.logo ? process.env.REACT_APP_BASE_URL+ '/' + props.item.logo : RestaurantImage} alt="img" />
      <div class="card-body">
        <h4 class="card-title">{props.item.name}</h4>
        <p class="card-text">{props.item.description}</p>
      </div>
      <div class="card-footer text-center bg-white">
        <Link class="btn btn-outline-secondary" to={ `/restaurants/${props.item.id}` }>View Details</Link>
      </div>
    </div>
  )
}

export default RestaurantCard