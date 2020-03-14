import React from 'react'
import '../assets/styles/create-restaurant.css'


function CreateRestaurantForm(props) {
  return (
    <form method="post">
		  <h2>Create Restaurant</h2>
		  <p className="hint-text">A Piece Of Cake</p>
      <div className="form-group">
        <input type="text" className="form-control" name="name" 
          placeholder="Restaurant Name" required="required" 
          onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="location" 
          placeholder="Location" required="required" 
          onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="description" 
          placeholder="Description" required="required" 
          onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="formControlFile">Restaurant Image</label>
        <input type="file" className="form-control-file" id="formControlFile" 
                name="profilePicture" onChange={props.handleFile} />
      </div> 
      <div className="form-group">
        <button type="submit" className="btn btn-success btn-lg btn-block"
          onClick={props.handleSubmit}>Create</button>
      </div>
    </form>
  )
}

export default CreateRestaurantForm