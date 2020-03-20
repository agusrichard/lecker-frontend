import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Slide from 'react-reveal/Slide'
import Zoom from 'react-reveal/Zoom'
import { getAllItems }  from '../../redux/actions/item'
import CustomNavbar from '../../components/CustomNavBar'
import Footer from '../../components/Footer'
import ItemCard from '../../components/item/ItemCard'
import StackingItems from '../../components/item/StackingItems'

import '../../assets/styles/item.css'

class Items extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chosenCategory: 0
    }
  }

  componentDidMount() {
    this.props.getAllItems()
  }

  changeCategory = (categoryId) => {
    this.setState({ chosenCategory: categoryId })
  }

  render() {
    console.log('render')
    return (
      <>
        <Helmet>
          <title>Lecker - Restaurants</title>
        </Helmet>
        <CustomNavbar />
        <section className="items-page-header">
          <div className="row h-100 justify-content-md-end align-items-center">
            <Slide right>
              <h1 className="text-right main-text">You go the the right place to satify your appetite... Just try and discover</h1>
            </Slide>
          </div>
        </section>
        <p className="text-center items-list-begin-text mt-5">TRY &amp; DISCOVER</p>
        <h3 className="text-center items-list-main-text mb-2">Our Menus</h3>
        <hr className="heading-hr mb-5" />
        <div className="d-flex justify-content-center">
          <button className="item-category-btn" onClick={() => this.changeCategory(0)} >All</button>
          <button className="item-category-btn" onClick={() => this.changeCategory(1)} >Foods</button>
          <button className="item-category-btn" onClick={() => this.changeCategory(2)} >Drinks</button>
        </div>
        <div className="mt-5 mb-5">
          { this.state.chosenCategory === 0 ?
          <Slide right>
            <StackingItems listOfItems={this.props.allItems} />
          </Slide> :
          <Slide right>
            <StackingItems listOfItems={this.props.allItems.filter(item => item.category_id === this.state.chosenCategory)} />
          </Slide>
          }
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  allItems: state.item.allItems
})

const mapDispatchToProps = { getAllItems }

export default connect(mapStateToProps, mapDispatchToProps)(Items)