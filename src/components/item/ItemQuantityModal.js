import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Form, 
  FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../redux/actions/user'

const ItemQuantityModal = (props) => {

  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(0)
  const [isBought, setIsBought] = useState(false)
  const toggle = () => setModal(!modal);
  const bought = () => setIsBought(!isBought)
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  const handleQuantity = (event) => {
    setQuantity(event.target.value)
  }

  const addToCart = () => props.addItemToCart(props.itemId, parseInt(quantity))
  const removeItem = () => props.removeItemFromCart(props.itemId)

  return (
    <span>
        { !isBought ? 
          <Button color="success" onClick={toggle} className="item-card-btn">Add+</Button> :
          <Button color="warning" onClick={() => { removeItem(); bought() }} className="item-card-btn">Cancel</Button>
        }
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>How Much Do You Want?</ModalHeader>
          <ModalBody>
          <Form>
            <FormGroup>
              <Label for="quantity" className="create-restaurant-form-label">Quantity</Label>
              <input type="number" className="create-restaurant-form-input" name="quantity" id="quantity" onChange={handleQuantity}/>
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => {
              bought()
              addToCart()
              toggle()}}>Add To Cart</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
  )
}

export default connect(null, { addItemToCart, removeItemFromCart })(ItemQuantityModal)