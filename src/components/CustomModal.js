import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = (props) => {
  const {
    buttonLabel,
    className,
    deleteUser
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
  <span>
    <Button color="danger" onClick={toggle} className="px-4 py-2">{buttonLabel}</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn}>Delete Account</ModalHeader>
      <ModalBody>
        Are you sure want to delete your account?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deleteUser}>Delete</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </span>
);
}

export default CustomModal;