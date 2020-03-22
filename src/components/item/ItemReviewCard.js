import React from 'react'
import Slide from 'react-reveal/Slide'
import { connect } from 'react-redux'
import PlaceholderImage from '../../assets/images/profile-picture-placeholder.png'
import '../../assets/styles/item.css'

function ItemReviewCard(props) {

  return (
    <Slide right>
      <div className="review-card">
        <div class="d-flex bd-highlight mb-3">
          <div class="p-2 bd-highlight">
          <img src={ props.review.profile_picture ? process.env.REACT_APP_BASE_URL + '/' + props.review.profile_picture : PlaceholderImage } className="item-img-profile" />
          </div>
          <div class="p-2 bd-highlight">
            <span className="profile-fullname">{props.review.full_name}</span>
          </div>
          <div class="ml-auto p-2 bd-highlight"><span className="custom-close-btn" onClick={() => props.deleteReview(props.review.id)}>&times;</span></div>
        </div>
        <p className="mt-2 item-review-text">Rating: <span className="rating-text">{props.review.rating}</span></p>
        <p className="mt-2 item-review-text">Review:</p>
        <p className="item-review-content">{props.review.review}</p>
      </div>
    </Slide>
	)
}

const mapStateToProps = state => ({ isLoggedIn: state.auth.isLoggedIn })

export default connect(mapStateToProps)(ItemReviewCard)