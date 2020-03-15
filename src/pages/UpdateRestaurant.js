import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'

import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import '../assets/styles/create-restaurant.css'

class UpdateRestaurant extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      name: '',
      location: '',
      description: '', 
      logo: '',
      restaurantDetail: ''
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFile = (event) => {
    this.setState({ logo: event.target.files[0] })
  }

  handleSubmit = async (event) => {
    console.log('handleSubmit')
    event.preventDefault()
    let token = Cookies.get('token')
    token = token.slice(1, token.length-1)
    try {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        let formData = new FormData()
        formData.append('logo', this.state.logo || this.state.restaurantDetail.logo)
        formData.append('name', this.state.name || this.state.restaurantDetail.name)
        formData.append('location', this.state.location || this.state.restaurantDetail.location)
        formData.append('description', this.state.description || this.state.restaurantDetail.description)

        const response = await axios.patch(process.env.REACT_APP_BASE_URL + `/restaurants/${this.state.restaurantDetail.id}`, formData, config)
        console.log(response)
        if (response.status === 200) {
            this.props.history.push(`/restaurants/${this.state.restaurantDetail.id}`)
        }
    } catch(err) {
        console.log(err)
        alert('Failed to update restaurant')
    }
  }

  getRestaurantDetail = async () => {
    const restaurantId = this.props.match.params.restaurantId
    console.log('getRestaurantDetail')
    console.log(restaurantId)
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/restaurants/${restaurantId}`)
      console.log(response)
      if (response.status === 200) {
        this.setState({ restaurantDetail: response.data.data })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to load restaurant detail')
    }
  }

  componentDidMount() {
    this.checklog()
    this.getRestaurantDetail()
  }

  render() {
    console.log(this.state.restaurantDetail)
    return (
      <div>
        <Helmet>
          <title>Lecker - Update Restaurant</title>
        </Helmet>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout }/>
        <div className="signup-form">
          <CreateRestaurantForm 
            title="Update"
            handleChange={this.handleChange}
            handleFile={this.handleFile}
            handleSubmit={this.handleSubmit}
            restaurantDetail={this.state.restaurantDetail}
            />
        </div>
        <Footer />
      </div>
    )
  }
}


export default UpdateRestaurant