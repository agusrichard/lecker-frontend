import React from 'react'

import { Container } from 'reactstrap'
import CustomNavbar from '../components/NavBar'

import '../assets/styles/home.css'

class Home extends React.Component {
  render() {
    return(
      <div>
        <CustomNavbar />
        <div className="container">
          <h1>Something in Home</h1>
          <p>Some text that i don't know what to write</p>
        </div>
      </div>
    )
  }
}

export default Home