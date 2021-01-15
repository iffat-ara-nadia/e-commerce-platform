import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { register } from '../actions/userActions';


const RegisterScreen = ({ history }) => {
 
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const[message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { userInfo, error } = userRegister


//this logic doesn't work on the screen.
  useEffect(() => {
    if (userInfo) history.push("/");
    // eslint-disable-next-line
  }, [history, userInfo]);

  const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER
        if(password !== confirmPassword) //BUG to FIX: Though passwords don't match,user can register & go to homescreen.
            setMessage("Passwords don't match!") //setMessage will fill the message here: const[message, setMessage] = useState(null)

        dispatch(register(name, email, password))  
  }

  return (
  <>
    <FormContainer>
       <h1>Sign Up</h1>
       {message && <Message variant="danger">{message}</Message>}
       {error && <Message variant="danger">{error}</Message>}

       <Form onSubmit={submitHandler}>
       <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="Enter name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
            <Form.Label>Password </Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
            <Form.Label>Password </Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    >
                </Form.Control>
        </Form.Group>

        <Button size="lg" type = "submit" variant="success"> Register </Button>
      </Form>
      <Row className="py-3">
        <Col>
        {/* Redirect er kisui bujhi ni */}
          Have an account? <Link to = "/login" >Login</Link>
           {/* {redirect ? `/register ? redirect = ${redirect}` : '/register'} */} 
        </Col> 
      </Row>
    </FormContainer>
  </>
  )
}

export default RegisterScreen
