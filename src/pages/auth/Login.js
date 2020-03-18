import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import { userLogin } from '../../redux/actions/auth'
import LoginForm from '../../components/auth/LoginForm'
import DismissableAlert from '../../components/DismissableAlert'
import '../../assets/styles/login.css'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      message: '',
      isValid: true
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
      if (this.state.username && this.state.password) {
        const data = { username: this.state.username, password: this.state.password }
        const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/login', data)
        if (response.status === 200) {
          this.props.userLogin(data)
          this.props.history.push('/')
        } else {
          this.setState(prevState => {
            return {
              isValid: !prevState.isValid,
              message: 'Wrong username or password'
            }
          })
        }
      } else {
        this.setState(prevState => {
          return {
            isValid: !prevState.isValid,
            message: 'Please provide username and password'
          }
        })
      }
    } catch(err) {
      this.setState(prevState => {
        return {
          isValid: !prevState.isValid,
          message: 'Wrong username or password'
        }
      })
    }
  }

  render() {
    return (
      <div className="container-fluid background-login">
        <Helmet>
          <title>Lecker - Login</title>
        </Helmet>
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-login"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    { !this.state.isValid ? 
                      <DismissableAlert message={this.state.message} 
                                        context="warning" 
                                        dismiss={this.dismiss}/> 
                      : null }
                    <h3 className="login-heading mb-5 text-center">Welcome back!</h3>
                    <LoginForm 
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                    />
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


export default connect(null, { userLogin })(Login)