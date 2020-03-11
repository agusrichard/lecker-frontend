import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import '../assets/styles/login.css'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.state.username && this.state.password) {
      const data = { username: this.state.username, password: this.state.password }
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/login', data)
      if (response.status === 200) {
        try {
          localStorage.setItem('token', JSON.stringify(response.data.data.token))
          this.props.history.push('/')
        } catch(err) {
          console.log(err)
        }
      }
    } else {
      alert('Please provide the required fields')
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
                    <h3 className="login-heading mb-5">Welcome back!</h3>
                    <form method="post">
                      <div className="form-label-group">
                        <input type="text" id="inputUsername" name="username" 
                                className="form-control" placeholder="Username"
                                onChange={this.handleChange}
                                required autoFocus />
                        <label htmlFor="inputUsername">Username</label>
                      </div>

                      <div className="form-label-group">
                        <input type="password" id="inputPassword" name="password" 
                                className="form-control" placeholder="Password" 
                                onChange={this.handleChange} required />
                        <label htmlFor="inputPassword">Password</label>
                      </div>

                      <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 mt-5" 
                              type="submit" onClick={this.handleSubmit}>Login</button>
                      <div className="mx-auto mt-3">
                        <div className="row">
                          <Link className="col text-left text-muted text-decoration-none" to="/auth/forgot-password">Forgot password?</Link>
                          <Link className="col text-right text-muted text-decoration-none" to="/auth/register">Sign Up?</Link>
                        </div>
                      </div>
                    </form>
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


export default Login