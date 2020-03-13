import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import RestaurantCard from '../components/RestaurantCard'
import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import { Container } from 'reactstrap'

class RestaurantsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      pagination: '',
      currentPage: process.env.REACT_APP_BASE_URL + this.props.location.pathname + this.props.location.search,
      listOfRestaurants: []
    }
  }

  checklog = () => {
    const token = Cookies.get('token')
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  getRestaurants = async () => {
    console.log('getRestaurants')
    console.log(this.state.currentPage)
    try {
      const response = await axios.get(this.state.currentPage)
      console.log(response.data.data.results)
      console.log(response.data.data.pagination)
      this.setState({
        listOfRestaurants: response.data.data.results,
        pagination: response.data.data.pagination
      })
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.state.currentPage)
    this.checklog()
    this.getRestaurants()
  }

  render() {
    console.log(this.state.currentPage)
    const renderedRestaurants = this.state.listOfRestaurants.map(item => {
      return (
        <div class="col-lg-4 col-md-6 col-sm-12 p-3">
          <RestaurantCard item={item}/>
        </div>
      )
    })

    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } />
        <div className="container mb-5">
          <h1 className="text-center mt-5">List of Restaurants</h1><hr />
          <div class="row">
            {renderedRestaurants}
          </div>
          <Pagination pagination={this.state.pagination} rerender={this.rerender} route="restaurants"/>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantsPage