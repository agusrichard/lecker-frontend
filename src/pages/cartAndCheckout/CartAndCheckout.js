import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { removeItemFromCart } from '../../redux/actions/user'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import CartModal from '../../components/cart/CartModal'
import EditIcon from '../../assets/images/icons/pencil.svg'
import RemoveIcon from '../../assets/images/icons/trash.svg'
import '../../assets/styles/cart.css'

class CartAndCheckout extends Component {
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
        <Container className="mb-3" style={{ overflowX: 'auto' }}>
        { this.props.itemsInCart.length === 0 ?
          <p className="text-center">No items in your cart</p> :
        <>
          <div className="text-center mb-5">
            <span className="checkout-process-btn">Cart</span>
            <span className="checkout-process-btn">Checkout</span>
            <span className="checkout-process-btn">Success</span>
          </div>
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
              <td className="cart-table-head"></td>
              <td className="cart-table-head"></td>
              <td className="cart-table-head"></td>
              <td className="cart-table-head">Expenses</td>
              <td className="cart-table-head">Rp. {expenses}</td>
            </tbody>
            </table>
            <button className="text-center">Ready to Checkout</button>
          </>
          }
        </Container>
        <Footer />
      </>
    )
  }
}

const mapStatetoProps = state => ({ itemsInCart: state.user.itemsInCart })
const mapDispatchToProps = { removeItemFromCart }

export default connect(mapStatetoProps, mapDispatchToProps)(CartAndCheckout)
