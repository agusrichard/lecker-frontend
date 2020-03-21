import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Form, 
  FormGroup, Label, Input, CustomInput } from 'reactstrap';
import '../../assets/styles/userprofile.css'


const CustomModal = (props) => {
  const {
    buttonLabel,
    className,
    deleteUser,
    updateUser,
    message,
    btnMessage,
    handleChange,
    handleFile,
    topup,
    userProfile
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  if (topup) {
    return (
      <span>
        <Button color="success" onClick={toggle} className="btn-block profile-card-button">{buttonLabel}</Button>
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
            <Button color="success" onClick={() => { 
              topup() 
              toggle()}}>{btnMessage}</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  } else if (updateUser) {
    return (
      <span>
        <Button color="warning" onClick={toggle} style={{ color: '#fff' }} className="btn-block profile-card-button">{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle} close={closeBtn}>{buttonLabel}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="fullname" className="create-restaurant-form-label">Fullname</Label>
                <input type="text" className="create-restaurant-form-input" placeholder={userProfile.full_name} name="fullname" id="fullname" onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="email" className="create-restaurant-form-label">Email</Label>
                <input type="email" className="create-restaurant-form-input" placeholder={userProfile.email}name="email" id="email" onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="address" className="create-restaurant-form-label">Address</Label>
                <textarea className="create-restaurant-form-input" placeholder={userProfile.address} name="address" id="address" onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="profilePicture">Profile Picture</Label>
                <CustomInput type="file" name="profilePicture" id="profilePicture" onChange={handleFile} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(event) => {  
              updateUser(event)
              toggle()}}>{btnMessage}</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  } else {
    return (
      <span>
        <Button color="danger" onClick={toggle} className="btn-block profile-card-button">{buttonLabel}</Button>
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