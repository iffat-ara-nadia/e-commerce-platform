import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer"
import Input from "../components/Input"
import { saveShippingAddress } from '../actions/cartActions';
//import { renderInput } from "../utils/renderMethods"
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
    const  cart  = useSelector(state=> state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address) //why this values are used as initializator?
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

       dispatch(saveShippingAddress({ address, city, postalCode, country }))
       history.push("/payment")
    }
    
  return (
    <>
    <FormContainer>
     <h1>Shipping</h1>
     <CheckoutSteps step1 step2 />
     <Form onSubmit={submitHandler}>
        <Input 
            name="address" 
            value={address}
            label="Address"
            placeholder="Enter address" 
            onChange={ e => setAddress(e.target.value)}  
         />
        <Input 
            name="city" 
            value={city}
            label="City"
            placeholder="Enter City" 
            onChange={ e => setCity(e.target.value)}  
         />
         <Input 
            name="postalCode" 
            value={postalCode}
            label="Postal Code"
            placeholder="Enter postal code" 
            onChange={ e => setPostalCode(e.target.value)}  
         />
         <Input 
            name="country" 
            value={country}
            label="Country"
            placeholder="Enter country" 
            onChange={ e => setCountry(e.target.value)}  
         /> 

         <Button type="submit" variant="success"> Continue </Button>

       </Form>
     </FormContainer>
    </>
  )
}

export default ShippingScreen

/*   {renderInput( "address", "Address", "Enter address")}
            value={address}
            onChange={ e => setAddress(e.target.value)}  

            {renderInput( "city", "City", "Enter city")}
            value={city}
            onChange={ e => setCity(e.target.value)}  
         
            {renderInput( "postalcode", "Postal Code", "Enter postal code")}
            value={postalcode}
            onChange={ e => setPostalCode(e.target.value)}  
         
            {renderInput( "country", "Country", "Enter country")}
            value={country}
            onChange={ e => setCountry(e.target.value)}  
         
          */
