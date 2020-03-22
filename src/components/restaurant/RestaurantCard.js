import React from 'react'
import { Link } from 'react-router-dom'
import Zoom from 'react-reveal/Zoom'
import RestaurantImage from '../../assets/images/restaurant/restaurant-image.jpg'
import '../../assets/styles/restaurant.css'

export default function RestaurantCard(props) {
  console.log('restaurantCard')
  console.log(props.restaurant)
  return (
    <Zoom>
      <Link style={{ textDecoration: 'none' }} to={`/restaurants/${props.restaurant.id}`}>
        <div className="row restaurant-card py-3 px-2">
          <div className="col-md-4">
            <img src={ props.restaurant.logo ? process.env.REACT_APP_BASE_URL + '/' + props.restaurant.logo : RestaurantImage } className="restaurant-card-img" />
          </div>
          <div className="col-md-8 p-2">
            <h3>{props.restaurant.name}</h3>
            <p className="text-muted">{props.restaurant.location}</p>
            <p>{props.restaurant.description}</p>
          </div>
        </div>
      </Link>
    </Zoom>
  )
}
