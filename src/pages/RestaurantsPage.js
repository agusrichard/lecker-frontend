import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Link } from 'react-router-dom'

import RestaurantCard from '../components/RestaurantCard'
import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

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

  logout = () => {
    Cookies.remove('token')
    this.setState({ isLoggedIn: false })
    this.props.history.push('/')
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
    this.checklog()
    this.getRestaurants()
  }

  render() {
    console.log(this.state.currentPage)
    const renderedRestaurants = this.state.listOfRestaurants.map(item => {
      return (
        <div class="col-lg-4 col-md-6 col-sm-12 p-3">
          <RestaurantCard key={item.id} item={item}/>
        </div>
      )
    })

    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout }/>
        <div className="container mb-5">
          <h1 className="text-center mt-5">List of Restaurants</h1><hr />
          <div className="row">
            {renderedRestaurants}
          </div>
          <Pagination pagination={this.state.pagination} rerender={this.rerender} route="restaurants"/>
          <span className="border border-warning px-5 py-2">Want your own restaurant? <Link to="/create-restaurant">Go here</Link></span>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantsPage