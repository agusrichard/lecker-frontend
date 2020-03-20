import React from 'react'
import { Link } from 'react-router-dom'
import ItemImage from '../../assets/images/home-background.jpg'
import '../../assets/styles/item.css'

export default function ItemCard(props) {
  return (
		<Link style={{ textDecoration: 'none' }} to={`/menus/${props.item.id}`}>
			<div className="row item-card py-3 px-2">
        <div className="col-md-4 img-card-container">
          <img src={ props.item.images ? process.env.REACT_APP_BASE_URL + '/' + props.item.images : ItemImage } className="item-card-img" />
        </div>
        <div className="col-md-8">
					<div className="d-flex justify-content-between item-head">
						<h3 className="item-name-text">{props.item.name}</h3>
						<p className="price-text ml-auto">Rp. {props.item.price}</p>
					</div>
          <p className="mt-3">{props.item.description}</p>
        </div>
      </div>
		</Link>
	)
}