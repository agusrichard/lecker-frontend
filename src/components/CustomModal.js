import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Form, 
  FormGroup, Label, Input } from 'reactstrap';


const CustomModal = (props) => {
  const {
    buttonLabel,
    className,
    deleteUser,
    message,
    btnMessage,
    handleChange,
    topup
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  if (topup) {
    return (
      <span>
        <Button color="success" onClick={toggle} className="ml-4 px-4 py-2">{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle} close={closeBtn}>{buttonLabel}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="topupAmount">Amount</Label>
                <Input type="number" name="topupAmount" id="topupAmount" onChange={handleChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={topup}>{btnMessage}</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  } else {
    return (
      <span>
        <Button color="danger" onClick={toggle} className="px-4 py-2">{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle} close={closeBtn}>{buttonLabel}</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteUser}>{btnMessage}</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default CustomModal;