import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import RestaurantImage from '../../assets/images/restaurant/restaurant-image.jpg'
import '../../assets/styles/restaurant.css'

class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOwner: false,
      restaurantDetail: {}
    }
  }

  getRestaurantDetail = async () => {
    const restaurantId = this.props.match.params.restaurantId
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/restaurants/${restaurantId}`)
      if (response.status === 200) {
        this.setState({
          restaurantDetail: response.data.data,
        })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to load restaurant detail')
    }
  }

  componentDidMount() {
    this.getRestaurantDetail()
    if (this.props.userData.id === this.state.restaurantDetail.owner_id) {
      this.setState({ isOwner: true })
    }
  }

  render() {
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
            </div>
          </div>
        </Container>
        <h1 className="restaurant-detail-heading-text text-center">Our Menus</h1>
        <hr className="heading-hr mb-5" />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData
})

export default connect(mapStateToProps)(RestaurantDetail)