import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from "../components/FormContainer"
import Input from "../components/Input"
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
//import { renderInput } from "../utils/renderMethods"

const PaymentScreen = ({ history }) => {
    const  cart  = useSelector(state=> state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress)
        history.push("/shipping")

    const [paymentMethod, setPaymentMethod] = useState('PayPal') 

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

       dispatch(savePaymentMethod(paymentMethod))
       history.push("/placeorder")
    }
    
  return (
    <>
    <FormContainer>
     <CheckoutSteps step1 step2 step3 />
     <h1>Payment Method</h1>
     <Form onSubmit={submitHandler}>
         {/* here, <Input /> component will not work */}
        <Form.Group>
            <Form.Label as="legend" >Select Method</Form.Label>
         <Col>
          <Form.Check
              name="paymentMethod" 
              value="PayPal"
              id="PayPal"
              label="PayPal or Credit Card"
              type="radio"
              checked
              onChange={ e => setPaymentMethod(e.target.value)}  
              />
          <Form.Check
              name="paymentMethod" 
              value="stripe"
              id="stripe"
              label="Stripe"
              type="radio"
              onChange={ e => setPaymentMethod(e.target.value)}  
              />
         </Col>
        </Form.Group>
       
         <Button type="submit" variant="success"> Continue </Button>

       </Form>
     </FormContainer>
    </>
  )
}

export default PaymentScreen