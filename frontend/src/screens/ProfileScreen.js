import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getMyOrders } from "../actions/orderActions"


const ProfileScreen = ({ history }) => {
 
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const[message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { user, error } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const myOrderList = useSelector(state => state.myOrderList)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else {
        if(!user.name) {
            dispatch(getUserDetails())
            dispatch(getMyOrders())
        } 
        else{
            setName(user.name)
            setEmail(user.email)
        }
        
    }
    // eslint-disable-next-line
  }, [history, userInfo, user]);

  const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) //BUG to FIX: Though passwords don't match,user can register & go to homescreen.
        setMessage("Passwords don't match!") //setMessage will fill the message here: const[message, setMessage] = useState(null)
        
        //DISPATCH profile
        dispatch(updateUserProfile({ id: user._id, name, email, password}))  
        //dispatch orders
        dispatch(getMyOrders())    //DATA NOT FETCHED
  }

  return (
  <>
    <Row>
        <Col md = {3}>
        <h2>User Profile</h2>
       {message && <Message variant="danger">{message}</Message>}
       {error && <Message variant="danger">{error}</Message>}
       {success && <Message variant="success">User Profile Updated</Message>}

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

        <Button size="lg" type = "submit" variant="success"> Update </Button>
      </Form>
        </Col>
        <Col md = {9}>
        <h2 style={{textAlign: "center"}}>My Orders</h2>
        {errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
            <Table striped bordered hover responsive className="table-sm ">
                <thead>
                    <tr className="thead"> 
                        <th>ID</th>
                        {/* <th>DATE</th> */}
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                {/* <td>{order._createdAt.subString(0, 10)}</td> */}
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.subString(0, 10) : (
                                 <i className="fas fa-times" style={{color: 'red'}} ></i>)}</td>
                                <td>{order.isDelivered ? order.deliveredAt.subString(0, 10) : (
                                 <i className="fas fa-times" style={{color: 'red'}} ></i>)}</td>
                                <td>
                                    <LinkContainer to= {`/order/${order._id}`}>
                                        <Button className="btn-success ml-2">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
        )}
        </Col>

    </Row>
  </>
  )
}

export default ProfileScreen
