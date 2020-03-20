import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Form, 
  FormGroup, Label, CustomInput } from 'reactstrap';


const ItemModal = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;


  if (props.updateItem) {
    return (
      <span>
        <Button color="warning" onClick={toggle} style={{ color: '#fff', marginRight: '1rem' }}>Update Menu</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>Update Menu</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name" className="create-restaurant-form-label">Menu Name</Label>
              <input type="text" className="create-restaurant-form-input" name="name" id="name" placeholder={props.itemDetail.name} onChange={props.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="price" className="create-restaurant-form-label">Price</Label>
              <input type="number" className="create-restaurant-form-input" name="price" id="price" placeholder={props.itemDetail.price} onChange={props.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="description" className="create-restaurant-form-label">Description</Label>
              <textarea className="create-restaurant-form-input" name="description" id="description" placeholder={props.itemDetail.description} onChange={props.handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="itemImage" className="create-restaurant-form-label">Menu Image</Label>
              <CustomInput type="file" id="itemImage" name="itemImage" onChange={props.handleFile} />
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(event) => {  
              props.updateItem(event)
              toggle()}}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }

  if (props.deleteItem) {
    return (
      <span>
        <Button color="danger" onClick={toggle}>Delete Menu</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>Delete Menu</ModalHeader>
          <ModalBody>
            Are you sure want to delete your menu?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={props.deleteItem}>Delete</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }
}

export default ItemModal