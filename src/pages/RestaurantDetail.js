import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet'
import ItemCard from '../components/ItemCard'
import CustomNavbar from '../components/CustomNavBar'
import CustomModal from '../components/CustomModal'
import Footer from '../components/Footer'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
// import Image from '../assets/images/restaurant-image.jpg'

class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      restaurantDetail: '',
      listOfItems: []
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

  getItems = async () => {
    const restaurantId = this.props.match.params.restaurantId
    console.log('getItems')
    console.log(restaurantId)
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/restaurants/${restaurantId}/items`)
      console.log(response.data.data.results)
      console.log(response.data.data.pagination)
      if (response.status === 200) {
        this.setState({
          listOfItems: response.data.data.results,
          pagination: response.data.data.pagination
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.checklog()
    this.getRestaurantDetail()
    this.getItems()
  }

  render() {
    console.log('render')
    const itemsInCol = this.state.listOfItems.length
    const itemsColOne = this.state.listOfItems.slice(0, Math.ceil(itemsInCol / 2)).map(item => <ItemCard item={item} />)
    const itemsColTwo = this.state.listOfItems.slice(Math.ceil(itemsInCol / 2)).map(item => <ItemCard item={item} />)

    return (
      <div>
        <Helmet>
          <title>Lecker - Restaurant Detail</title>
        </Helmet>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout }/>
        <Container>
          <h1 className="text-center">Restaurant Detail</h1>
          <div className="card border-warning mb-3 p-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={ this.state.restaurantDetail.logo ? process.env.REACT_APP_BASE_URL+ '/' + this.state.restaurantDetail.logo : Image } className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <h5 className="card-title">{this.state.restaurantDetail.name}
                  { this.state.isLoggedIn && <span>
                    <Link className="btn btn-info ml-2 mr-2 px-4 py-2" to={`/restaurants/${this.state.restaurantDetail.id}/update`}>Update Restaurant</Link>
                    <CustomModal 
                      buttonLabel="Delete Restaurant" 
                      deleteUser={this.deleteRestaurant} 
                      message="Are you sure want to delete your restaurant?"
                      btnMessage="Delete"/>
                  </span> }
                  </h5>
                  <p className="card-text">Location: {this.state.restaurantDetail.location}</p>
                  <p className="card-text">Description: {this.state.restaurantDetail.description}</p>
                  <p className="card-text">Established: <small className="text-muted">{new Date(this.state.restaurantDetail.date_created).toLocaleString()}</small></p>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-center">List of our menus</h3>
          { itemsInCol !== 0 ?<div class="row mt-5">
            <div class="col-md-6">
              { itemsColOne }
            </div>
            <div class="col-md-6">
              { itemsColTwo }
            </div>
          </div> : <p className="text-center">No item</p>}
        </Container>
        <Footer />
      </div>
    )
  }
}


export default RestaurantDetail