import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import '../assets/styles/register.css'

class Register extends React.Component {
  render() {
    return (
      <div className="container-fluid background-register">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lecker - Register</title>
        </Helmet>
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image-register"></div>
          <div className="col-md-8 col-lg-6">
            <div className="register d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="register-heading mb-5">Welcome! Please provide the required informations</h3>
                    <form>
                      <div className="form-label-group">
                        <input type="text" id="inputFullname" className="form-control" placeholder="Fullname" required autofocus />
                        <label for="inputFullname">Fullname</label>
                      </div>

                      <div className="form-label-group">
                        <input type="text" id="inputEmail" className="form-control" placeholder="Email" required autofocus />
                        <label for="inputEmail">Email</label>
                      </div>

                      <div className="form-label-group">
                        <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus />
                        <label for="inputUsername">Username</label>
                      </div>

                      <div className="form-label-group">
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <label for="inputPassword">Password</label>
                      </div>

                      <button className="btn btn-lg btn-primary btn-block btn-register text-uppercase font-weight-bold mb-2 mt-5" type="submit">register</button>
                      <div className="mx-auto mt-3">
                        <div className="row">
                          <Link className="col text-left text-muted text-decoration-none" to="/auth/login">Already have account? Sign In</Link>
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


export default Register