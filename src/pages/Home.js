import React from 'react'
import Cookies from 'js-cookie'
import { Jumbotron, Container } from 'reactstrap';
import CustomNavbar from '../components/NavBar'
import Footer from '../components/Footer'
import CustomCarousel from '../components/Carousel'

import '../assets/styles/home.css'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
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

  componentDidMount() {
    this.checklog()
  }

  render() {
    return(
      <div>
        <CustomNavbar isLoggedIn={ this.state.isLoggedIn } logout={this.logout}/>
        <section className="home"></section>
        <div className="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-6">
              <CustomCarousel />
            </div>
          </div>
          <div className="mt-5 mb-5"></div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home