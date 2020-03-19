import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import { 
  Form, 
  FormGroup, Label,
  CustomInput } from 'reactstrap';
import '../../assets/styles/restaurant.css'

class CreateRestaurant extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      name: '',
      location: '',
      description: '', 
      logo: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFile = (event) => {
    this.setState({ logo: event.target.files[0] })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } }
      let formData = new FormData()
      formData.append('logo', this.state.logo)
      formData.append('name', this.state.name)
      formData.append('location', this.state.location)
      formData.append('description', this.state.description)

      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/restaurants', formData, config)
      console.log(response)
      if (response.status === 200) {
          this.props.history.push('/profile')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to create restaurant')
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Lecker - Create Restaurant</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant-detail"></section>
        <div className="mt-5 mb-5 mx-auto form-container">
          <h1 className="pretty-text text-center">Create Restaurant</h1>
          <hr className="heading-hr mb-5" />
          <Form>
            <FormGroup>
              <Label for="restaurantName" className="create-restaurant-form-label">Restaurant Name</Label>
              <input type="text" className="create-restaurant-form-input" name="name" id="restaurantName" placeholder="Restaurant Name" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="location" className="create-restaurant-form-label">Location</Label>
              <input type="text" className="create-restaurant-form-input" name="location" id="location" placeholder="Location" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="description" className="create-restaurant-form-label">Text Area</Label>
              <textarea className="create-restaurant-form-input" name="description" id="description" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="logo" className="create-restaurant-form-label">Logo</Label>
              <CustomInput type="file" id="logo" name="logo" onChange={this.handleFile} />
            </FormGroup>
            <button className="btn-block create-restaurant-form-btn" onClick={this.handleSubmit}>Submit</button>
          </Form>
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loginToken: state.auth.loginToken
})

export default connect(mapStateToProps)(CreateRestaurant)