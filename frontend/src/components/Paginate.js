import React from 'react'
import _ from "lodash"
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, pageNumber, isAdmin = false, keyword = '' }) => {

  if(pages === 1) return null
  const pagesCount = _.range(1, pages + 1)

  return (
        <Pagination>
          {pagesCount.map(page => (
          <LinkContainer key={page} to={!isAdmin ? keyword ? `/search/${keyword}/page/${page}`
                                             : `/page/${page}` : `/admin/productlist/${page}`}>
                <Pagination.Item active={page === pageNumber}>{page}</Pagination.Item>
            </LinkContainer>
          ))}
        
       </Pagination>
      )
}

Paginate.propTypes = {
  pages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  keyword: PropTypes.string
}


export default Paginate
