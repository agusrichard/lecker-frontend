import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Container, Form, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux'
import Slide from 'react-reveal/Slide'
import { removeItemFromCart } from '../../redux/actions/user'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import CartModal from '../../components/cart/CartModal'
import EditIcon from '../../assets/images/icons/pencil.svg'
import RemoveIcon from '../../assets/images/icons/trash.svg'
import '../../assets/styles/cart.css'

class CartAndCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      processStatus: 0,
      isOpen: false,
      fullname: this.props.userData.full_name,
      address: this.props.userData.address
    }
  }

  handleChangeStatus = (status) => {
    this.setState({ processStatus: status })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckout = () => {

  }

  render() {
    const rendered = this.props.itemsInCart.map(item => (
      <tr className="cart-table-row">
        <td className="cart-table-element">
          <CartModal item={item} forceUpdate={this.forceUpdate}/>
          <img src={ RemoveIcon } width="30" height="30" className="d-inline-block align-center mr-4 btn-edit" alt="" onClick={() => {
            this.props.removeItemFromCart(item.itemId)
            this.forceUpdate()
            }}/>
        </td>
        <td className="cart-table-element">{item.name}</td>
        <td className="cart-table-element">{item.quantity}</td>
        <td className="cart-table-element">Rp. {item.price}</td>
        <td className="cart-table-element">Rp. {item.total}</td>
      </tr>
    ))
    
    const listOfTotal = this.props.itemsInCart.map(item => item.total)
    const expenses = listOfTotal.length !== 0 ? listOfTotal.reduce((prev, current) => prev + current) : 0
     
    return (
      <>
        <Helmet>
          <title>Lecker - Restaurants</title>
        </Helmet>
        <CustomNavbar />
        <section className="restaurant-detail"></section>
        <div className="pt-5 pb-3">
          <p className="text-center restaurant-list-begin-text">Closer to fulfill your appetite</p>
          <h3 className="text-center restaurant-list-main-text mb-2">Your selected items</h3>
          <hr className="heading-hr mb-5" />
        </div>
        <Container className="mb-3">
        { this.props.itemsInCart.length === 0 ?
          <p className="text-center">No items in your cart</p> :
        <>
          <div style={{ overflowX: 'auto' }}>
            <div className="text-center mb-5">
              <span className={ this.state.processStatus !== 0 ? "checkout-process-btn" : "checkout-process-btn-active"} onClick={() => this.handleChangeStatus(0)}>Cart</span>
              <span className={ this.state.processStatus !== 1 ? "checkout-process-btn" : "checkout-process-btn-active"} onClick={() => this.handleChangeStatus(1)}>Checkout</span>
              <span className={ this.state.processStatus !== 2 ? "checkout-process-btn" : "checkout-process-btn-active"} onClick={() => this.handleChangeStatus(2)}>Success</span>
            </div>
            { this.state.processStatus === 0 ?
            <Slide right>
              <table className="cart-table">
              <thead>
                <tr>
                  <th className="cart-table-head">Actions</th>
                  <th className="cart-table-head">Item Name</th>
                  <th className="cart-table-head">Quantity</th>
                  <th className="cart-table-head">Price</th>
                  <th className="cart-table-head">Total</th>
                </tr>
              </thead>
              <tbody>
                { rendered }
                <tr>
                  <td className="cart-table-bottom"></td>
                  <td className="cart-table-bottom"></td>
                  <td className="cart-table-bottom"></td>
                  <td className="cart-table-bottom">Expenses</td>
                  <td className="cart-table-bottom">Rp. {expenses}</td>
                </tr>
              </tbody>
              </table>
            </Slide> :
              this.state.processStatus === 1 ?
              <Slide right>
                <div className="checkout-form">
                  <Form>
                  <FormGroup>
                    <Label for="fullname" className="create-restaurant-form-label">Your Name</Label>
                    <input type="text" className="create-restaurant-form-input" name="fullname" id="fullname" placeholder={this.props.userData.full_name} onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="address" className="create-restaurant-form-label">Please provide your address</Label>
                    <textarea className="create-restaurant-form-input" name="description" id="address" onChange={this.handleChange} placeholder={this.props.userData.address}/>
                  </FormGroup>
                </Form>
                </div>
              </Slide>
              : <p>something</p>
            }
            </div>
            <div className="btn-container text-center">
            { this.state.processStatus === 0 ?
              <button className="ready-btn" onClick={() => this.handleChangeStatus(this.state.processStatus + 1)}>Ready To Checkout</button> : 
              <>
                <button className="ready-btn" onClick={() => {
    
                }}>Checkout</button>
                <div className="custom-modal" style={ this.state.isOpen ? {display: 'block'} : null }>
                </div>
              </>
            }
            </div>
          </>
          }
        </Container>
        <Footer />
      </>
    )
  }
}

const mapStatetoProps = state => ({ 
  itemsInCart: state.user.itemsInCart,
  userData: state.auth.userData
})
const mapDispatchToProps = { removeItemFromCart }

export default connect(mapStatetoProps, mapDispatchToProps)(CartAndCheckout)
