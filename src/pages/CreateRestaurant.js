import React from 'react'
import Cookies from 'js-cookie'

import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import '../assets/styles/create-restaurant.css'

class CreateRestaurant extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  checklog = () => {
    const token = Cookies.get('token')
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  componentDidMount() {
    this.checklog()
  }

  render() {
    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } />
        <div class="signup-form">
          <CreateRestaurantForm />
        </div>
        <Footer />
      </div>
    )
  }
}


export default CreateRestaurant