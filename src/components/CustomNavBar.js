import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import BrandLogo from '../assets/images/logo.png'
import CartIcon from '../assets/images/cart-icon.svg'
import Dropdown from './Dropdown'
import '../assets/styles/navbar.css'


const CustomNavbar = (props) => {
  console.log('customNavbar')
  const [isOpen, setIsOpen] = useState(false);
  const profilePicture = props.userData.profile_picture

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="md" className={ props.transparent ? "sticky-top navbar-bg" : "fixed-top nav" } >
      <Container>
        <Link to="/"  className="navbar-brand d-flex align-items-center">
          <img src={ BrandLogo } width="75" height="75" className="mr-2" alt="" />
          <span className="navbar-brand-text">LECKER</span>
        </Link>
        <NavbarToggler onClick={toggle} className="custom-toggler" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <Link to="/" className="nav-link link-text">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/restaurants" className="nav-link link-text">Restaurants</Link>
            </NavItem>
            <NavItem>
              <Link to="/menus" className="nav-link link-text">Menus</Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem className="nav-item-top">
              { props.isLoggedIn ? 
                <>
                  <Link to="/cart-checkout">
                    <img src={ CartIcon } width="40" height="40" className="d-inline-block align-center mr-4" alt="" />
                  </Link>
                  <Dropdown context="info" logout={props.logout} profilePicture={profilePicture}/>
                </> :
                <Link to="/auth/login" className="btn-login">
                  <span className="login-text">LOGIN</span>
                </Link>
              }
            </NavItem> 
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userData: state.auth.userData
})

export default connect(mapStateToProps)(CustomNavbar)