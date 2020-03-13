import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import CustomNavbar from '../components/NavBar'
import ChangeProfileForm from '../components/ChangeProfileForm'
import Footer from '../components/Footer'
import '../assets/styles/create-restaurant.css'

class ChangeProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			isLoggedIn: false,
			email: '',
			fullName: '',
			profile: ''
    }
	}

	logout = () => {
    Cookies.remove('token')
    this.setState({ isLoggedIn: false })
    this.props.history.push('/')
  }
	
	handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
	}

	getUserProfile = async () => {
    let token = Cookies.get('token')
    token = token.slice(1, token.length-1)
    console.log('getUserProfile')
    console.log(token)
    console.log(this.props.location.pathname)
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(process.env.REACT_APP_BASE_URL + '/users/profile', config)
      console.log(response)
      if (response.status === 200) {
        this.setState({ profile: response.data.data })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to load user profile')
    }
  }
	
	handleSubmit = async (event) => {
		console.log('handleSubmit')
		event.preventDefault()
		let token = Cookies.get('token')
		token = token.slice(1, token.length-1)
		try {
			const config = { headers: { Authorization: `Bearer ${token}` } }
			const data = { email: this.state.email, fullName: this.state.fullName }
			const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/users/change-profile', data, config)
			console.log(response)
			if (response.status === 200) {
				this.props.history.push('/users/profile')
			}
		} catch(err) {
			console.log(err)
			alert('Failed to change profile')
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
		this.getUserProfile()
	}
	
	render() {
		return (
			<div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={this.logout}/>
        <div class="signup-form">
          <ChangeProfileForm 
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						profile={this.state.profile}
					/>
        </div>
        <Footer />
      </div>
		)
	}
}

export default ChangeProfile