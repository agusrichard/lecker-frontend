import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import ItemCard from '../components/ItemCard'
import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import { Container } from 'reactstrap'

class ItemsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      pagination: '',
      currentPage: process.env.REACT_APP_BASE_URL + this.props.location.pathname + this.props.location.search,
      listOfItems: []
    }
  }

  checklog = () => {
    const token = Cookies.get('token')
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  getItems = async () => {
    console.log('getItems')
    console.log(this.state.currentPage)
    try {
      const response = await axios.get(this.state.currentPage)
      console.log(response.data.data.results)
      console.log(response.data.data.pagination)
      this.setState({
        listOfItems: response.data.data.results,
        pagination: response.data.data.pagination
      })
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.state.currentPage)
    this.checklog()
    this.getItems()
  }


  render() {
    console.log('render')
    console.log(this.state.currentPage)
    const itemsInCol = this.state.listOfItems.length
    const itemsColOne = this.state.listOfItems.slice(0, Math.ceil(itemsInCol / 2)).map(item => <ItemCard item={item} />)
    const itemsColTwo = this.state.listOfItems.slice(Math.ceil(itemsInCol / 2)).map(item => <ItemCard item={item} />)

    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } />
        <div className="container mb-5">
          <h1 className="text-center mt-5">Our Menus</h1><hr />
          <div class="row mt-5">
            <div class="col-md-6">
              { itemsColOne }
            </div>
            <div class="col-md-6">
              { itemsColTwo }
            </div>
          </div>
          <Pagination pagination={this.state.pagination} rerender={this.rerender} route="items"/>
        </div>
        <Footer />
      </div>
    )
  }
}


export default ItemsPage