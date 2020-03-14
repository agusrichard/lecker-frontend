import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'
import CustomNavbar from '../components/NavBar'
import CustomModal from '../components/CustomModal'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Image from '../assets/images/restaurant-image.jpg'

class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      restaurantDetail: ''
    }
  }

  logout = () => {
    Cookies.remove('token')
    this.setState({ isLoggedIn: false })
    this.props.history.goBack()
  }

  checklog = () => {
    const token = Cookies.get('token')
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  deleteRestaurant = async () => {
    const restaurantId = this.props.match.params.restaurantId
    try {
      let token = Cookies.get('token')
      token = token.slice(1, token.length-1)
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(process.env.REACT_APP_BASE_URL +  `/restaurants/${restaurantId}`, config)
      console.log(response)
      if (response.status === 200) {
        this.props.history.push('/restaurants')
      }
    } catch(err) {
      console.log(err)
      alert('Failed to delete restaurant')
    }
  }

  getRestaurantDetail = async () => {
    const restaurantId = this.props.match.params.restaurantId
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/restaurants/${restaurantId}`)
      console.log(response)
      if (response.status === 200) {
        this.setState({ restaurantDetail: response.data.data })
      }
    } catch(err) {
      console.log(err)
      alert('Failed to load restaurant detail')
    }
  }

  componentDidMount() {
    this.checklog()
    this.getRestaurantDetail()
  }

  render() {
    console.log(this.state.topupAmount)
    return (
      <div>
        <Helmet>
          <title>Lecker - Restaurant Detail</title>
        </Helmet>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout }/>
        <Container>
          <div className="card border-warning mb-3 p-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={ this.state.restaurantDetail.logo ? process.env.REACT_APP_BASE_URL+ '/' + this.state.restaurantDetail.logo : Image } className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <h5 className="card-title">{this.state.restaurantDetail.name}
                  <span>
                    <Link className="btn btn-info ml-2 mr-2 px-4 py-2" to="#">Update Restaurant</Link>
                    <CustomModal 
                      buttonLabel="Delete Restaurant" 
                      deleteUser={this.deleteRestaurant} 
                      message="Are you sure want to delete your restaurant?"
                      btnMessage="Delete"/>
                  </span>
                  </h5>
                  <p className="card-text">Location: {this.state.restaurantDetail.location}</p>
                  <p className="card-text">Description: {this.state.restaurantDetail.description}</p>
                  <p className="card-text">Established: <small className="text-muted">{new Date(this.state.restaurantDetail.date_created).toLocaleString()}</small></p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}


export default RestaurantDetail