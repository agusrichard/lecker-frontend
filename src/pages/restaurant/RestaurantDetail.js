import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Slide from 'react-reveal/Slide'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import RestaurantModal from '../../components/restaurant/RestaurantModal'
import StackingItems from '../../components/item/StackingItems'
import RestaurantImage from '../../assets/images/restaurant/restaurant-image.jpg'
import '../../assets/styles/restaurant.css'

class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOwner: false,
      restaurantDetail: {},
      listOfItems: [],
      name: '',
      location: '',
      description: '',
      logo: '',
      chosenCategory: 0
    }
  }

  changeCategory = (categoryId) => {
    this.setState({ chosenCategory: categoryId })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFile = (event) => {
    this.setState({ logo: event.target.files[0] })
  }

  getRestaurantDetail = async () => {
    const restaurantId = this.props.match.params.restaurantId
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/restaurants/${restaurantId}`)
      if (response.status === 200) {
        if (response.data.data.owner_id === this.props.userData.id) {
          this.setState({
            isOwner: true
          })
        }
        this.setState({
          restaurantDetail: response.data.data,
        })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to load restaurant detail')
    }
  }

  updateRestaurant = async (event) => {
    const restaurantId = this.props.match.params.restaurantId
    console.log('updateRestaurant')
    event.preventDefault()
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } }
      let formData = new FormData()
      formData.append('logo', this.state.logo)
      formData.append('name', this.state.name || this.state.restaurantDetail.name)
      formData.append('location', this.state.location || this.state.restaurantDetail.location)
      formData.append('description', this.state.description || this.state.restaurantDetail.description)

      const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/restaurants/' + restaurantId, formData, config)
      console.log(response)
      if (response.status === 200) {
        this.getRestaurantDetail()
        this.props.history.push('/restaurants/' + restaurantId)
      }
    } catch(err) {
      console.log(err)
      alert('Failed to change restaurant')
    }
  }

  deleteRestaurant = async () => {
    const restaurantId = this.props.match.params.restaurantId
    try {
      let token = this.props.loginToken
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(process.env.REACT_APP_BASE_URL + '/restaurants/' + restaurantId, config)
      console.log(response)
      if (response.status === 200) {
        this.props.history.push('/restaurants')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to delete restaurant')
    }
  }

  getItemsByRestaurant = async () => {
    const restaurantId = this.props.match.params.restaurantId
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/restaurants/${restaurantId}/items`)
      console.log(response)
      if (response.status === 200) {
        this.setState({ listOfItems: response.data.data.results })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to get items')
    }
  }

  componentDidMount() {
    this.getRestaurantDetail()
    this.getItemsByRestaurant()
    if (parseInt(this.props.userData.id) === parseInt(this.state.restaurantDetail.owner_id)) {
      this.setState({ isOwner: true })
    }
  }

  render() {
    console.log('render')
    console.log(this.state.isOwner)
    return (
      <div>
        <Helmet>
          <title>Lecker - Restaurant Detail</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant-detail"></section>
        <Container className="mt-5 mb-5">
          <div className="row restaurant-detail-card">
            <div className="col-md-4">
              <img src={ this.state.restaurantDetail.logo ? process.env.REACT_APP_BASE_URL+ '/' + this.state.restaurantDetail.logo : RestaurantImage } className="restaurant-detail-img" alt="..." />
            </div>
            <div className="col-md-8 detail-text-box">
              <h3 className="restaurant-detail-desc-head-text">{this.state.restaurantDetail.name}</h3>
              <p className="text-muted">{this.state.restaurantDetail.location}</p>
              <p className="restaurant-detail-desc-text">{this.state.restaurantDetail.description}</p>
              { this.state.isOwner ? 
                <div>
                  <RestaurantModal 
                    handleChange={this.handleChange}
                    handleFile={this.handleFile}
                    restaurantDetail={this.state.restaurantDetail}
                    updateRestaurant={this.updateRestaurant}/>
                  <RestaurantModal deleteRestaurant={this.deleteRestaurant}/>
                  <Link className="create-item-link" to={"/restaurants/" + this.props.match.params.restaurantId + "/new-menu"}>New Menu</Link>
                </div> : null}
            </div>
          </div>
        </Container>
        <p className="text-center items-list-begin-text mt-5">TRY &amp; DISCOVER</p>
        <h3 className="text-center items-list-main-text mb-2">Our Menus</h3>
        <hr className="heading-hr mb-5" />
        <div className="d-flex justify-content-center">
          <button className="item-category-btn" onClick={() => this.changeCategory(0)} >All</button>
          <button className="item-category-btn" onClick={() => this.changeCategory(1)} >Foods</button>
          <button className="item-category-btn" onClick={() => this.changeCategory(2)} >Drinks</button>
        </div>
        <div className="mt-5 mb-5">
          { this.state.chosenCategory === 0 ?
          <Slide right>
            <StackingItems listOfItems={this.state.listOfItems} />
          </Slide> :
          <Slide right>
            <StackingItems listOfItems={this.state.listOfItems.filter(item => item.category_id === this.state.chosenCategory)} />
          </Slide>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  loginToken: state.auth.loginToken
})

export default connect(mapStateToProps)(RestaurantDetail)