import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import RestaurantModal from '../../components/restaurant/RestaurantModal'
import ItemCard from '../../components/item/ItemCard'
import RestaurantImage from '../../assets/images/restaurant/restaurant-image.jpg'
import '../../assets/styles/restaurant.css'

class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOwner: false,
      restaurantDetail: {},
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

  componentDidMount() {
    this.getRestaurantDetail()
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
              <p className="restaurant-detail-desc-text">{this.state.restaurantDetail.description}</p>
              { this.state.isOwner ? 
                <div>
                  <RestaurantModal 
                    handleChange={this.handleChange}
                    handleFile={this.handleFile}
                    restaurantDetail={this.state.restaurantDetail}
                    updateRestaurant={this.updateRestaurant}/>
                  <RestaurantModal deleteRestaurant={this.deleteRestaurant}/>
                </div> : null}
            </div>
          </div>
        </Container>
        <h1 className="restaurant-detail-heading-text text-center">Our Menus</h1>
        <hr className="heading-hr mb-5" />
        <div className="mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-5 list-col">
              <ItemCard />
            </div>
            <div className="col-md-5 list-col">
              <ItemCard />
            </div>
          </div>
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