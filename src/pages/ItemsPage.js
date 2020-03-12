import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import ItemCard from '../components/ItemCard'
import CustomNavbar from '../components/NavBar'
import Pagination from '../components/Pagination'
import { Container } from 'reactstrap'

class ItemsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      pagination: '',
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
    const pathname = this.props.location.pathname
    const search = this.props.location.search
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL + pathname + search)
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

  rerender = () => {
    this.getItems()
  }

  componentDidMount() {
    this.checklog()
    this.getItems()
  }


  render() {
    const itemsInCol = this.state.listOfItems.length
    const itemsColOne = this.state.listOfItems.slice(0, Math.ceil(itemsInCol / 2)).map(item => <ItemCard item={item} />)
    const itemsColTwo = this.state.listOfItems.slice(Math.ceil(itemsInCol / 2)).map(item => <ItemCard item={item} />)

    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } />
        <Container>
          <h1 className="text-center mt-5">List Of Items</h1><hr />
          <div class="row mt-5">
            <div class="col-md-6">
              { itemsColOne }
            </div>
            <div class="col-md-6">
              { itemsColTwo }
            </div>
          </div>
          <Pagination pagination={this.state.pagination} rerender={this.rerender}/>
        </Container>
      </div>
    )
  }
}


export default ItemsPage