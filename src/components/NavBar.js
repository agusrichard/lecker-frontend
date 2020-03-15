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
import BrandLogo from '../assets/images/navbarLogo.png'
import CartIcon from '../assets/images/cart-icon.svg'
import Dropdown from '../components/Dropdown'
import '../assets/styles/navbar.css'


const CustomNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" className="sticky-top mb-4">
      <Container>
        <Link to="/"  className="navbar-brand">
          <img src={ BrandLogo } width="50" height="50" className="d-inline-block align-top mr-2" alt="" />
          <span className="navbar-brand-text">LECKER</span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/" className="nav-link link-text">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/restaurants" className="nav-link link-text">Restaurants</Link>
            </NavItem>
            <NavItem>
              <Link to="/items" className="nav-link link-text">Our Menus</Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
            { !props.isLoggedIn ? 
                <Link to="/auth/login" className="btn btn-warning px-4 py-2">
                  <span className="btn-login">LOGIN</span>
                </Link>
                :
                 <div>
                  <Link to="#">
                    <span className="badge badge-warning mr-2 p-2">{props.totalItems}</span>
                    <img src={ CartIcon } width="40" height="40" className="d-inline-block align-top mr-4" alt="" />
                  </Link>
                  <Dropdown context="info" logout={props.logout}/>
                 </div> }
              </NavItem> 
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;