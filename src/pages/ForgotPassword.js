import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import '../assets/styles/forgotpassword.css'

class ForgotPassword extends React.Component {
  render() {
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
                    <h3 className="forgotpassword-heading mb-5 text-center">Forgot Password?</h3>
                    <form>
                      <div className="form-label-group">
                        <input type="text" id="inputEmail" className="form-control" placeholder="Email" required autofocus />
                        <label for="inputEmail">Email</label>
                      </div>

                      <div className="form-label-group">
                        <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus />
                        <label for="inputUsername">Username</label>
                      </div>

                      <button className="btn btn-lg btn-primary btn-block btn-forgotpassword text-uppercase font-weight-bold mb-2 mt-5" type="submit">reset password</button>
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

export default ForgotPassword