import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

import ItemCard from '../components/ItemCard'
import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

class ItemsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      pagination: '',
      currentPage: process.env.REACT_APP_BASE_URL + this.props.location.pathname + this.props.location.search,
      listOfItems: [],
      selectedItems: []
    }
  }

  logout = () => {
    Cookies.remove('token')
    this.setState({ isLoggedIn: false })
    this.props.history.push('/')
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

  handleClick = (itemId) => {
    this.setState(prevState => {
      return {
        selectedItems: [...prevState.selectedItems, itemId]
      }
    })
  }

  componentWillUnmount() {
    Cookies.set('items', JSON.stringify(this.state.selectedItems))
  }

  componentDidMount() {
    const items = JSON.parse(Cookies.get('items'));
    this.setState({
      selectedItems: items
    })
    this.checklog()
    this.getItems()
  }


  render() {
    const itemsInCol = this.state.listOfItems.length
    const itemsColOne = this.state.listOfItems.slice(0, Math.ceil(itemsInCol / 2)).map(item => <ItemCard key={item.id} item={item} handleClick={this.handleClick}/>)
    const itemsColTwo = this.state.listOfItems.slice(Math.ceil(itemsInCol / 2)).map(item => <ItemCard key={item.id} item={item} handleClick={this.handleClick}/>)

    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout } totalItems={this.state.selectedItems.length}/>
        <div className="container mb-5">
          <h1 className="text-center mt-5">Our Menus</h1><hr />
          <div className="row mt-5">
            <div className="col-md-6">
              { itemsColOne }
            </div>
            <div className="col-md-6">
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