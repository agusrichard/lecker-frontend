import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
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
              <h1 className="text-center main-text">You can find any kind of restaurant you've ever wondered in here...</h1>
            </Slide>
          </div>
        </section>
        <div className="create-restaurant-banner">
          <div className="row d-flex justify-content-center">
            <Zoom>
              <div className="col-md-6">
                <h3 className="banner-text text-center">Want your own restaurant?</h3>
                <button className="custom-btn mx-auto">Here</button>
              </div>
            </Zoom>
          </div>
        </div>
        <div className="banner">
          <div className="row h-100 justify-content-center align-items-center">
            <Zoom>
              <div className="col-md-6">
                <h3 className="banner-text pretty-text text-center">Live to fullest</h3>
              </div>
            </Zoom>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
