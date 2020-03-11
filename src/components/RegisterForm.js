import React from 'react'
import { Link } from 'react-router-dom'

function RegisterForm(props) {
  return (
    <form method="post">
      <div className="form-label-group">
        <input type="text" id="inputFullname" 
                className="form-control" placeholder="Fullname" 
                name="name" onChange={props.handleChange}
                required autoFocus />
        <label htmlFor="inputFullname">Fullname</label>
      </div>

      <div className="form-label-group">
        <input type="text" id="inputEmail" 
                className="form-control" placeholder="Email"
                name="email" onChange={props.handleChange}
                required />
        <label htmlFor="inputEmail">Email</label>
      </div>

      <div className="form-label-group">
        <input type="text" id="inputUsername" 
              className="form-control" placeholder="Username" 
              name="username" onChange={props.handleChange}
              required />
        <label htmlFor="inputUsername">Username</label>
      </div>

      <div className="form-label-group">
        <input type="password" id="inputPassword" 
                className="form-control" placeholder="Password"
                name="password" onChange={props.handleChange}
                required />
        <label htmlFor="inputPassword">Password</label>
      </div>

      <div className="form-label-group">
        <input type="password" id="inputConfirmPassword" 
                className="form-control" placeholder="Confirm Password"
                name="confirmpassword" onChange={props.handleChange}
                required />
        <label htmlFor="inputConfirmPassword">Confirm Password</label>
      </div>

      <button className="btn btn-lg btn-primary btn-block btn-register text-uppercase font-weight-bold mb-2 mt-5" 
              type="submit" onClick={props.handleSubmit}>register</button>
      <div className="mx-auto mt-3">
        <div className="row">
          <Link className="col text-left text-muted text-decoration-none" to="/auth/login">Already have account? Sign In</Link>
        </div>
      </div>
    </form>
  )
}

export default RegisterForm