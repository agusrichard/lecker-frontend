import React from 'react'
import Slide from 'react-reveal/Slide'
import CustomNavbar from '../components/CustomNavBar'
import Footer from '../components/Footer'
import Image1 from '../assets/images/home/img1.jpg'
import Image2 from '../assets/images/home/img2.jpg'
import '../assets/styles/home.css'

class Home extends React.Component {

  render() {
    return(
      <div>
        <CustomNavbar />
        <section className="home">
          <div className="row h-100 justify-content-md-end align-items-center">
            <div className="home-card">
            <Slide right>
              <h1 className="home-text text-right">“Sometimes it is the people no one can imagine anything of who do the things no one can imagine.”</h1>
              <p className="home-text text-right">
              ― Alan Turing
              </p>
              </Slide>
            </div>
          </div>
        </section>
        <div className="container pt-5 pb-5 mb-5">
          <h1 className="text-center header-text">Welcome to Lecker</h1>
          <p className="text-center header-text-paragraph">In here you can find meals no one ever imagined</p>
          <hr className="home-hr" />
          <div className="row d-flex justify-content-center mt-5 mb-5">
            <div className="col-md-8">
              <h5>Lorem Ipsum</h5>
              <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus dui lectus, ut lobortis libero venenatis a. Donec semper arcu sapien, non faucibus libero sollicitudin sit amet. Nullam porta lectus nisi, at tincidunt metus tincidunt non. Nullam sit amet sagittis libero. Donec volutpat ipsum sit amet pulvinar aliquet. Mauris laoreet blandit massa, volutpat blandit ligula pretium ut. Suspendisse commodo, lectus eget dictum rhoncus, massa felis hendrerit lectus, sit amet dignissim leo turpis et sem.</p>
            </div>
            <div className="col-md-4">
              <img src={Image1} className="home-box-img" />
              <img src={Image2} className="home-box-img" />
            </div>
          </div>
        </div>
        <section className="home1">
          <div className="row h-100 justify-content-md-start align-items-center ml-3">
            <div className="home-card">
            <Slide right>
              <h1 className="home-text text-left" style={{ color: 'rgb(89, 3, 116)' }}>“It doesn't matter how beautiful your theory is, it doesn't matter how smart you are. If it doesn't agree with experiment, it's wrong.”</h1>
              <p className="home-text text-left" style={{ color: '#BA0295' }}>
              ― Richard Feynmann
              </p>
              </Slide>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}

export default Home