import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import CustomNavbar from '../components/NavBar'
import { Container } from 'reactstrap'
import Image from '../assets/images/restaurant-image.jpg'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      profile: ''
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

  componentDidMount() {
    this.checklog()
    this.getUserProfile()
  }

  render() {
    console.log(this.state.profile.profile_picture)
    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={this.logout}/>
        <Container>
          <div className="card border-warning mb-3 p-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={ this.state.profile.profile_picture ? process.env.REACT_APP_BASE_URL+ '/' + this.state.profile.profile_picture : Image } className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{this.state.profile.full_name}</h5>
                  <p className="card-text">{this.state.profile.username}</p>
                  <p className="card-text"><small className="text-muted">{new Date(this.state.profile.date_created).toLocaleString()}</small></p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}


export default UserProfile