import React from 'react'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'
import { connect } from 'react-redux'
import ItemImage from '../../assets/images/home-background.jpg'
import ItemQuantityModal from './ItemQuantityModal'
import '../../assets/styles/item.css'

function ItemCard(props) {
  console.log(props.item)

  return (
    <Slide right>
        <div className="row item-card py-3 px-2">
          <div className="col-md-4 img-card-container">
            <img src={ props.item.images ? process.env.REACT_APP_BASE_URL + '/' + props.item.images : ItemImage } className="item-card-img" />
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-between item-head">
            <Link className="item-link" style={{ textDecoration: 'none' }} to={`/menus/${props.item.id}`}>
              <h3 className="item-name-text">{props.item.name}</h3>
            </Link>
              <p className="price-text ml-auto">Rp. {props.item.price}</p>
            </div>
            <p className="mt-3">{props.item.description}</p>
            { props.isLoggedIn && <ItemQuantityModal item={props.item}/> }
          </div>
        </div>
    </Slide>
	)
}

const mapStateToProps = state => ({ isLoggedIn: state.auth.isLoggedIn })

export default connect(mapStateToProps)(ItemCard)