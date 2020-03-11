import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import '../assets/styles/login.css'

class Login extends React.Component {
  render() {
    return (
      <div className="container-fluid background-login">
        <Helmet>
          <meta charSet="utf-8" />
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
                    <form>
                      <div className="form-label-group">
                        <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus />
                        <label for="inputUsername">Username</label>
                      </div>

                      <div className="form-label-group">
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <label for="inputPassword">Password</label>
                      </div>

                      <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 mt-5" type="submit">Login</button>
                      <div className="mx-auto mt-3">
                        <div className="row">
                          <Link className="col text-left text-muted text-decoration-none" to="#">Forgot password?</Link>
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