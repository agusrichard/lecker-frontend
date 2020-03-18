import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'
import { userLogout } from '../redux/actions/auth'
import Image from '../assets/images/profile-picture-placeholder.png'


const Dropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [isRedirect, setRedirect] = useState(false)

  const renderRedirect = () => {
    if (isRedirect) {
      props.userLogout()
      return <Redirect to="/" />
    }
  }

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle color="">
        <img src={ props.profilePicture ? process.env.REACT_APP_BASE_URL+ '/' + props.profilePicture : Image } width="40" height="40" className="d-inline-block align-center mr-4 rounded-circle"/>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
            <Link to="/users/profile" style={{ textDecoration: 'none' }}>Profile</Link>
        </DropdownItem>
        <DropdownItem divider />
        { renderRedirect() }
        <DropdownItem onClick={() => setRedirect(true)}>Logout</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default connect(null, { userLogout })(Dropdown);