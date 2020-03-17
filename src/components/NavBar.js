import React, { useState } from 'react';
import Cookies from 'js-cookie'
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
import Dropdown from '../components/Dropdown'
import '../assets/styles/navbar.css'


const CustomNavbar = (props) => {
  console.log(window.pageYOffset)
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="md" className="fixed-top nav navbar-bg" >
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
              <Link to="/items" className="nav-link link-text">Menus</Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem className="nav-item-top">
              <Link to="/auth/login" className="btn-login">
                <span className="login-text">LOGIN</span>
              </Link>
            </NavItem> 
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;