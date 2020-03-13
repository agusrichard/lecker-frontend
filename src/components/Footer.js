import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/footer.css'

function Footer(props) {
  return (
    <footer className="section footer-classic context-dark bg-image pt-4" style={{background: '#2d3246'}}>
        <div className="container">
          <div className="row row-30">
            <div className="col-md-4 col-xl-5">
              <div className="pr-xl-4"><a className="brand" href="index.html"><img className="brand-logo-light" src="images/agency/logo-inverse-140x37.png" alt="" width="140" height="37" srcSet="images/agency/logo-retina-inverse-280x74.png 2x" /></a>
                <p>Second project of Arkademy Bootcamp. Connecting frontend and backend.</p>
                <p className="rights"><span>©  </span><span className="copyright-year">2020</span><span> </span><span>Richard</span><span>. </span><span>All Rights Reserved.</span></p>
              </div>
            </div>
            <div className="col-md-4">
              <h5>Contacts</h5>
              <dl className="contact-list">
                <dt>Address:</dt>
                <dd>Jl.Sukasari III No. 47, Sukasari, Kecamatan Bogor Timur, Kota Bogor, Jawa Barat, Indonesia</dd>
              </dl>
              <dl className="contact-list">
                <dt>Email:</dt>
                <dd><a href="mailto:#">agus.richard21@gmail.com</a></dd>
              </dl>
              <dl className="contact-list">
                <dt>Phone:</dt>
                <dd>085710276393</dd>
              </dl>
            </div>
            <div className="col-md-4 col-xl-3">
              <h5>Links</h5>
              <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/restaurants">Restaurants</Link></li>
                <li><Link to="/items">Menus</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row no-gutters social-container">
          <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-facebook"></span><span>Facebook</span></a></div>
          <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-instagram"></span><span>instagram</span></a></div>
          <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-twitter"></span><span>twitter</span></a></div>
          <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-youtube-play"></span><span>google</span></a></div>
        </div>
      </footer>
  )
}

export default Footer