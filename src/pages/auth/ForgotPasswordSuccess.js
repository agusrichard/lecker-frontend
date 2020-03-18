import React from 'react'
import { Helmet } from 'react-helmet'
import { Spinner } from 'reactstrap'
import axios from 'axios'

import ForgotPasswordForm from '../components/ForgotPasswordForm'
import DismissableAlert from '../../components/DismissableAlert'
import '../assets/styles/forgotpassword.css'

class ForgotPasswordSuccess extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      message: '',
      isValid: true,
      isSuccess: false,
      isLoading: false
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

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (this.state.username && this.state.email) {
        const data = { username: this.state.username, email: this.state.email }
        this.setState({ isLoading: true })
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

  render() {
    let inside = ''
    if (!this.state.isSuccess) {
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
          <ForgotPasswordForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
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

export default ForgotPasswordSuccess