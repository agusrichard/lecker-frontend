import React from 'react'
import { Link } from 'react-router-dom'

function Pagination(props) {
  console.log('In pagination')
  const numLink = [...Array(props.pagination.totalPages).keys()].map(item => {
    if (props.pagination.currentPage === (item+1)) {
      return (
        <li className="page-item active">
          <a className="page-link" 
                href={'/items?page=' + (item+1)}
                onClick={props.rerender}>
                  {(item+1)}
          </a>
        </li>
      )
    } else {
      return (
        <li className="page-item">
          <a className="page-link" 
                href={'/items?page=' + (item+1)}
                onClick={props.rerender}>
                  {(item+1)} <span className="sr-only">(current)</span>
          </a>
        </li>
      )
    }
  })
  return (

    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        { !props.pagination.previousPage ?
          <li className="page-item disabled">
            <a className="page-link" tabindex="-1" aria-disabled="true">Previous</a>
          </li> : 
          <li className="page-item">
            <a className="page-link" href="#" tabindex="-1" >Previous</a>
          </li> }
        { numLink } 
        { !props.pagination.nextPage ?
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-disabled="true">Next</a>
          </li> : 
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li> }
      </ul>
    </nav>
  )
}

export default Pagination