import React from 'react'
import { Helmet } from 'react-helmet'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import ItemCard from '../../components/item/ItemCard'

import '../../assets/styles/item.css'

class Items extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Lecker - Restaurants</title>
        </Helmet>
        <CustomNavbar />
        <section className="items-page-header">
          <div className="row h-100 justify-content-md-end align-items-center">
            <Slide right>
              <h1 className="text-right main-text">You go the the right place to satify your appetite... Just try and discover</h1>
            </Slide>
          </div>
        </section>
        <p className="text-center items-list-begin-text mt-5">TRY &amp; DISCOVER</p>
        <h3 className="text-center items-list-main-text mb-2">Restaurants</h3>
        <hr className="heading-hr mb-5" />
        <div className="mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-5 list-col">
              <ItemCard />
            </div>
            <div className="col-md-5 list-col">
              <ItemCard />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Items