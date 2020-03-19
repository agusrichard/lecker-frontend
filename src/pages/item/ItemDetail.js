import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import RestaurantModal from '../../components/restaurant/RestaurantModal'
import ItemCard from '../../components/item/ItemCard'
import ItemImage from '../../assets/images/item/item-image.jpg'
import '../../assets/styles/restaurant.css'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOwner: false,
      itemDetail: {},
      name: '', 
      price: '', 
      description: '',
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

  getItemDetail = async () => {
    const itemId = this.props.match.params.itemId
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + `/items/${itemId}`)
      if (response.status === 200) {
        console.log(response)
        this.setState({
          itemDetail: response.data.data.item,
        })
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

  componentDidMount() {
    this.getItemDetail()
  }

  render() {
    console.log('render')
    console.log(this.state.isOwner)
    return (
      <div>
        <Helmet>
          <title>Lecker - Item Detail</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant-detail"></section>
        <Container className="mt-5 mb-5">
          <div className="row restaurant-detail-card">
            <div className="col-md-4">
              <img src={ this.state.itemDetail.images ? process.env.REACT_APP_BASE_URL+ '/' + this.state.itemDetail.images : ItemImage } className="restaurant-detail-img" alt="..." />
            </div>
            <div className="col-md-8 detail-text-box">
              <h3 className="restaurant-detail-desc-head-text">{this.state.itemDetail.name}</h3>
              <p className="restaurant-detail-desc-text">{this.state.itemDetail.description}</p>
              <p className="item-detail-price">Rp. {this.state.itemDetail.price}</p>
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

export default connect(mapStateToProps)(ItemDetail)