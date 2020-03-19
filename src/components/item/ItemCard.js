import React from 'react'
import { Link } from 'react-router-dom'
import ItemImage from '../../assets/images/home-background.jpg'
import '../../assets/styles/item.css'

export default function ItemCard(props) {
  return (
		<Link style={{ textDecoration: 'none' }}>
			<div className="row item-card py-3 px-2">
        <div className="col-md-4 img-card-container">
          <img src={ ItemImage } className="item-card-img" />
        </div>
        <div className="col-md-8">
					<div className="d-flex justify-content-between item-head">
						<h3 className="item-name-text">Item Name</h3>
						<p className="price-text ml-auto">Rp. 000000</p>
					</div>
          <p className="mt-3">Restaurant Description</p>
        </div>
      </div>
		</Link>
	)
}