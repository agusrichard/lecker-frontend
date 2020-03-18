import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide'
import { userLogout, getUserProfile } from '../../redux/actions/auth'
import CustomNavbar from '../../components/CustomNavBar'
import CustomModal from '../../components/CustomModal'
import Footer from '../../components/Footer'
import Image from '../../assets/images/profile-picture-placeholder.png'
import '../../assets/styles/userprofile.css'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topupAmount: '',
      email: '',
      fullName: '',
      profilePicture: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFile = (event) => {
    this.setState({ profilePicture: event.target.files[0] })
  }

  topup = async () => {
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const amount = this.state.topupAmount
      const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/users/topup', { amount } ,config)
      console.log(response)
      if (response.status === 200) {
        this.props.getUserProfile(token)
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
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(process.env.REACT_APP_BASE_URL + '/users/profile', config)
      console.log(response)
      if (response.status === 200) {
        this.props.userLogout()
        this.props.history.push('/auth/login')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to delete account')
    }
  }

  updateUser = async (event) => {
    console.log('updateUser')
    event.preventDefault()
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } }
      let formData = new FormData()
      formData.append('profilePicture', this.state.profilePicture)
      formData.append('email', this.state.email || this.props.profile.email)
      formData.append('fullName', this.state.fullName || this.props.profile.full_name)

      const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/users/change-profile', formData, config)
      console.log(response)
      if (response.status === 200) {
        this.props.getUserProfile(token)
        this.props.history.push('/users/profile')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to change profile')
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    let token = this.props.loginToken
    this.props.getUserProfile(token)
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
                      buttonLabel="Top Up"
                      message="Please provide the topup amount:"
                      btnMessage="Top Up" 
                      handleChange={this.handleChange} 
                      topup={this.topup}/>
                </div>
              </Slide>
              <Slide bottom>
                <div className="col-md-3 profile-card p-2">
                  <h3 className="text-center profile-card-text-title">Change Profile</h3>
                  <p className="text-center profile-card-text">You are not the one who you were before. Good... You can have a new you here.</p>
                  <CustomModal 
                      buttonLabel="Change Profile"
                      message="Please Fill The Fields:"
                      btnMessage="Change" 
                      handleChange={this.handleChange} 
                      handleFile={this.handleFile}
                      updateUser={this.updateUser}/>
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

const mapDispatchToProps = { userLogout, getUserProfile }


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)