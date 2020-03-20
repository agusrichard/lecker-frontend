import React from 'react'

import ItemCard from './ItemCard'

export default function StackingItems(props) {
  const listOfItems = props.listOfItems

  let rendered = listOfItems.map(item => (
    <div key={item.id} className="col-md-5 list-col">
      <ItemCard item={item} />
    </div>
  ))

  let newRendered = []
  for (let i = 0; i < rendered.length; i+=2) {
    let inside = []
    for (let j = i; j < (i + 2); j++) {
      inside.push(rendered[j] ? rendered[j] : null)
    }
    newRendered.push(inside)
  }

  return newRendered.map(pair => (
    <div className="row d-flex justify-content-center restaurant-row">
      {pair[0]}
      {pair[1]}
    </div>
  ))
}