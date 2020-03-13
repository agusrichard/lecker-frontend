import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

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
        <DropdownItem onClick={props.logout}>Logout</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Dropdown;