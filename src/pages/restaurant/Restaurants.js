import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import { getAllRestaurants } from '../../redux/actions/restaurant'
import StackingRestaurants from '../../components/restaurant/StackingRestaurants'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import '../../assets/styles/restaurant.css'

class Restaurants extends Component {

  componentDidMount() {
    this.props.getAllRestaurants()
  }

  render() {
    console.log(this.props.allRestaurants)
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
        <div className="pt-5 pb-5">
          <p className="text-center restaurant-list-begin-text">TRY &amp; DISCOVER</p>
          <h3 className="text-center restaurant-list-main-text mb-2">Restaurants</h3>
          <hr className="heading-hr mb-5" />
          <StackingRestaurants listOfRestaurants={this.props.allRestaurants} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allRestaurants: state.restaurant.allRestaurants
})

const mapDispatchToProps = { getAllRestaurants }

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)