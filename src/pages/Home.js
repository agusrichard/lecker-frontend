import React from 'react'
import Slide from 'react-reveal/Slide';
import CustomNavbar from '../components/CustomNavBar'
import Footer from '../components/Footer'

import '../assets/styles/home.css'

class Home extends React.Component {

  render() {
    return(
      <div>
        <CustomNavbar />
        <section className="home">
          <div className="row h-100 justify-content-center align-items-center">
            <Slide left>
              <div className="home-card">
                <h1 className="home-text text-center">Welcome to Lecker</h1>
                <p className="home-text text-center">
                  This is the app where you will satisfy your appetite.
                </p>
              </div>
            </Slide>
          </div>
        </section>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
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