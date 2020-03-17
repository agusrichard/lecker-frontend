import React from 'react'
import { Helmet } from 'react-helmet'
import { Spinner } from 'reactstrap'
import axios from 'axios'

import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'
import ForgotPasswordSuccessForm from '../components/auth/ForgotPasswordSuccessForm'
import DismissableAlert from '../components/DismissableAlert'
import '../assets/styles/forgotpassword.css'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      message: '',
      newPassword: '',
      confirmPassword: '',
      token: '',
      isValid: true,
      isSuccess: false,
      isLoading: false,
      readyToReset: false
    }
  }

  dismiss = () => {
    this.setState({ isValid: true })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitForgot = async (event) => {
    event.preventDefault()
    try {
      if (this.state.username && this.state.email) {
        const data = { username: this.state.username, email: this.state.email }
        this.setState({ isLoading: true })
        console.log()
        const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/forgot-password', data)
        console.log(response)
        if (response.status === 200) {
          this.setState(prevState => {
            return { isSuccess: !prevState.isSuccess, isLoading: !prevState.isLoading }
          })
        }
      } else {
        this.setState(prevState => {
          return {
            isValid: !prevState.isValid,
            message: 'Please provide username and email'
          }
        })
      }
    } catch(err) {
      console.log(err)
      this.setState(prevState => {
        return {
          isValid: !prevState.isValid,
          message: 'Can\'t change password'
        }
      })
    }
  }

  handleSubmitReset = async (event) => { 
    event.preventDefault()
    try {
      if (this.state.newPassword && this.state.confirmPassword) {
        if (this.state.newPassword === this.state.confirmPassword) {
          const data = { newPassword: this.state.newPassword, confirmPassword: this.state.confirmPassword }
          this.setState({ isLoading: true })
          console.log(process.env.REACT_APP_BASE_URL + '/auth/forgot-password/success' + this.state.token)
          const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/forgot-password/success' + this.state.token, data)
          console.log(response)
          if (response.status === 200) {
            this.props.history.push('/auth/login')
            this.setState(prevState => {
              return { isSuccess: !prevState.isSuccess, isLoading: !prevState.isLoading }
            })
          }
        } else {
          this.setState(prevState => {
            return {
              isValid: !prevState.isValid,
              message: 'New password and confirm password must match'
            }
          })
        }
      } else {
        this.setState(prevState => {
          return {
            isValid: !prevState.isValid,
            message: 'Please provide new password and confirm password'
          }
        })
      }
    } catch(err) {
      console.log(err)
      this.setState(prevState => {
        return {
          isValid: !prevState.isValid,
          message: 'Can\'t change password'
        }
      })
    }
  }

  componentDidMount() {
    const code = this.props.location.search
    console.log(code)
    if (code) {
      console.log('here')
      this.setState({ readyToReset: true, token: code })
    }
  }

  render() {
    let inside = ''
    if (this.state.readyToReset) {
      inside = (
        <div>
          { !this.state.isValid ? 
            <DismissableAlert message={this.state.message} 
                              context="warning" 
                              dismiss={this.dismiss}/> 
            : null }
          <h3 className="register-heading">Reset Password
            <span className="ml-3">
              { this.state.isLoading ? <Spinner type="grow" color="info" className="mx-auto"/> : null }
            </span>
          </h3><hr className="hr-separator"/>
          <ForgotPasswordSuccessForm handleChange={this.handleChange} handleSubmit={this.handleSubmitReset} />
        </div>
      )
    } else if (!this.state.isSuccess) {
      inside = (
        <div>
          { !this.state.isValid ? 
            <DismissableAlert message={this.state.message} 
                              context="warning" 
                              dismiss={this.dismiss}/> 
            : null }
          <h3 className="register-heading">Forgot Password
            <span className="ml-3">
              { this.state.isLoading ? <Spinner type="grow" color="info" className="mx-auto"/> : null }
            </span>
          </h3><hr className="hr-separator"/>
          <ForgotPasswordForm handleChange={this.handleChange} handleSubmit={this.handleSubmitForgot}/>
        </div>
      )
    } else {
      inside = <h3 className="register-heading mb-5 text-center">Please check your email to get the recover password link</h3>
    }

    return (
      <div className="container-fluid background-forgotpassword">
        <Helmet>
          <title>Lecker - Forgot Password</title>
        </Helmet>
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-forgotpassword"></div>
          <div className="col-md-8 col-lg-6">
            <div className="forgotpassword d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    { inside }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword