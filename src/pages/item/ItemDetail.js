import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { Form, FormGroup, Label } from 'reactstrap';
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import ItemModal from '../../components/item/ItemModal'
import StackingReviews from '../../components/item/StackingReviews'
import ItemImage from '../../assets/images/item/item-image.jpg'
import '../../assets/styles/restaurant.css'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canChange: false,
      itemDetail: {},
      name: '', 
      price: '', 
      description: '',
      itemImage: '',
      rating: '',
      review: '',
      listOfReviews: []
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

  getItemDetail = async () => {
    const itemId = this.props.match.params.itemId
    const ownedRestaurantIds = this.props.ownedRestaurants.map(restaurant => restaurant.id)
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/items/${itemId}`)
      if (response.status === 200) {
        console.log(response)
        if (ownedRestaurantIds.includes(response.data.data.item.restaurant_id)) {
          this.setState({ canChange: true })
        }
        this.setState({ itemDetail: response.data.data.item })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to load item detail')
    }
  }

  updateItem = async (event) => {
    const itemId = this.props.match.params.itemId
    console.log('updateItem')
    event.preventDefault()
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } }
      let formData = new FormData()
      formData.append('itemImage', this.state.itemImage)
      formData.append('name', this.state.name || this.state.itemDetail.name)
      formData.append('price', parseInt(this.state.price) || this.state.itemDetail.price)
      formData.append('description', this.state.description || this.state.itemDetail.description)

      const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/items/' + itemId, formData, config)
      console.log(response)
      if (response.status === 200) {
        this.getItemDetail()
        this.props.history.push('/menus/' + itemId)
      }
    } catch(err) {
      console.log(err)
      alert('Failed to change item')
    }
  }

  deleteItem = async () => {
    const itemId = this.props.match.params.itemId
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(process.env.REACT_APP_BASE_URL + '/items/' + itemId, config)
      console.log(response)
      if (response.status === 200) {
        this.props.history.push('/menus')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to delete item')
    }
  }

  getReviews = async () => {
    console.log('getReviews')
    const itemId = this.props.match.params.itemId
    console.log(itemId)
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/reviews/items/${itemId}`)
      console.log(response)
      if (response.status === 200) {
        this.setState({ listOfReviews: response.data.data })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to get reviews')
    }
  }

  deleteReview = async (reviewId) => {
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(process.env.REACT_APP_BASE_URL + `/reviews/${reviewId}`, config)
      console.log(response)
      if (response.status === 200) {
        this.getReviews()
      }
    } catch(err) {
      console.log(err)
      alert('Failed to delete review')
    }
  }

  handleReview = async () => {
    const itemId = this.props.match.params.itemId
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const data = { itemId, rating: this.state.rating, review: this.state.review }
      const response = await axios.post(process.env.REACT_APP_BASE_URL + `/reviews`, data, config)
      console.log(response)
      if (response.status === 200) {
        this.getReviews()
      }
    } catch(err) {
      console.log(err)
      alert('Failed to create review')
    }
  }

  componentDidMount() {
    this.getReviews()
    this.getItemDetail()
  }

  render() {
    console.log('render')
    console.log('canChange', this.state.canChange)
    return (
      <div>
        <Helmet>
          <title>Lecker - Item Detail</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant-detail"></section>
        <Container className="mt-5 mb-5">
          <div className="row restaurant-detail-card">
          <div className="col-md-8 detail-text-box">
            <h3 className="restaurant-detail-desc-head-text">{this.state.itemDetail.name}</h3>
            <p className="restaurant-detail-desc-text">{this.state.itemDetail.description}</p>
            <p className="item-detail-price">Rp. {this.state.itemDetail.price}</p>
            { this.state.canChange ? 
              <>
                <ItemModal 
                  updateItem={this.updateItem} 
                  handleChange={this.handleChange}
                  itemDetail={this.state.itemDetail}
                  handleFile={this.handleFile}/>
                <ItemModal deleteItem={this.deleteItem} />
              </> : null}
            </div>
            <div className="col-md-3 item-img-container">
              <img src={ this.state.itemDetail.images ? process.env.REACT_APP_BASE_URL+ '/' + this.state.itemDetail.images : ItemImage } className="restaurant-detail-img" alt="..." />
            </div>
          </div>
        </Container>
        <h1 className="restaurant-detail-heading-text text-center">Reviews and Ratings</h1>
        <hr className="heading-hr mb-5" />
        <div className="mt-5 mb-5">
          <StackingReviews listOfReviews={this.state.listOfReviews} deleteReview={this.deleteReview} />
          <Container style={{ width: '75vw' }}>
            <div className="row d-flex justify-content-center ">
              <div className="review-card mt-3">
                <Form>
                  <FormGroup>
                    <Label for="rating" className="create-restaurant-form-label">Rating (0-10)</Label>
                    <input type="number" className="create-restaurant-form-input" name="rating" id="rating" placeholder="Rating" onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="review" className="create-restaurant-form-label">Review</Label>
                    <textarea className="create-restaurant-form-input" name="review" id="review" onChange={this.handleChange}/>
                  </FormGroup>
                  <button className="btn-block create-restaurant-form-btn" onClick={this.handleReview}>Submit</button>
                </Form>
              </div>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  loginToken: state.auth.loginToken,
  ownedRestaurants: state.user.ownedRestaurants
})

export default connect(mapStateToProps)(ItemDetail)