import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Slide from 'react-reveal/Slide'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
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
              <h1 className="text-center main-text">You can find any kind of restaurant you've ever wondered here...</h1>
            </Slide>
          </div>
        </section>
        <div className="create-restaurant-banner">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <h3 className="create-restaurant-banner-text text-center">Want your own restaurant?</h3>
              <button className="custom-btn mx-auto">Here</button>
            </div>
          </div>
          <div className="mt-5 mb-5"></div>
        </div>
        <Footer />
      </div>
    )
  }
}
