import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter } from 'reactstrap';


const CustomModal = (props) => {
  const {
    className,
    checkout
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  return (
      <span>
        <Button color="success" onClick={toggle} className="px-4 py-2">Checkout</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle} close={closeBtn}>Checkout</ModalHeader>
          <ModalBody>
            Ready to get your bought items?
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={checkout}>Sure</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
}

export default CustomModal;