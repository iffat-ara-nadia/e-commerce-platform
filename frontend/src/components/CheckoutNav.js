import React from 'react'
import { Nav } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutNav = ({step, label, link}) => {
  return (
       <Nav.Item>
            { step ? (
                <LinkContainer to={link}>
                    <Nav.Link>{label}</Nav.Link>
                </LinkContainer>) : 
                ( 
                <Nav.Link disabled>{label}</Nav.Link>
                )}
        </Nav.Item>
  )
}

export default CheckoutNav
