import React from 'react'


function ForgotPasswordForm(props) {
  return (
    <form method="post">
      <div className="form-label-group">
        <input type="text" id="inputEmail" className="form-control" 
              placeholder="Email" name="email" 
              onChange={props.handleChange}
              required autoFocus />
        <label htmlFor="inputEmail">Email</label>
      </div>

      <div className="form-label-group">
        <input type="text" id="inputUsername" className="form-control" 
              placeholder="Username" name="username" 
              onChange={props.handleChange}
              required />
        <label htmlFor="inputUsername">Username</label>
      </div>

      <button className="btn btn-lg btn-primary btn-block btn-forgotpassword text-uppercase font-weight-bold mb-2 mt-5" 
        type="submit" onClick={props.handleSubmit}>reset password</button>
    </form>
  )
}

export default ForgotPasswordForm