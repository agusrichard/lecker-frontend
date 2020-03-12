import React from 'react'
import '../assets/styles/itemcard.css'
import Image from '../assets/images/login-image.jpg'

function ItemCard(props) {
  return (
    <div class="single_menu_list">
      <img src={ props.item.images ? process.env.REACT_APP_BASE_URL+ '/' + props.item.images : Image} 
            alt="" height="150" width="150"/>
      <div class="menu_content">
        <h4>{props.item.name}  <span>Rp. {props.item.price}</span></h4>
        <p>{props.item.description}</p>
      </div>
    </div>
  )
}

export default ItemCard