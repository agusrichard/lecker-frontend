import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Link } from 'react-router-dom'

import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import ItemCard from '../components/ItemCard'
import CheckoutModal from '../components/CheckoutModal'

class Cart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      checkoutSuccess: false,
      currentBalance: 0,
      checkedOutItems: [],
      expenses: 0,
      listOfItems: []
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

  postItems = async () => {
    const items = JSON.parse(Cookies.get('items'));
    console.log(items)
    let token = Cookies.get('token')
    token = token.slice(1, token.length-1)
    try {
      const data = { list_of_items: items }
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/cart', data, config)
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }

  getItems = async () => {
    console.log('getItems')
    let token = Cookies.get('token')
    token = token.slice(1, token.length-1)
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(process.env.REACT_APP_BASE_URL + '/cart', config)
      console.log(response)
      if (response.status === 200) {
        this.setState({ 
          listOfItems: response.data.items,
          expenses: response.data.expenses })
      }
    } catch(err) {
      console.log(err)
    }
  }

  checkout = async () => {
    try {
      let token = Cookies.get('token')
      token = token.slice(1, token.length-1)
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(process.env.REACT_APP_BASE_URL + '/cart/checkout', config)
      if (response.status === 200) {
        Cookies.remove('items')
        this.setState(prevState => {
          return {
            checkoutSuccess: !prevState.checkoutSuccess,
            currentBalance: response.data.currentBalance,
            listOfItems: response.data.items
          }
        })
      }
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.checklog()
    this.postItems()
    this.getItems()
  }

  render() {
    console.log('render')
    console.log(this.state.listOfItems)
    const itemsInCol = this.state.listOfItems.length
    const itemsColOne = this.state.listOfItems.slice(0, Math.ceil(itemsInCol / 2)).map(item => <ItemCard key={item.id} item={item} handleClick={this.handleClick} />)
    const itemsColTwo = this.state.listOfItems.slice(Math.ceil(itemsInCol / 2)).map(item => <ItemCard key={item.id} item={item} handleClick={this.handleClick} />)

    return (
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={ this.logout } totalItems={this.state.listOfItems.length}/>
        { !this.state.checkoutSuccess ? 
          <div className="container mb-5">
            <h1 className="text-center mt-5">Selected items in your cart
              <CheckoutModal 
                checkout={this.checkout}/>
            </h1><hr />
            <h2 className="text-center mt-2">Expenses: Rp. {this.state.expenses}</h2>
            <div className="row mt-5">
              <div className="col-md-6">
                { itemsColOne }
              </div>
              <div className="col-md-6">
                { itemsColTwo }
              </div>
            </div>
          </div> :
          <div className="container mb-5">
          <h1 className="text-center mt-5">Checkout Items</h1><hr />
          <h2 className="text-center mt-2">Current Balance: Rp. {this.state.currentBalance}</h2>
          <div className="row mt-5">
            <div className="col-md-6">
              { itemsColOne }
            </div>
            <div className="col-md-6">
              { itemsColTwo }
            </div>
          </div>
        </div>
         }
        <Footer />
      </div>
    )
  }
}

export default Cart