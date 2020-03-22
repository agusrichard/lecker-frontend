import React from 'react'

import ItemReviewCard from './ItemReviewCard'

export default function StackingReviews(props) {
  const listOfReviews = props.listOfReviews

  let rendered = listOfReviews.map(review => (
    <div className="col-md-4">
      <ItemReviewCard review={review} deleteReview={props.deleteReview}/>
    </div>
  ))

  let newRendered = []
  for (let i = 0; i < rendered.length; i+=3) {
    let inside = []
    for (let j = i; j < (i + 3); j++) {
      inside.push(rendered[j] ? rendered[j] : null)
    }
    newRendered.push(inside)
  }

  if (listOfReviews.length === 0) {
    return <p className="text-center">No Reviews</p>
  } else {
    return newRendered.map(pair => (
      <div className="row d-flex justify-content-center ">
        {pair[0]}
        {pair[1]}
        {pair[2]}
      </div>
    ))
  }
}