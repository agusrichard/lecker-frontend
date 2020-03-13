import React from 'react'
import '../assets/styles/create-restaurant.css'


function ChangeProfileForm(props) {
  return (
    <form method="post">
		  <h2>Change Profile</h2>
		  <p className="hint-text">Have a new you...</p>
      <div className="form-group">
        <input type="text" className="form-control" name="email" 
                placeholder={props.profile.email} required="required" 
                onChange={props.handleChange}/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="fullName" 
                placeholder={props.profile.full_name} required="required" 
                onChange={props.handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="formControlFile">Profile Picture</label>
        <input type="file" className="form-control-file" id="formControlFile" 
                name="profilePicture" onChange={props.handleFile} />
      </div>   
      <div className="form-group">
        <button type="submit" className="btn btn-success btn-lg btn-block" onClick={props.handleSubmit}>Update</button>
      </div>
    </form>
  )
}

export default ChangeProfileForm