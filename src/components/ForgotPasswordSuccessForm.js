import React from 'react'


function ForgotPasswordSuccessForm(props) {
  return (
    <form method="post">
      <div className="form-label-group">
        <input type="password" id="inputNewPassword" className="form-control" 
              placeholder="New Password" name="newPassword" 
              onChange={props.handleChange}
              required autoFocus />
        <label htmlFor="inputNewPassword">New Password</label>
      </div>

      <div className="form-label-group">
        <input type="password" id="inputConfirmPassword" className="form-control" 
              placeholder="Confirm Password" name="confirmPassword" 
              onChange={props.handleChange}
              required />
        <label htmlFor="inputConfirmPassword">Confirm Password</label>
      </div>

      <button className="btn btn-lg btn-primary btn-block btn-forgotpassword text-uppercase font-weight-bold mb-2 mt-5" 
        type="submit" onClick={props.handleSubmit}>submit</button>
    </form>
  )
}

export default ForgotPasswordSuccessForm