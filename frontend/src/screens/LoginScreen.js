import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { login } from '../actions/userActions';


const LoginScreen = ({ history }) => {
 
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, error } = userLogin


//this logic doesn't work on the screen.
  useEffect(() => {
    if (userInfo) history.push("/");
    // eslint-disable-next-line
  }, [history, userInfo]);

  const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email, password))  
  }

  return (
  <>
    <FormContainer>
       <h1>Sign In</h1>
       {error && <Message variant="danger">{error}</Message>}

       <Form onSubmit={submitHandler}>
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

        <Button size="lg" type = "submit" variant="success"> Sign In </Button>
      </Form>
      <Row className="py-3">
        <Col>
        {/* Redirect er kisui bujhi ni */}
           New Customer? Don't have an account? <Link to = "/register" >Register</Link>
           {/* {redirect ? `/register ? redirect = ${redirect}` : '/register'} */}
        </Col> 
      </Row>
    </FormContainer>
  </>  
  )
}

export default LoginScreen
