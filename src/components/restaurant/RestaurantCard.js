import React from 'react'
import { Link } from 'react-router-dom'
import RestaurantImage from '../../assets/images/restaurant/restaurant-image.jpg'
import '../../assets/styles/restaurant.css'

export default function RestaurantCard(props) {
  return (
    <Link style={{ textDecoration: 'none' }}>
      <div className="row restaurant-card py-3 px-2">
        <div className="col-md-4">
          <img src={ RestaurantImage } className="restaurant-card-img" />
        </div>
        <div className="col-md-8 p-2">
          <h3>Restaurant Name</h3>
          <p>Restaurant Description</p>
        </div>
      </div>
    </Link>
  )
}
