import React from 'react'
import { Form } from "react-bootstrap"

const Input = ({  name, value, label, ...rest}) => {
  return (
       <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
                <Form.Control 
                    {...rest}
                    name={name}
                    value={value}
                    >
                </Form.Control>
        </Form.Group>
  )
}

Input.defaultProps = {
    type: "text"
}

export default Input
