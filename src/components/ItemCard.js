import React, { useState } from 'react'
import '../assets/styles/itemcard.css'
// import Image from '../assets/images/login-image.jpg'
import { Button } from 'reactstrap'

function ItemCard(props) {
  return (
    <div className="single_menu_list">
      <img src={ props.item.images ? process.env.REACT_APP_BASE_URL+ '/' + props.item.images : Image} 
            alt="" height="150" width="150"/>
      <div className="menu_content">
        <h4>{props.item.name}  <span>Rp. {props.item.price}</span></h4>
        <p>{props.item.description}</p>
        { props.handleClick ? 
        <div className="d-flex">
          <Button color="success" className="ml-auto px-4 py-2" onClick={() => props.handleClick(props.item.id)}>Buy</Button>
        </div> : null }
      </div>
    </div>
  )
}

export default ItemCard