import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide'
import CustomNavbar from '../../components/CustomNavBar'
import CustomModal from '../../components/CustomModal'
import Footer from '../../components/Footer'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Image from '../../assets/images/profile-picture-placeholder.png'
import '../../assets/styles/userprofile.css'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topupAmount: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  topup = async () => {
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const amount = this.state.topupAmount
      const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/users/topup', { amount } ,config)
      console.log(response)
      if (response.status === 200) {
        alert('Top up success')
        this.props.history.push('/users/profile')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to topup')
    }
  }

  deleteUser = async () => {
    try {
      let token = this.props.loginToken
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

  render() {
    return (
      <div className="page-bg">
        <Helmet>
          <title>Lecker - Profile</title>
        </Helmet>
        <CustomNavbar />
        <section className="user-profile"></section>
        <Container className="mb-5">
          <div className="row profile-box">
            <div className="col-md-4">
            <Zoom>
              <img src={ this.props.profile.profile_picture ? process.env.REACT_APP_BASE_URL+ '/' + this.props.profile.profile_picture : Image } className="rounded-circle profile-picture" alt="..." />
            </Zoom>
            </div>
            <div className="col-md-8 profile-text-box">
              <Slide right>
                <h2 className="profile-text">{this.props.profile.full_name}</h2>
              </Slide>
              <Slide right>
                <p className="profile-text">{this.props.profile.username}</p>
              </Slide>
              <Slide right>
                <p className="card-text" style={{ color: '#ffc107', fontSize: '1.5rem' }}>Balance: Rp. {this.props.profile.balance}</p>
              </Slide>
            </div>
          </div>
        </Container>
        <section className="profile-button-box pt-5">
          <Container>
            <div className="row d-flex justify-content-around">
              <Slide left>
                <div className="col-md-3 profile-card p-2">
                  <h3 className="text-center profile-card-text-title">Top Up Balance</h3>
                  <p className="text-center profile-card-text">Want to top up so you can buy anything you want? It's easy... Just click below</p>
                  <CustomModal 
                      buttonLabel="Topup"
                      deleteUser={this.topup}
                      message="Please provide the topup amount:"
                      btnMessage="Topup" 
                      handleChange={this.handleChange} 
                      topup={this.topup}/>
                </div>
              </Slide>
              <Slide bottom>
                <div className="col-md-3 profile-card p-2">
                  <h3 className="text-center profile-card-text-title">Change Profile</h3>
                  <p className="text-center profile-card-text">You are not the one who you were before. Good... You can have a new you here.</p>
                  <button className="mt-5 btn-block profile-card-button">Change</button>
                </div>
              </Slide>
              <Slide right>
                <div className="col-md-3 profile-card p-2">
                  <h3 className="text-center profile-card-text-title">Delete Account</h3>
                  <p className="text-center profile-card-text">You want to you delete your account? Please stay... We don't want to lose you.</p>
                  <CustomModal 
                      buttonLabel="Delete Account"
                      btnClass="danger"
                      deleteUser={this.deleteUser} 
                      message="Are you sure want to delete your account?"
                      btnMessage="Delete"/>
                </div>
              </Slide>
            </div>
          </Container>
        </section>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.auth.userData,
  loginToken: state.auth.loginToken
})


export default connect(mapStateToProps)(UserProfile)