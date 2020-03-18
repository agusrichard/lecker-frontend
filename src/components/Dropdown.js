import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'
import { userLogout } from '../redux/actions/auth'

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
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret color={props.context}>
        Profile
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