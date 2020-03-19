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
      restaurantId: '', 
      name: '', 
      price: '', 
      description: '', 
      category: '',
      itemImage: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFile = (event) => {
    this.setState({ itemImage: event.target.files[0] })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } }
      let formData = new FormData()
      formData.append('itemImage', this.state.itemImage)
      formData.append('name', this.state.name)
      formData.append('price', parseInt(this.state.price))
      formData.append('category', this.state.category)
      formData.append('description', this.state.description)
      formData.append('restaurantId', this.state.restaurantId)

      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/items', formData, config)
      console.log(response)
      if (response.status === 200) {
          this.props.history.push('/restaurants/' + this.state.restaurantId)
      }
    } catch(err) {
      console.log(err)
      alert('Failed to create restaurant')
    }
  }

  componentDidMount() {
    this.setState({ restaurantId: parseInt(this.props.match.params.restaurantId) })
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Lecker - New Menu</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant-detail"></section>
        <div className="mt-5 mb-5 mx-auto form-container">
          <h1 className="pretty-text text-center">New Menu</h1>
          <hr className="heading-hr mb-5" />
          <Form>
          <FormGroup>
            <Label for="name" className="create-restaurant-form-label">Menu Name</Label>
            <input type="text" className="create-restaurant-form-input" name="name" id="name" placeholder="Name" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="category" className="create-restaurant-form-label">Menu Category</Label>
            <input type="text" className="create-restaurant-form-input" name="category" id="category" placeholder="Category" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="price" className="create-restaurant-form-label">Price</Label>
            <input type="number" className="create-restaurant-form-input" name="price" id="price" placeholder="Price" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="description" className="create-restaurant-form-label">Description</Label>
            <textarea className="create-restaurant-form-input" name="description" id="description" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="itemImage" className="create-restaurant-form-label">Menu Image</Label>
            <CustomInput type="file" id="itemImage" name="itemImage" onChange={this.handleFile} />
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