import React from 'react'
import { Container } from 'reactstrap'
import Cookies from 'js-cookie'
import CustomNavbar from '../components/NavBar'
import ItemCard from '../components/ItemCard'

import '../assets/styles/home.css'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  checklog = () => {
    const token = Cookies.get('token')
    if (token) {
      this.setState({ isLoggedIn: true })
    }
  }

  componentDidMount() {
    this.checklog()
  }

  render() {
    return(
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } />
        <div className="container">
          <h1>Something in Home</h1>
          <p>Some text that i don't know what to write</p>
        </div>
      </div>
    )
  }
}

export default Home