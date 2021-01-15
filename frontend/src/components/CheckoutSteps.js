import React from 'react'
import { Nav } from "react-bootstrap"
import CheckoutNav from "../components/CheckoutNav"


const CheckoutSteps = ({ step1, step2, step3, step4}) => {
  return (
    <Nav className="justify-content-center mb-4">
        <CheckoutNav step={step1} label="Sign In" link="/login" />
        <CheckoutNav step={step2} label="Shipping" link="/shipping" />
        <CheckoutNav step={step3} label="Payment" link="/payment" />
        <CheckoutNav step={step4} label="Place Order" link="/placeorder" /> 
    </Nav>
  )
}

export default CheckoutSteps


