import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import RegisterForm from '../components/RegisterForm'
import '../assets/styles/register.css'

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      isSuccess: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.state.name && this.state.email && this.state.username && this.state.password) {
      const data = { 
        name: this.state.name,
        email: this.state.email,
        username: this.state.username, 
        password: this.state.password 
      }
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/register', data)
      if (response.status === 200) {
        this.setState((prevState, prevProps) => {
          return { 
            isSuccess: !prevState.isSuccess
          }
        })
      }
    }
  }

  render() {
    let inside = ''
    if (!this.state.isSuccess) {
      inside = (
        <div>
          <h3 className="register-heading mb-5 text-center">Register Here</h3>
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