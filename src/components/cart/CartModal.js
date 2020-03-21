import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, Form, 
  FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../redux/actions/user'
import EditIcon from '../../assets/images/icons/pencil.svg'

const CartModal = (props) => {

  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(0)
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  const handleQuantity = (event) => {
    setQuantity(event.target.value)
  }

  const addToCart = () => props.addItemToCart(
    props.item.itemId,
    props.item.name,
    parseInt(quantity), 
    props.item.price, 
    props.item.price*parseInt(quantity))
  const removeItem = () => props.removeItemFromCart(props.item.itemId)

  return (
    <span>
      <img src={ EditIcon } width="30" height="30" className="d-inline-block align-center mr-4 btn-remove" alt="" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>How Much Do You Want?</ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup>
            <Label for="quantity" className="create-restaurant-form-label">Quantity</Label>
            <input type="number" className="create-restaurant-form-input" name="quantity" id="quantity" onChange={handleQuantity} placeholder={props.item.quantity}/>
          </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => {
            removeItem()
            addToCart()
            toggle()}}>Add To Cart</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </span>
  )
}

const mapStateToProps = state => ({ itemsInCart: state.user.itemsInCart })

export default connect(mapStateToProps, { addItemToCart, removeItemFromCart })(CartModal)