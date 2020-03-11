import React from 'react'

import { Container } from 'reactstrap'
import CustomNavbar from '../components/NavBar'

class Home extends React.Component {
  render() {
    return(
      <div>
        <CustomNavbar />
        <Container>
          <h1>Something in Home</h1>
          <p>Some text that i don't know what to write about</p>
        </Container>
      </div>
    )
  }
}

export default Home