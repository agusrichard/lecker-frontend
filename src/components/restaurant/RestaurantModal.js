import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Form, 
  FormGroup, Label, Input, CustomInput } from 'reactstrap';


const RestaurantModal = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;


  if (props.updateRestaurant) {
    return (
      <span>
        <Button color="warning" onClick={toggle} style={{ color: '#fff', marginRight: '1rem' }}>Update Restaurant</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>Update Restaurant</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="restaurantName" className="create-restaurant-form-label">Restaurant Name</Label>
                <input type="text" className="create-restaurant-form-input" name="name" id="restaurantName" placeholder={props.restaurantDetail.name} onChange={props.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="location" className="create-restaurant-form-label">Location</Label>
                <input type="text" className="create-restaurant-form-input" name="location" id="location" placeholder={props.restaurantDetail.location} onChange={props.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="description" className="create-restaurant-form-label">Description</Label>
                <textarea className="create-restaurant-form-input" name="description" id="description" placeholder={props.restaurantDetail.description} onChange={props.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="logo" className="create-restaurant-form-label">Logo</Label>
                <CustomInput type="file" id="logo" name="logo" onChange={props.handleFile} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(event) => {  
              props.updateRestaurant(event)
              toggle()}}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }

  if (props.deleteRestaurant) {
    return (
      <span>
        <Button color="danger" onClick={toggle}>Delete Restaurant</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>Delete Restaurant</ModalHeader>
          <ModalBody>
            Are you sure want to delete your restaurant?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={props.deleteRestaurant}>Delete</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }
}

export default RestaurantModal