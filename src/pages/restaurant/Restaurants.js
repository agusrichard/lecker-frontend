import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import RestaurantCard from '../../components/restaurant/RestaurantCard'
import '../../assets/styles/restaurant.css'

export default class Restaurants extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Lecker - Restaurants</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant">
          <div className="row h-100 justify-content-md-start align-items-center">
            <Slide left>
              <h1 className="text-center main-text">You can find any kind of restaurant you've ever wondered in here...</h1>
            </Slide>
          </div>
        </section>
        <div className="create-restaurant-banner">
          <div className="row d-flex justify-content-center">
            <Zoom>
              <div className="col-md-6">
                <h3 className="banner-text text-center">Want your own restaurant?</h3>
                <Link className="custom-btn text-center mx-auto" to="/restaurants/create-restaurant">Here</Link>
              </div>
            </Zoom>
          </div>
        </div>
        <div className="banner">
          <div className="row h-100 justify-content-center align-items-center">
            <Slide bottom>
              <div className="col-md-6">
                <h3 className="banner-text pretty-text text-center">Live to fullest</h3>
              </div>
            </Slide>
          </div>
        </div>
        <Container className="mt-5 mb-5">
          <p className="text-center restaurant-list-begin-text">TRY &amp; DISCOVER</p>
          <h3 className="text-center restaurant-list-main-text mb-2">Restaurants</h3>
          <hr className="heading-hr mb-5" />
          <div className="row d-flex justify-content-center restaurant-row">
            <div className="col-md-5 mr-5">
              <RestaurantCard />
            </div>
            <div className="col-md-5">
              <RestaurantCard />
            </div>
          </div>
          <div className="row d-flex justify-content-center restaurant-row">
            <div className="col-md-5 mr-5">
              <RestaurantCard />
            </div>
            <div className="col-md-5">
              <RestaurantCard />
            </div>
          </div>
          <div className="row d-flex justify-content-center restaurant-row">
            <div className="col-md-5 mr-5">
              <RestaurantCard />
            </div>
            <div className="col-md-5">
              <RestaurantCard />
            </div>
          </div>
          <div className="row d-flex justify-content-center restaurant-row">
            <div className="col-md-5 mr-5">
              <RestaurantCard />
            </div>
            <div className="col-md-5">
              <RestaurantCard />
            </div>
          </div>
          <div className="row d-flex justify-content-center restaurant-row">
            <div className="col-md-5 mr-5">
              <RestaurantCard />
            </div>
            <div className="col-md-5">
              <RestaurantCard />
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    )
  }
}
