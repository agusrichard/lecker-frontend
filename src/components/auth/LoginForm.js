import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/login.css'

function LoginForm(props) {
  return (
    <form method="post">
      <div className="form-label-group mb-3">
        <input type="text" id="inputUsername" name="username" 
                className="form-control" placeholder="Username"
                onChange={props.handleChange}
                required autoFocus />
        <label htmlFor="inputUsername">Username</label>
      </div>

      <div className="form-label-group mb-3">
        <input type="password" id="inputPassword" name="password" 
                className="form-control" placeholder="Password" 
                onChange={props.handleChange} required />
        <label htmlFor="inputPassword">Password</label>
      </div>

      <button className="btn-block btn-login text-uppercase font-weight-bold mb-2 mt-5" 
              type="submit" onClick={props.handleSubmit}>Login</button>
      <div className="mx-auto mt-3">
        <div className="row">
          <Link className="col text-left text-decoration-none bottom-text" to="/auth/forgot-password">Forgot password?</Link>
          <Link className="col text-right text-decoration-none bottom-text" to="/auth/register">Sign Up?</Link>
        </div>
      </div>
    </form>
  )
}


export default LoginForm