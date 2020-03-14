import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'

import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import '../assets/styles/create-restaurant.css'

class CreateRestaurant extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      name: '',
      location: '',
      description: '', 
      logo: ''
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
        formData.append('logo', this.state.logo)
        formData.append('name', this.state.name)
        formData.append('location', this.state.location)
        formData.append('description', this.state.description)

        const response = await axios.post(process.env.REACT_APP_BASE_URL + '/restaurants', formData, config)
        console.log(response)
        if (response.status === 200) {
            this.props.history.push('/restaurants')
        }
    } catch(err) {
        console.log(err)
        alert('Failed to create restaurant')
    }
  }

  componentDidMount() {
    this.checklog()
  }

  render() {
    console.log(this.state.logo)
    return (
      <div>
        <Helmet>
          <title>Lecker - Create Restaurant</title>
        </Helmet>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout }/>
        <div className="signup-form">
          <CreateRestaurantForm 
            handleChange={this.handleChange}
            handleFile={this.handleFile}
            handleSubmit={this.handleSubmit}
            />
        </div>
        <Footer />
      </div>
    )
  }
}


export default CreateRestaurant