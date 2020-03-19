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
              <Label for="name" className="create-restaurant-form-label">Menu Name</Label>
              <input type="text" className="create-restaurant-form-input" name="name" id="name" placeholder="Name" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="category" className="create-restaurant-form-label">Menu Category</Label>
              <input type="text" className="create-restaurant-form-input" name="category" id="category" placeholder="Category" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="price" className="create-restaurant-form-label">Price</Label>
              <input type="number" className="create-restaurant-form-input" name="price" id="price" placeholder="Price" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="description" className="create-restaurant-form-label">Description</Label>
              <textarea className="create-restaurant-form-input" name="description" id="description" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="itemImage" className="create-restaurant-form-label">Menu Image</Label>
              <CustomInput type="file" id="itemImage" name="itemImage" onChange={this.handleFile} />
            </FormGroup>
            <button className="btn-block create-restaurant-form-btn" onClick={this.handleSubmit}>Submit</button>
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