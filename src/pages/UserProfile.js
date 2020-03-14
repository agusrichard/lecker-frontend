import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'
import CustomNavbar from '../components/NavBar'
import CustomModal from '../components/CustomModal'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Image from '../assets/images/profile-picture-placeholder.png'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      profile: '',
      topupAmount: ''
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

  topup = async () => {
    try {
      let token = Cookies.get('token')
      token = token.slice(1, token.length-1)
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const amount = this.state.topupAmount
      const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/users/topup', { amount } ,config)
      console.log(response)
      if (response.status === 200) {
        alert('Top up success')
        this.props.history.push('/')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to topup')
    }
  }

  deleteUser = async () => {
    try {
      let token = Cookies.get('token')
      token = token.slice(1, token.length-1)
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(process.env.REACT_APP_BASE_URL + '/users/profile', config)
      console.log(response)
      if (response.status === 200) {
        this.logout()
        this.props.history.push('/auth/login')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to delete account')
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
        this.setState({ profile: response.data.data.user })
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
    console.log(this.state.topupAmount)
    return (
      <div>
        <Helmet>
          <title>Lecker - Profile</title>
        </Helmet>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout }/>
        <Container>
          <div className="card border-warning mb-3 p-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={ this.state.profile.profile_picture ? process.env.REACT_APP_BASE_URL+ '/' + this.state.profile.profile_picture : Image } className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{this.state.profile.full_name}
                  <span>
                    <CustomModal 
                      buttonLabel="Topup" 
                      deleteUser={this.topup} 
                      message="Please provide the topup amount:"
                      btnMessage="Topup" 
                      handleChange={this.handleChange} 
                      topup={this.topup}/>
                    <Link className="btn btn-info ml-2 mr-2 px-4 py-2" to="/users/change-profile">Change Profile</Link>
                    <CustomModal 
                      buttonLabel="Delete Account" 
                      deleteUser={this.deleteUser} 
                      message="Are you sure want to delete your account?"
                      btnMessage="Delete"/>
                  </span>
                  </h5>
                  <p className="card-text" style={{ color: '#ffc107', fontSize: '1.5rem' }}>Balance: Rp. {this.state.profile.balance}</p>
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