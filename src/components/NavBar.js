import React, { useState } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import Logo from '../assets/images/navbarLogo.png'
import '../assets/styles/navbar.css'

const CustomNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" className="fixed-top">
      <Container>
        <Link className="navbar-brand">
          <img src={ Logo } width="50" height="50" class="d-inline-block align-top mr-2" alt="" />
          <span className="navbar-brand-text">LECKER</span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/" className="nav-link link-text">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/" className="nav-link link-text">Restaurants</Link>
            </NavItem>
            <NavItem>
              <Link to="/" className="nav-link link-text">Items</Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <Link to="/auth/login" className="btn btn-warning px-4 py-2"><span className="btn-login">Login</span></Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;