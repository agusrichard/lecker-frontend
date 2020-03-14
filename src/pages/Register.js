import React from 'react'
import { Helmet } from 'react-helmet'
import { Spinner } from 'reactstrap'
import axios from 'axios'

import RegisterForm from '../components/RegisterForm'
import DismissableAlert from '../components/DismissableAlert'
import '../assets/styles/register.css'

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      message: '',
      isValid: true,
      isSuccess: false,
      isLoading: false
    }
  }

  dismiss = () => {
    this.setState(prevState => { 
      return {
        isValid: !prevState.isValid, 
        isLoading: prevState.isLoading
      }
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (this.state.name && this.state.email && this.state.username && this.state.password) {
        if (this.state.password ===  this.state.confirmPassword) {
          const data = { 
            name: this.state.name,
            email: this.state.email,
            username: this.state.username, 
            password: this.state.password 
          }
          this.setState({ isLoading: true })
          const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/register', data)
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
              isLoading: prevState.isLoading,
              message: 'Password and Confirm Password Must Match'
            }
          })
        }
      } else {
        this.setState(prevState => {
          return {
            isValid: !prevState.isValid,
            isLoading: prevState.isLoading,
            message: 'Please provide the required fields'
          }
        })
      }
    } catch(err) {
      this.setState(prevState => {
        return {
          isValid: !prevState.isValid,
          isLoading: prevState.isLoading,
          message: 'Username is already used'
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
          <h3 className="register-heading mb-2">Register Here
            <span className="ml-3">
              { this.state.isLoading ? <Spinner type="grow" color="info" className="mx-auto"/> : null }
            </span>
          </h3><hr className="hr-separator"/>
          <RegisterForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </div>
      )
    } else {
      inside = <h3 className="register-heading mb-5 text-center">Please check your email to verify your account</h3>
    }

    return (
      <div className="container-fluid background-register">
        <Helmet>
          <title>Lecker - Register</title>
        </Helmet>
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-register"></div>
          <div className="col-md-8 col-lg-6">
            <div className="register d-flex align-items-center py-5">
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


export default Register